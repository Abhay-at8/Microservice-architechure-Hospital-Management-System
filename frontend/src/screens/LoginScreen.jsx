import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginPatientMutation } from '../slices/patientApiSlice';
import { useLoginDoctorMutation } from '../slices/doctorApiSlice';
import { useLoginPharmacyMutation } from '../slices/pharmacyApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { baseUrl } from '../utils';

const LoginScreen = () => {

  const [type, setType] = useState('');

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginPatient, { isLoading }] = useLoginPatientMutation();
  const loginDoctor = useLoginDoctorMutation();
  const loginPharmacy = useLoginPharmacyMutation();

  const { userInformation } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInformation !== null && userInformation.email !== null) {
      navigate('/profile');
    }
  }, [navigate, userInformation]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if(type === '' || email === '' || password === ''){
      toast.error("All fields must be filled");
      return;
    }
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000');
      myHeaders.append('Access-Control-Allow-Credentials', 'true');
      console.log(myHeaders)
      var urlencoded = new URLSearchParams();
      urlencoded.append("email", email);
      urlencoded.append("password", password);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };
      const urlBuilder = baseUrl + type.toLowerCase() + "-api/auth";
      const res = await fetch(urlBuilder, requestOptions);
      console.log(res.status)
      if(res.status === 400 || res.status === 500 || res.status === 401) {
        toast.error("Incorrect Details");
        return;
      }
      const resp = await res.json();
      // const urlBuilder = baseUrl + "/" + type.toLowerCase() + "-api/auth";
      const profileData = await fetch(`${baseUrl}/`)
      dispatch(setCredentials({ ...resp }));
      navigate('/profile');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      
      <FormControl fullWidth sx={{marginTop:'1rem'}}>
        <InputLabel id="type-select-label">Type</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={type}
          label="type"
          onChange={handleTypeChange}
        >
          <MenuItem value={"Patient"}>Patient</MenuItem>
          <MenuItem value={"Doctor"}>Doctor</MenuItem>
          <MenuItem value={"Pharmacy"}>Pharmacy</MenuItem>
        </Select>
      </FormControl>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={isLoading}
          type='submit'
          variant='primary'
          className='mt-3'
        >
          Sign In
        </Button>
      </Form>

      {isLoading && <Loader />}

      {/* <Row className='py-3'>
        <Col>
          New Customer? <Link to='/register'>Register</Link>
        </Col>
      </Row> */}
    </FormContainer>
  );
};

export default LoginScreen;