import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { Button, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Spinner } from 'react-bootstrap/esm';
import { baseUrl, formatTime } from '../../utils';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CreatePrescription = () => {
  const [spinnerOn, setSpinnerOn] = useState(true);
  const [meetingData, setMeetingData] = useState([]);
  const [symptom, setSymptom] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState([]);
  const [medicine, setMedicine] = useState('');
  const [time, setTime] = useState('');
  const [beforeMeals, setBeforeMeals] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [days, setDays] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState({});

  var medicineList = [
    "Paracetamol",
    "Ibuprofen",
    "Aspirin",
    "Amoxicillin",
    "Cetirizine",
    "Dextromethorphan",
    "Loratadine",
    "Pseudoephedrine",
    "Ranitidine",
    "Metformin"
];

const handleTypeChange = (event) => {
  setMedicine(event.target.value);
};


  const handleChange = () => {
    setBeforeMeals(event.target.checked);
  };
  
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const dispatch = useDispatch();

  const { userInformation } = useSelector((state) => state.auth);

  useEffect(() => {
    getMeetings();
    if(meetingData[0] === null) toast.error("No meetings found")
  }, [""])

  const getMeetings = async (e) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var urlencoded = new URLSearchParams();
        urlencoded.append("email", userInformation.email);
  
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        const res = await fetch(`${baseUrl}/doctor/doctorConsultations`, requestOptions);
        const resp = await res.json()
        if(res.status === 400 || res.status === 500 || res.status === 401 || resp['meetings'] === null) {
          toast.error("No meetings found");
          setSpinnerOn(false);
          return;
        }
        const meetings = Object.values(resp['meetings']).reverse();
        const accepted = meetings.filter((meet) => {return meet.status==='Accepted'})
        setMeetingData(accepted);
        setSpinnerOn(false);


        // console.log(r);
  }

  const handleButton = (e) => {
    const meeting = e.target.value.split(',');
    setSelectedMeeting(selectedMeeting => ({
      // ...selectedMeeting,
      ...meeting
    }));
    handleClickOpen();
  }

  const handleAdd = () => {
    if(medicine=='' || days=='' || time=='' || quantity==''){
      toast.error("Please enter all values");
      return;
    }
    const presLocal = prescription;
    const newMedicine = {};
    newMedicine['medicineName'] = medicine;
    newMedicine['time'] = time;
    newMedicine['beforeMeals'] = beforeMeals;
    newMedicine['quantity'] = quantity;
    newMedicine['days'] = days;
    presLocal.push(newMedicine);
    setMedicine(() => '');
    setTime(() => '');
    setQuantity(() => '');
    setDays(() => '');
    setBeforeMeals(false);
    setPrescription(() => presLocal);
  }

  const createPrescription = async () => {
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("customer", selectedMeeting[0]);
    urlencoded.append("customerEmail", selectedMeeting[2]);
    urlencoded.append("doctor", selectedMeeting[3]);
    urlencoded.append("doctorEmail", selectedMeeting[4]);

    urlencoded.append("prescription", JSON.stringify(prescription));
    // urlencoded.append("time", time);
    // urlencoded.append("beforeMeals", beforeMeals);
    // urlencoded.append("quantity", quantity);
    // urlencoded.append("days", days);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    const res = await fetch(`${baseUrl}/doctor/createPrescription`, requestOptions);
    if(res.status === 400 || res.status === 500 || res.status === 401) {
      toast.error("Prescription not created");
      return;
    }
    toast.success("Prescription created");
    handleClose();
  }

  return (
    <FormContainer>
      <h2>Create Prescription :</h2>
      <Grid sx={{marginTop:'1rem'}}>
        {spinnerOn ? <Loader /> : ""}
        {
          (meetingData !== null)
          ?
            meetingData.map((meeting, index) => {
              return (
                <Card sx={{ minWidth: 275, marginTop:'1rem', height:'5rem'}} variant="outlined" key={index}>
                  <CardContent sx={{display:'grid', gridTemplateColumns:'2fr 1fr', textAlign:'center'}}>
                      <div>
                      <Typography variant="body2" sx={{marginTop:'0.5rem'}}>
                        Name : {meeting.customerName}
                      </Typography>
                      <Typography variant="body2">
                        Consultation Time : {formatTime(meeting.consultationTime)}
                      </Typography>
                      </div>
                      <div>
                      <Typography variant="body2">
                        Status : Accepted
                      </Typography>
                      <Button size="small" variant='contained'
                              value={`${meeting.customerName},${meeting.consultationTime},${meeting.customerEmail},${meeting.doctor},${meeting.doctorEmail},${meeting.status}`} 
                              onClick={handleButton}
                      >
                        Create
                      </Button>
                      </div>
                  </CardContent>
                </Card>
              )
            })
          :
          <Spinner />
        }
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Prescription Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Customer : {selectedMeeting[0]}
          </Typography>
          <Typography gutterBottom>
            Scheduled Time : {formatTime(selectedMeeting[1])}
          </Typography>
          <TextField
            id="outlined-controlled"
            fullWidth
            label="Symptoms"
            value={symptom}
            gutterBottom
            onChange={(event) => {
              setSymptom(event.target.value);
            }}
          />
          <TextField
            id="outlined-controlled"
            fullWidth
            label="Diagnosis"
            value={diagnosis}
            onChange={(event) => {
              setDiagnosis(event.target.value);
            }}
          />
          <Grid>
          {
            prescription.length>0 && prescription.map(pres => {
              return <Typography sx={{border:'1px solid black', borderRadius:1, marginTop:3, alignItems:'center'}}> Medicine : {pres.medicine}, Time: {pres.time}, Quantity: {pres.quantity}, Days: {pres.days}, Before Meals: {pres.beforeMeals ? 'Yes' : 'No'} </Typography>
            })
          }
          </Grid>
          <Grid container spacing={2} sx={{border:'1px solid black', borderRadius:5, marginTop:3, alignItems:'center', paddingBottom:2}}>
            <Grid item xs={8}>
            {/* <TextField
            id="outlined-controlled"
            fullWidth
            label="Medicine"
            value={medicine}
            onChange={(event) => {
              setMedicine(event.target.value);
            }}
          /> */}
            <FormControl sx={{width:'22.5rem'}}>
              <InputLabel id="specialization-select-label">Medicine</InputLabel>
              <Select
                labelId="medicine-select-label"
                id="medicine-select"
                value={medicine}
                label="Medicine"
                onChange={handleTypeChange}
              >
                {medicineList.map((medicine, index) => {return(<MenuItem value={medicine} key={index}>{medicine}</MenuItem>)})}
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={4} sx={{paddingRight:1}}>
            <TextField
            id="outlined-controlled"
            fullWidth
            label="Time"
            value={time}
            onChange={(event) => {
              setTime(event.target.value);
            }}
          />
            </Grid>
            <Grid item xs={4}>
            <TextField
            id="outlined-controlled"
            fullWidth
            label="Quantity"
            value={quantity}
            onChange={(event) => {
              setQuantity(event.target.value);
            }}
          />
            </Grid>
            <Grid item xs={4}>
            <TextField
            id="outlined-controlled"
            fullWidth
            label="Days"
            value={days}
            onChange={(event) => {
              setDays(event.target.value);
            }}
          />
            </Grid>
            <Grid item xs={4} sx={{mt:1}}>
            Before Meals : 
              <Checkbox
            checked={beforeMeals}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
            </Grid>
            <Grid item sx={12}>
            <Button variant="contained" sx={{marginLeft:30}} onClick={handleAdd}>Add</Button>

            </Grid>
          </Grid>
          
                    
          
                    
                    
        </DialogContent>
        <DialogActions>
        <Button autoFocus onClick={createPrescription}>
            Create Prescription
        </Button>
        </DialogActions>
      </Dialog>
      </Grid>
    </FormContainer>
  );
};

export default CreatePrescription;
