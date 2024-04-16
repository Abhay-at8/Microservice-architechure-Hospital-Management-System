// import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutPatientMutation } from '../slices/patientApiSlice';
// import { useMakeAvailableDoctorMutation, useLogoutDoctorMutation } from '../slices/doctorApiSlice';
import { logout, changeAvailable } from '../slices/authSlice';
import Dialog from '@mui/material/Dialog';
import AccessibleIcon from '@mui/icons-material/Accessible';
import HealingIcon from '@mui/icons-material/Healing';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import { blue } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import { Divider, Typography } from '@mui/material';
import { toast } from 'react-toastify';

function SimpleDialog(props) {

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const navigate = useNavigate();

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select registration type</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => {
              handleClose();
              navigate("/registerPatient");
            }} 
          >
            <ListItemAvatar sx={{ marginLeft: 6 }}>
                <AccessibleIcon sx={{ color: blue[500], fontSize: 40 }}/>
            </ListItemAvatar>
            <ListItemText primary="Patient" />
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => {
              handleClose();
              navigate("/registerDoctor");
            }}
          >
            <ListItemAvatar sx={{ marginLeft: 7 }}>
                <HealingIcon sx={{ color: "black", fontSize: 40 }}/>
            </ListItemAvatar>
            <ListItemText primary="Doctor" />
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => {
              handleClose();
              navigate("/registerPharmacy");
            }}
          >
            <ListItemAvatar sx={{ marginLeft: 5.5 }}>
                <LocalPharmacyIcon sx={{ color: "red", fontSize: 35 }}/>
            </ListItemAvatar>
            <ListItemText primary="Pharmacy" />
          </ListItemButton>
        </ListItem>
        
      </List>
    </Dialog>
  );
}

const Header = () => {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const { userInformation } = useSelector((state) => state.auth);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleAvailableChange = async (event) => {
    try {
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
      const urlBuilder = "http://localhost:5000/api/" + userInformation.profileType.toLowerCase() + "/available";
      const res = await fetch(urlBuilder, requestOptions);

      if(res.status === 400 || res.status === 500 || res.status === 401 || res.status === 404) {
        toast.error("Error in updating status");
        return;
      }
      toast.success("Available status updated successfully");
      dispatch(changeAvailable());
      navigate('/profile');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };


  // useEffect(() => {
  //   setAvailable(userInformation.available);
  // }, [userInformation])

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutPatientMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>MediPro</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInformation ? (
                <>
                  {
                    (userInformation.profileType !== 'Patient')
                    ?
                    <div style={{marginTop:'0.2rem', display:'flex'}}>
                      <div style={{color:'white', marginTop:'0.3rem'}}>Show Available :</div>
                        <Switch
                          checked={userInformation.available}
                          onChange={handleAvailableChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                        &nbsp;
                        <div style={{borderLeft:"1px white solid", height:'35px'}}/>
                    </div>
                    :
                    ""
                  }
                  &nbsp;
                  <NavDropdown title={userInformation.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                    <Nav.Link onClick={handleClickOpen}>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
        <SimpleDialog
          open={open}
          onClose={handleClose}
        />
      </Navbar>
    </header>
  );
};

export default Header;
