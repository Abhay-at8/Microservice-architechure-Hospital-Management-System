import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdatePatientMutation } from '../slices/patientApiSlice';
import { setCredentials } from '../slices/authSlice';
import { baseUrl } from '../utils';

const EditProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { userInformation } = useSelector((state) => state.auth);

  // const [updateProfile, { isLoading }] = useUpdatePatientMutation();

  useEffect(() => {
    setName(userInformation.name);
    setEmail(userInformation.email);
  }, [userInformation.email, userInformation.name]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    else if(password.length === 0){
      toast.error("Password cannot be empty")
    } 
    else {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var urlencoded = new URLSearchParams();
        urlencoded.append("name", name);
        urlencoded.append("password", password);
        urlencoded.append("email", userInformation.email);
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        const profileType = String(userInformation.profileType);
        const updateURL = `/${profileType.toLowerCase()}/update${profileType}Profile`
        const res = await fetch(baseUrl+updateURL, requestOptions);
        const val = await res.json();
        if(res.status === 400 || res.status === 500 || val['_id'] === null) {
          toast.error(val.message);
          return;
        }
        dispatch(setCredentials({ ...val }));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <FormContainer>
      <h1>Update Profile</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
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

        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Update
        </Button>

        {/* {isLoading && <Loader />} */}
      </Form>
    </FormContainer>
  );
};

export default EditProfileScreen;
