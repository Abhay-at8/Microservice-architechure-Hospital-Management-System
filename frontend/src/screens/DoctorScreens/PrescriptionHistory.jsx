import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Spinner } from 'react-bootstrap/esm';
import { baseUrl } from '../../utils';

const DoctorPrecriptionHistory = () => {
  const [spinnerOn, setSpinnerOn] = useState(true);
  const [prescriptionsData, setPrescriptionsData] = useState([]);

  const { userInformation } = useSelector((state) => state.auth);

  useEffect(() => {
    getPrescriptions();
    if(prescriptionsData[0] === null) toast.error("No prescriptions found")
  }, [""])


  const getPrescriptions = async (e) => {
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
        const res = await fetch(`${baseUrl}/doctor/doctorPrescriptions`, requestOptions);
        const resp = await res.json()
        if(res.status === 400 || res.status === 500 || res.status === 401 || resp['prescriptions'] === null) {
          toast.error("No prescriptions found");
          setSpinnerOn(false);
          return;
        }
        const prescriptions = Object.values(resp['prescriptions']).reverse();
        setPrescriptionsData(prescriptions);
        setSpinnerOn(false);
        // console.log(r);
  }

  return (
    <FormContainer>
      <Grid sx={{marginTop:'1rem'}}>
        {spinnerOn ? <Loader /> : ""}
        {
          (prescriptionsData !== null)
          ?
            prescriptionsData.map((prescription, index) => {
              return (
                <Card sx={{ minWidth: 275, marginTop:'1rem', height:'5rem'}} variant="outlined" key={index}>
                  <CardContent sx={{display:'grid', gridTemplateColumns:'2fr 1fr', textAlign:'center'}}>
                      <div>
                      <Typography variant="body2" sx={{marginTop:'0.5rem'}}>
                        Customer : {prescription.customer}
                      </Typography>
                      <Typography variant="body2">
                        Creation Time : {prescription.createdAt.slice(12,17) + "/" + prescription.createdAt.slice(0,11)}
                      </Typography>
                      </div>
                      <div>
                      <Typography variant="body2">
                        Prescription : {prescription.prescriptionData}
                      </Typography>
                      <Typography variant="body2">
                        Status : {prescription.orderStatus}
                      </Typography>
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

export default DoctorPrecriptionHistory;
