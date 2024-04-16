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

const DoctorConsultationHistory = () => {
  const [spinnerOn, setSpinnerOn] = useState(true);
  const [tabvalue, setTabvalue] = useState(0);
  const [meetingData, setMeetingData] = useState([]);
  const [meetingDisplay, setMeetingDisplay] = useState([]);
  const mode = ['All', 'Accepted', 'Cancelled'];
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState({});

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
        setMeetingData(meetings);
        setMeetingDisplay(meetings);
        setSpinnerOn(false);
        // console.log(r);
  }

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
    if(newValue === 0) {
      setMeetingDisplay(meetingData);
      return;
    }
    const displayData = meetingData.filter((meeting) => {
      return meeting.status == mode[newValue];
    })
    setMeetingDisplay(displayData);
  };

  const handleButton = (e) => {
    const meeting = e.target.value.split(',');
    setSelectedMeeting(selectedMeeting => ({
      // ...selectedMeeting,
      ...meeting
    }));
    handleClickOpen();
  }

  return (
    <FormContainer>
      <Tabs value={tabvalue} onChange={handleTabChange} centered>
        <Tab label="All" />
        <Tab label="Accepted" />
        {/* <Tab label="Pending" /> */}
        <Tab label="Cancelled" />
      </Tabs>
      <Grid sx={{marginTop:'1rem'}}>
        {spinnerOn ? <Loader /> : ""}
        {
          (meetingDisplay !== null)
          ?
            meetingDisplay.map((meeting, index) => {
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
                        Status : { ((new Date().toDateString()) !== new Date(Number(meeting.consultationTime)).toDateString()) ? "Expired" : meeting.status}
                      </Typography>
                      <Button size="small" variant='contained' 
                              value={`${meeting.customerName},${meeting.consultationTime},${meeting.meetingDetails.acceptedTime},${meeting.meetingDetails.meetingLink},${meeting.meetingDetails.reason},${meeting.status}`} 
                              onClick={handleButton}
                      >
                        View Details
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
          Meeting Details
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
          <Typography gutterBottom>
            Accepted Time : {(selectedMeeting[5] === 'Accepted') ? formatTime(selectedMeeting[2]) : "Cancelled/Expired"}
          </Typography>
          {(selectedMeeting[5] === 'Accepted')
          ?
            <Typography gutterBottom onClick={handleClose}>
               Meeting Link : <Link>{selectedMeeting[3]}</Link>
            </Typography>
          :
          <Typography gutterBottom onClick={handleClose}>
             Meeting Link : Expired
          </Typography>
          } 
        </DialogContent>
        <DialogActions>
        {(selectedMeeting[5] === 'Accepted' && (new Date().toDateString()) === new Date(Number(selectedMeeting[1])).toDateString())
          ?
           <Button autoFocus onClick={handleClose} >
            Join meeting
           </Button>
          :
           <Button autoFocus onClick={handleClose} disabled>
            Join meeting
           </Button>
          } 
          
        </DialogActions>
      </Dialog>
      </Grid>
    </FormContainer>
  );
};

export default DoctorConsultationHistory;
