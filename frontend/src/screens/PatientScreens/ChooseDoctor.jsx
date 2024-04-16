import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { useUpdatePatientMutation } from '../../slices/patientApiSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { Card, Grid } from '@mui/material';
import { Nav, Row, Col } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import { deepOrange, green } from '@mui/material/colors';
import GroupsIcon from '@mui/icons-material/Groups';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import CheckIcon from '@mui/icons-material/Check';
import { useLocation } from "react-router-dom";
import { baseUrl } from '../../utils';


function SimpleDialog(props) {
  const { onClose, selectedDoctor, open, email, name } = props;

  const handleClose = () => {
    onClose(selectedDoctor);
  };

  const day = new Date();
  // const IST = String(new Date(day.getTime() - day.getTimezoneOffset()*60000).toISOString().slice(0,16));

  const [paid, setPaid] = useState(false);
  const [meetingTime, setMeetingTime] = useState(dayjs(day));
  const [bookingsuccessfull, setBookingSuccessfull] = useState(false);

  const handleTimeSelect = (value) => {
    const currentTime = new Date();
    const selectedTime = new Date(value.$d);
    if(selectedTime.getTime()-currentTime.getTime() > 0) setMeetingTime(value);
    else{ 
      setMeetingTime(dayjs(day));
      toast.error("Please select correct time"); 
    }
  };

  
  const initPayment = (data) => {
		const options = {
			key: "rzp_test_orbv8tDSH22Sty",
			amount: selectedDoctor.consultationRate,
			currency: data.currency,
			name: `Dr. ${selectedDoctor.name}`,
			description: `Payment for consultation with Dr. ${selectedDoctor.name}`,
			image: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
			order_id: data.id,
			handler: async (response) => {
				try {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
          var urlencoded = new URLSearchParams();
          urlencoded.append("razorpay_order_id", response.razorpay_order_id);
          urlencoded.append("razorpay_payment_id", response.razorpay_payment_id);
          urlencoded.append("razorpay_signature", response.razorpay_signature);
    
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
          };
    
          const res = await fetch(`${baseUrl}/payment/verify`, requestOptions);;
          const resp = await res.json();
          if(resp.message === "Payment verified successfully"){
            toast.success("Payment successful, Please proceed to book meeting");
            setPaid(true);
          }
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3349cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

  const handlePayment = async () => {
		try {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      var urlencoded = new URLSearchParams();
      urlencoded.append("amount", selectedDoctor.consultationRate);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      const res = await fetch(`${baseUrl}/payment/orders`, requestOptions);;
      const resp = await res.json();
			initPayment(resp.data);

		} catch (error) {
			console.log(error);
		}
	};

  const handleBooking = async (e) => {
    e.preventDefault();
    const currentTime = new Date().getTime();
    const selectedTime = new Date(meetingTime).getTime();
    if(selectedTime-currentTime < 0){
      toast.error("Please select correct time");
      return;
    }
    else if(!paid){
      toast.error("Please complete payment first");
      return;
    }
    else{
      try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var urlencoded = new URLSearchParams();
        urlencoded.append("customerEmail", email);
        urlencoded.append("customerName", name);
        urlencoded.append("doctorEmail", selectedDoctor.email);
        urlencoded.append("doctor", selectedDoctor.name);
        urlencoded.append("consultationTime", selectedTime);
  
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };

        const res = await fetch(`${baseUrl}/meeting/createMeetingRequest`, requestOptions);;
        const resp = await res.json()
        if(res.status === 400 || res.status === 500 || res.status === 401 || resp['status'] == null) {
          toast.error("Error in creating meeting");
          return;
        }
        toast.success("Successfully created meeting request, Meeting details will be sent to your email. Alternatively available in meetings page");
        handleClose();
        setTimeout(() => {
          window.location.href = '/profile'
        }, 5000);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
        // setSpinnerOn(false);
      }
    }
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <div style={{textAlign:'center', width:'28rem'}}>
      <DialogTitle>Select meeting time</DialogTitle>
      <div style={{marginLeft:'32%', width:'10rem'}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DesktopTimePicker']}>
                  <DemoItem>
                    <DesktopTimePicker 
                      defaultValue={meetingTime}
                      onChange={(newValue) => handleTimeSelect(newValue)}
                    />
                  </DemoItem>
                </DemoContainer>
          </LocalizationProvider>
      </div>
      {
        (!paid)
          ?
          <div style={{margin:'auto', marginTop:'2rem', marginBottom:'2rem'}}>
            <Button onClick={handlePayment} variant="outlined">
              Click here to pay
            </Button>
          </div>
         :
         <Typography sx={{margin:'auto', marginTop:'2rem', marginBottom:'2rem'}}>
          Payment verified. Please proceed to book meeting
         </Typography>
      }
      <Button sx={{marginTop:'0.5rem', width:'25rem', marginBottom:'1rem'}} variant="contained" onClick={handleBooking}>
            Confirm payment and Book appointment
      </Button>
      <div style={{height:'2px'}} />
      </div>
    </Dialog>
  );
}

const ChooseDoctor = () => {

  const { state } = useLocation();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState([]);
  const [specialization, setSpecialization] = useState(state.doctorSpecialization);
  const [cityChecked, setCityChecked] = useState(true);
  const [doctorList, setDoctorList] = useState([]);
  const [spinnerOn, setSpinnerOn] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState([]);

  const specializationList = [
    "General Physician",
    "Stress and Mental Health",
    "Dermatology",
    "Gynaecology",
    "Weight Management",
    "Pediatrics",
    "Gastroenterology",
    "Neurology",
    "Orthopedics",
    "Diabetes Consult",
    "Cardialogy",
    "Oncology",
    "Dentist",
  ];


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDoctor(selectedDoctor);
  };

  const handleCityCheck = (event) => {
    setCityChecked(event.target.checked);
  };

  const handleTypeChange = (event) => {
    setSpecialization(event.target.value);
  };

  const getInitials = (docname) => {
    var name = docname.split(" ");
    var initials = "";
    name.forEach((i) => {initials = initials+i.slice(0, 1);});
    return initials;
  }

  const formatLocation = (location) => {
    const city = location.City;
    const state = location.State;
    if(city.length < 10 & state.length > 6) return city+","+getInitials(state);
    else if((city + "," + state).length < 20) return city+","+state;
    else return (city.slice(0,3) + "," + state.slice(0,3));
  }

  const getLength = (doc) => {
    const specializationPrimary = doc.specializationPrimary;
    const specializationSecondary = doc.specializationSecondary;
    if((specializationPrimary+","+specializationSecondary).length < 29) return 'normal'
    else return 'extend';
  }

  const dispatch = useDispatch();

  const { userInformation } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdatePatientMutation();

  useEffect(() => {
    setName(userInformation.name);
    setEmail(userInformation.email);
    setLocation(userInformation.location);
  }, [userInformation.email, userInformation.name], [userInformation.location]);


  const submitHandler = async (e) => {
    e.preventDefault();
    if (specialization === '') {
      toast.error('Please select specialization');
    } else {
      setSpinnerOn(true);
      try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var urlencoded = new URLSearchParams();
        // urlencoded.append("city", location['city']);
        urlencoded.append("specialization", specialization);
        // urlencoded.append("checked", cityChecked);
  
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        const res = await fetch(`${baseUrl}/doctor/searchDoctor`, requestOptions);;
        const resp = await res.json()
        if(res.status === 400 || res.status === 500 || res.status === 401 || resp['doctors'][0] == null) {
          toast.error("No Doctor found");
          setDoctorList([]);
          setSpinnerOn(false);
          return;
        }
        const r = Object.values(resp['doctors']);
        setDoctorList(r);
        setSpinnerOn(false);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
        setSpinnerOn(false);
      }
    }
  };

  const requestMeeting = (event) => {
    event.preventDefault();
    handleClickOpen();
    const doctor = doctorList.filter((d) => {return d._id == event.target.value})
    setSelectedDoctor(doctor[0]);
  }

  return (
    <Card sx={{marginTop:'4rem', textAlign:'center', width:'40rem', marginLeft:'25%', minHeight:'30rem'}} variant="outlined">
      <Typography sx={{marginTop:'1rem'}} fontSize={30}>Please select type of doctor to consult :</Typography>
      <FormControl sx={{marginTop:'1rem', width:'30rem'}}>
        <InputLabel id="specialization-select-label">Specialization</InputLabel>
        <Select
          labelId="specialization-select-label"
          id="specialization-select"
          value={specialization}
          label="Specialization"
          onChange={handleTypeChange}
        >
          {specializationList.map((specialization, index) => {return(<MenuItem value={specialization} key={index}>{specialization}</MenuItem>)})}
        </Select>
      </FormControl>
      <Grid sx={{textAlign:'center', marginTop:'0.5rem'}}>
        {/* Search for doctors only in your area
        <Checkbox
          checked={cityChecked}
          onChange={handleCityCheck}
          inputProps={{ 'aria-label': 'controlled' }}
        /> */}
        <Button sx={{marginTop:'0.5rem'}} variant="contained" onClick={submitHandler}>
            Search
        </Button>
      </Grid>
        
        {spinnerOn ? <Loader /> : ""}
        {
          (doctorList !== null)
          ?
            doctorList.map((doctor, index) => {
              return (
              <Card variant='outlined' sx={{width:'35rem', margin:'auto', marginTop:'1rem', marginBottom:'1rem'}} key={doctor}>
                  <Grid sx={{textAlign:'center', marginTop:'0.7rem', display:'grid', gridTemplateColumns:'0.8fr 5px 2fr 5px 2fr', height:'9rem'}} key={index}>     
                    <Avatar sx={{ bgcolor: (index%2==0) ? deepOrange[500] : green[500], height:'4rem', width:'4rem', marginTop:'2rem', marginLeft:'1rem' }} variant="square">
                      {getInitials(doctor.name)}
                    </Avatar>
                    <div style={{borderLeft:"1px blue solid", height:'130px'}}/>
                    <Grid sx={{height:'5rem', marginTop:'0.5rem'}}>
                      <Typography>Dr. {(doctor.name.length > 20) ? getInitials(doctor.name) : doctor.name}</Typography>
                      <Typography>Qualifications: {doctor.degrees}</Typography>
                      {/* <Typography>Rating : { (doctor.rating.Rating !== null) ? `${String(doctor.rating.Rating).slice(0,2)} , Total Reviews : ${doctor.rating.TotalReviews}`: "No ratings yet"}</Typography> */}
                      {/* <Typography>Location: {formatLocation(doctor.location)}</Typography> */}
                      <Typography>Consultation Rate: INR {doctor.consultationRate}</Typography>
                    </Grid>
                    <div style={{borderLeft:"1px blue solid", height:'130px'}}/>
                    <Grid sx={{marginTop:getLength(doctor)==='normal'?'1.5rem':'0.5rem'}}>
                      <Typography>Specializations : {doctor.specializationPrimary}</Typography>
                      {/* {(doctor.specializationSecondary !== "") ? `, ${doctor.specializationSecondary}` : ""} */}
                      <Button sx={{marginTop:'0.5rem'}} variant="contained" value={doctor._id} key={index} onClick={requestMeeting}>
                          <GroupsIcon/> &nbsp; Request Meeting
                      </Button>
                    </Grid>
                  </Grid>
              </Card>
            )})
          : ""    
        }
        <SimpleDialog
          selectedDoctor={selectedDoctor}
          email={email}
          name={name}
          open={open}
          onClose={handleClose}
        />
    </Card>
  );
};

export default ChooseDoctor;
