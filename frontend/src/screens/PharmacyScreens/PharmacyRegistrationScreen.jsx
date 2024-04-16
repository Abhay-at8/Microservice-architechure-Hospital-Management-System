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

const PharmacyRegistrationScreen = () => {
  const [shopName, setShopName] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [cityArray, setCityArray] = useState(["No state selected"]);
  const [city, setCity] = useState('');
  const [GST, setGST] = useState('');
  const [registrationNumber, setregistrationNumber] = useState('');
  const [drugLicense, setDrugLicense] = useState('');
  const [cityData, setCityData] = useState([]);
  const [password, setPassword] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mailChecked, setMailChecked] = useState(true);
  const [mobileNumber, setMobileNumber] = useState("");

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

  const handleCityChange = (event) => {
    setCity(event.target.value);
    const cityDataFiltered = citiesLocation.filter((city) => {return city["city"]==String(event.target.value)})
    setCityData(cityDataFiltered[0]);
  };
  
  const handleMailChange = (event) => {
    setMailChecked(event.target.checked);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if(shopName.length==0 || email.length==0 || password.length==0 || confirmPassword.length==0) {
      toast.error("Please enter all required values")
    }
    else if(state === ''){
      toast.error("Please select state");
    }
    else if(city === ''){
      toast.error("Please select city")
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
        urlencoded.append("name", shopName);
        urlencoded.append("email", email);
        urlencoded.append("state", cityData["State"]);
        urlencoded.append("city", cityData["city"]);
        urlencoded.append("lat", cityData["lat"]);
        urlencoded.append("lng", cityData["lng"]);
        urlencoded.append("address", address);
        urlencoded.append("pincode", pincode);
        urlencoded.append("mailing", mailChecked);
        urlencoded.append("GST", GST);
        urlencoded.append("registrationNumber", registrationNumber);
        urlencoded.append("drugLicense", drugLicense);
        urlencoded.append("mobileNumber", mobileNumber);
        urlencoded.append("password", password);
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        const res = await fetch("http://localhost:5000/api/pharmacy", requestOptions);
        const val = await res.json();
        if(res.status === 400 || res.status === 500 || res.status === 401) {
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
        Register Pharmacy
      </Typography>
      <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name="shopName"
              required
              fullWidth
              id="shopName"
              label="Shop Name"
              autoFocus
              onChange={(e) => setShopName(e.target.value)}
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
          <Typography sx={{fontWeight:"bold"}}>&nbsp;Pharmacy Information :</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              name="GST"
              label="GST Number"
              type="text"
              id="GST"
              onChange={(e) => setGST(e.target.value)}
            />
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
              name="drugLicense"
              label="Drug License Number"
              type="text"
              id="drugLicense"
              onChange={(e) => setDrugLicense(e.target.value)}
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

export default PharmacyRegistrationScreen;
