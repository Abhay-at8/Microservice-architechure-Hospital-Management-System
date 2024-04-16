import { useState, useEffect } from 'react';
import FormContainer from '../../components/FormContainer';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { citiesLocation, stateList, medicalCouncils } from '../../../cities';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const DoctorRegistrationScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [cityArray, setCityArray] = useState(["No state selected"]);
  const [city, setCity] = useState('');
  const [specializationPrimary, setSpecializationPrimary] = useState('');
  const [specializationSecondary, setSpecializationSecondary] = useState('');
  const [council, setCouncil] = useState('');
  const [degrees, setDegrees] = useState('');
  const [registrationNumber, setregistrationNumber] = useState('');
  const [registrationYear, setRegistrationYear] = useState('');
  const [cityData, setCityData] = useState([]);
  const [password, setPassword] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mailChecked, setMailChecked] = useState(true);
  const [mobileNumber, setMobileNumber] = useState("");
  const [consultationRate, setConsultationRate] = useState('');
  const [specializationList, setSpecializationList] = useState([
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
    "Dentist"
  ]);
  const [specializationListSecondary, setSpecializationListSecondary] = useState(["Select Primary Specialization first"]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInformation } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInformation !== null && userInformation.email !== null) {
      navigate('/profile');
    }
  }, [navigate, userInformation]);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const validateMobileNumber = (number) => {
    return number.match(
      /^((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}$/
    );
  }

  const handleStateChange = (event) => {
    setState(event.target.value);
    const cities = citiesLocation.filter((city) => {return city["State"]==String(event.target.value)})
    const cityArray = cities.map((city) => {return city.city})
    setCityArray(cityArray);
  };

  const handleSpecializationPrimaryChange = (event) => {
    setSpecializationPrimary(event.target.value);
    const updated = specializationList.filter((val) => { return val !== String(event.target.value) })
    setSpecializationListSecondary(updated);

  };

  const handleSpecializationSecondaryChange = (event) => {
    setSpecializationSecondary(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
    const cityDataFiltered = citiesLocation.filter((city) => {return city["city"]==String(event.target.value)})
    setCityData(cityDataFiltered[0]);
  };

  const handleCouncilChange = (event) => {
    setCouncil(event.target.value);
  };  
  
  const handleMailChange = (event) => {
    setMailChecked(event.target.checked);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if(firstName.length==0 || email.length==0 || password.length==0 || confirmPassword.length==0) {
      toast.error("Please enter all required values")
    }
    else if(state === ''){
      toast.error("Please select state");
    }
    else if(city === ''){
      toast.error("Please select city")
    }
    else if(specializationPrimary === ''){
      toast.error("Please select Primary Specialization")
    }
    else if(degrees === ''){
      toast.error("Please enter your Qualifications/Degrees")
    }
    else if(address === '' || pincode === ''){
      toast.error("Please fill address and pincode");
    }
    else if (!validateMobileNumber(mobileNumber)) {
      toast.error("Invalid mobile number");
    } 
    else if (!validateEmail(email)) {
      toast.error("Invalid email");
    } 
    else if(password !== confirmPassword){
      toast.error('Passwords do not match');
    }
    else {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var urlencoded = new URLSearchParams();
        urlencoded.append("name", firstName+" "+LastName);
        urlencoded.append("email", email);
        urlencoded.append("state", cityData["State"]);
        urlencoded.append("city", cityData["city"]);
        urlencoded.append("lat", cityData["lat"]);
        urlencoded.append("lng", cityData["lng"]);
        urlencoded.append("address", address);
        urlencoded.append("password", password);
        urlencoded.append("pincode", pincode);
        urlencoded.append("mailing", mailChecked);
        urlencoded.append("council", council);
        urlencoded.append("registrationNumber", registrationNumber);
        urlencoded.append("registrationYear", registrationYear);
        urlencoded.append("mobileNumber", mobileNumber);
        urlencoded.append("specializationPrimary", specializationPrimary);
        urlencoded.append("specializationSecondary", specializationSecondary);
        urlencoded.append("degrees", degrees);
        urlencoded.append("consultationRate", consultationRate);
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        const res = await fetch("http://localhost:5000/api/doctor", requestOptions);
        const val = await res.json();
        if(res.status === 400 || res.status === 500) {
          toast.error(val.message);
          return;
        }
        toast.success("Successfully created. Please login to continue");
        //dispatch(setCredentials({ ...val }));
        navigate('/login');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
    <CssBaseline />
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register Doctor
      </Typography>
      <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="e-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="mobileNumber"
              label="Mobile Number"
              name="mobileNumber"
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              name="Address"
              required
              fullWidth
              id="address"
              label="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              id="pincode"
              label="Pincode"
              name="pincode"
              onChange={(e) => setPincode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="state-select-label">State*</InputLabel>
              <Select
                fullWidth
                labelId="state-select-label"
                id="state-select"
                value={state}
                label="State"
                onChange={handleStateChange}
                defaultValue = ""
              >
                {stateList.map((state, index) => {return(<MenuItem value={state} key={index}>{state}</MenuItem>)})}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="city-select-label">City*</InputLabel>
              <Select
                labelId="city-select-label"
                id="city-select"
                value={city}
                label="City"
                onChange={handleCityChange}
                defaultValue = "No state selected"
              >
              {cityArray.map((city, index) => {return(<MenuItem value={city} key={index}>{city}</MenuItem>)})}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="specialization-primary-select-label">Specialization Primary*</InputLabel>
              <Select
                fullWidth
                labelId="specialization-primary-select-label"
                id="specialization-primary-select"
                value={specializationPrimary}
                label="Specialization-primary"
                onChange={handleSpecializationPrimaryChange}
                defaultValue = ""
                required
              >
                {specializationList.map((specialization, index) => {return(<MenuItem value={specialization} key={index}>{specialization}</MenuItem>)})}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
            <InputLabel id="specialization-secondary-select-label">Specialization Secondary</InputLabel>
              <Select
                fullWidth
                labelId="specialization-secondary-select-label"
                id="specialization-secondary-select"
                value={specializationSecondary}
                label="Specialization-secondary"
                onChange={handleSpecializationSecondaryChange}
                defaultValue = ""
              >
              {specializationListSecondary.map((specialization, index) => {return(<MenuItem value={specialization} key={index}>{specialization}</MenuItem>)})}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="degrees"
              label="Degrees"
              type="degrees"
              id="degrees"
              autoComplete="degrees"
              onChange={(e) => setDegrees(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="confirm-new-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
          <Typography sx={{fontWeight:"bold"}}>&nbsp;Medical Registry Information :</Typography>
        </Grid>
        <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="council-select-label">Council*</InputLabel>
              <Select
                labelId="council-select-label"
                id="council-select"
                value={council}
                label="Council"
                onChange={handleCouncilChange}
                defaultValue = ""
              >
              {medicalCouncils.map((council, index) => {return(<MenuItem value={council} key={index}>{council}</MenuItem>)})}
              </Select>
            </FormControl>
          </Grid> 
        <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              name="registrationNumber"
              label="Registration Number"
              type="text"
              id="registrationNumber"
              onChange={(e) => setregistrationNumber(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              name="registrationYear"
              label="Registration Year"
              type="text"
              id="registrationYear"
              onChange={(e) => setRegistrationYear(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              name="consultationRate"
              label="Consultation Rate"
              type="text"
              id="consultationRate"
              onChange={(e) => setConsultationRate(e.target.value)}
            />
        </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox 
                  value="allowExtraEmails" 
                  color="primary"
                  checked={mailChecked}
                  onChange={handleMailChange}
                />
              }
              label="I want to receive marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  </FormContainer>
  );
};

export default DoctorRegistrationScreen;
