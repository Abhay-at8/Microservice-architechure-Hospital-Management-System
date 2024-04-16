import { Container, Card } from 'react-bootstrap';
import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AccessibleIcon from '@mui/icons-material/Accessible';
import HealingIcon from '@mui/icons-material/Healing';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import { blue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function SimpleDialog(props) {

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const navigate = useNavigate();

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select registration type</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => navigate("/registerPatient")} 
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
            onClick={() => navigate("/registerDoctor")}
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
            onClick={() => navigate("/registerPharmacy")}
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

const HomeScreen = () => {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const { userInformation } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInformation !== null && userInformation.email !== null) {
      navigate('/profile');
    }
  }, [navigate, userInformation]);

  return(
    <div className=' py-5'>
    <Container className='d-flex justify-content-center'>
      <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
        <h1 className='text-center mb-4'>MediPro Login</h1>
        <p className='text-center mb-4'>
          Please login/sign-up to continue your action
        </p>
        <div className='d-flex'>
          <Button variant="contained" onClick={() => navigate("/login")} className='me-3'>
            Sign In
          </Button>
          <Button variant="outlined" onClick={handleClickOpen}>
            Register
          </Button>
        </div>
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      </Card>
    </Container>
  </div>
  );
};
export default HomeScreen;
