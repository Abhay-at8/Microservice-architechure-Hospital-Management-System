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

const PredictionHistory = () => {
  const [spinnerOn, setSpinnerOn] = useState(true);
  const [tabvalue, setTabvalue] = useState(0);
  const [PredictionData, setPredictionData] = useState([]);
  const mode = ['All', 'Accepted', 'Pending', 'Cancelled'];

  const dispatch = useDispatch();

  const { userInformation } = useSelector((state) => state.auth);

  useEffect(() => {
    getPredictionHistory();
    if(PredictionData[0] === null) toast.error("No predictions found")
  }, [""])

  const getPredictionHistory = async (e) => {
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
        const res = await fetch(`${baseUrl}/patient/predictionHistory`, requestOptions);
        const resp = await res.json()
        if(res.status === 400 || res.status === 500 || res.status === 401 || resp['Predictions'] === null) {
          toast.error("No predictions found");
          setSpinnerOn(false);
          return;
        }
        const Predictions = Object.values(resp['predictions']).reverse();
        setPredictionData(Predictions);
        setSpinnerOn(false);
        // console.log(Predictions);
  }

  return (
    <FormContainer>
      <Grid>
        <h2>Prediction History :</h2>
        {spinnerOn ? <Loader /> : ""}
        {
          (PredictionData !== null)
          ?
            PredictionData.map((Prediction, index) => {
              return (
                <Card sx={{ width: '35rem', marginTop:'1rem', minHeight:'8rem'}} variant="outlined" key={index}>
                  <CardContent sx={{textAlign:'center'}}>
                      <Typography variant="body2" sx={{marginTop:'0.5rem'}}>
                        Disease : {Prediction.diseaseName}
                      </Typography>
                      <Typography variant="body2">
                        Specialist : {Prediction.specialist}
                      </Typography>
                      <Typography variant="body2">
                        Prediction Time : {formatTime(Prediction.timestamp)}
                      </Typography>
                      <Typography variant="body2">
                        Symptoms : {Prediction.symptoms}
                      </Typography>
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

export default PredictionHistory;
