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

const DoctorConsultationPending = () => {
  const [spinnerOn, setSpinnerOn] = useState(true);
  const [tabvalue, setTabvalue] = useState(0);
  const [meetingData, setMeetingData] = useState([]);
  const [meetingDisplay, setMeetingDisplay] = useState([]);
  const mode = ['All', 'Accepted', 'Pending', 'Cancelled'];

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
        const res = await fetch(`${baseUrl}/doctor/doctorConsultationsPending`, requestOptions);
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
  }

  const handleAcceptButton = async (e) => {
    const meetingID = e.target.value;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("meetingID", meetingID);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    const res = await fetch(`${baseUrl}/meeting/acceptMeetingRequest`, requestOptions);
    if(res.status === 400 || res.status === 500 || res.status === 401) {
      toast.error("Error in accepting meeting");
      // setSpinnerOn(false);
      return;
    }
    toast.success('Consultation request accepted, Check Accepted tab for meeting details.');
    getMeetings();
  }

  const handleCancelButton = async (e) => {
    const meetingID = e.target.value;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("meetingID", meetingID);
    urlencoded.append("reason", "Not required");
    urlencoded.append("refund", true);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    const res = await fetch(`${baseUrl}/meeting/cancelMeetingRequest`, requestOptions);
    if(res.status === 400 || res.status === 500 || res.status === 401) {
      toast.error("Error in cancelling meeting");
      // setSpinnerOn(false);
      return;
    }
    toast.success('Consultation request cancelled, Check Cancelled tab for more details.');
    getMeetings();
  }

  return (
    <FormContainer>
      <Grid sx={{marginTop:'1rem'}}>
        <h2>Pending requests :</h2>
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
                        Customer Name : {meeting.customerName}
                      </Typography>
                      <Typography variant="body2">
                        Consultation Time : {formatTime(meeting.consultationTime)}
                      </Typography>
                      </div>
                      <div>
                        {
                          ((new Date().toDateString()) === new Date(Number(meeting.consultationTime)).toDateString())
                            ?
                              <>
                              <Button sx={{marginTop:'-1rem'}} size="small" variant='contained' value={meeting._id} onClick={handleAcceptButton}>Accept Request</Button>
                              <Button size="small" variant='contained' value={meeting._id} onClick={handleCancelButton}>Cancel Request</Button>
                              </>
                            :
                              <>
                                Status : Expired
                              </>
                        }
                      </div>
                  </CardContent>
                </Card>
              )
            })
          :
          <Spinner />
        }
        
      </Grid>
    </FormContainer>
  );
};

export default DoctorConsultationPending;
