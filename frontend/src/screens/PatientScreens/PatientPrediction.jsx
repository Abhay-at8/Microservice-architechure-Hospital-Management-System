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
import List from '@mui/material/List';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import { baseUrl } from '../../utils';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const PatientPrediction = () => {
  const [spinnerOn, setSpinnerOn] = useState(true);
  const [value, setValue] = useState("");
  const [meetingData, setMeetingData] = useState([]);
  const [meetingDisplay, setMeetingDisplay] = useState([]);

  const SymptomList = ["Back Pain", "Constipation", "Abdominal Pain", "Diarrhoea", "Mild Fever", "Yellow Urine", "Yellowing  of Eyes", "Acute Liver Failure", "Fluid Overload", "Swelling  of Stomach", "Swelled Lymph Nodes", "Malaise", "Blurred And Distorted Vision", "Phlegm", "Throat Irritation", "Redness of Eyes", "Sinus Pressure", "Runny Nose", "Congestion", "Chest Pain", "Weakness in Limbs", "Fast Heart Rate", "Pain During Bowel Movements", "Pain in Anal Region", "Bloody Stool", "Irritation in Anus", "Neck Pain", "Dizziness", "Cramps", "Bruising", "Obesity", "Swollen Legs", "Swollen Blood Vessels", "Puffy Face And Eyes", "Enlarged Thyroid", "Brittle Nails", "Swollen Extremeties", "Excessive Hunger", "Extra Marital Contacts", "Drying and Tingling Lips", "Slurred Speech", "Knee Pain", "Hip Joint Pain", "Muscle Weakness", "Stiff Neck", "Swelling Joints", "Movement Stiffness", "Spinning Movements", "Loss  of Balance", "Unsteadiness", "Weakness  of One Body Side", "Loss  of Smell", "Bladder Discomfort", "Foul Smell  of Urine", "Continuous Feel  of Urine", "Passage  of Gases", "Internal Itching", "Toxic Look (Typhos)", "Depression","Irritability","Muscle Pain","Altered Sensorium","Red Spots Over Body","Belly Pain", "Abnormal Menstruation","Dischromic Patches","Watering From Eyes","Increased Appetite","Polyuria","Family History","Mucoid Sputum", "Rusty Sputum","Lack  of Concentration","Visual Disturbances","Receiving Blood Transfusion", "Receiving Unsterile Injections","Coma","Stomach Bleeding","Distention  of Abdomen", "History  of Alcohol Consumption","Blood in Sputum","Prominent Veins on Calf", "Palpitations","Painful Walking","Pus Filled Pimples","Blackheads","Scurring","Skin Peeling", "Silver like Dusting","Small Dents in Nails","Inflammatory Nails","Blister","Red Sore Around Nose", "Yellow Crust Ooze"];
  
  const disease=['Fungal infection','Allergy','GERD','Chronic cholestasis','Drug Reaction',
  'Peptic ulcer diseae','AIDS','Diabetes','Gastroenteritis','Bronchial Asthma','Hypertension',
  ' Migraine','Cervical spondylosis',
  'Paralysis (brain hemorrhage)','Jaundice','Malaria','Chicken pox','Dengue','Typhoid','Hepatitis A',
  'Hepatitis B','Hepatitis C','Hepatitis D','Hepatitis E','Alcoholic hepatitis','Tuberculosis',
  'Common Cold','Pneumonia','Dimorphic hemmorhoids(piles)',
  'Heartattack','Varicoseveins','Hypothyroidism','Hyperthyroidism','Hypoglycemia','Osteoarthristis',
  'Arthritis','Paroymsal Positional Vertigo','Acne','Urinary Tract Infection','Psoriasis',
  'Impetigo']

  const specialist = {
    "Fungal infection": "Dermatology",
    "Allergy": "General Physician",
    "GERD": "Gastroenterology",
    "Chronic cholestasis": "Gastroenterology",
    "Drug Reaction": "General Physician",
    "Peptic ulcer disease": "Gastroenterology",
    "AIDS": "General Physician",
    "Diabetes": "Diabetes Consult",
    "Gastroenteritis": "Gastroenterology",
    "Bronchial Asthma": "General Physician",
    "Hypertension": "Cardiology",
    "Migraine": "Neurology",
    "Cervical spondylosis": "Orthopedics",
    "Paralysis (brain hemorrhage)": "Neurology",
    "Jaundice": "Gastroenterology",
    "Malaria": "General Physician",
    "Chicken pox": "General Physician",
    "Dengue": "General Physician",
    "Typhoid": "General Physician",
    "Hepatitis A": "Gastroenterology",
    "Hepatitis B": "Gastroenterology",
    "Hepatitis C": "Gastroenterology",
    "Hepatitis D": "Gastroenterology",
    "Hepatitis E": "Gastroenterology",
    "Alcoholic hepatitis": "Gastroenterology",
    "Tuberculosis": "General Physician",
    "Common Cold": "General Physician",
    "Pneumonia": "General Physician",
    "Dimorphic hemmorhoids(piles)": 'Gastroenterology',
    'Heartattack': 'Cardiology',
    'Varicoseveins': 'Cardiology',
    'Hypothyroidism': 'General Physician',
    'Hyperthyroidism': 'General Physician',
    'Hypoglycemia': 'General Physician',
    'Osteoarthristis': 'Orthopedics',
    'Arthritis': 'Orthopedics',
    'Paroymsal Positional Vertigo': 'Neurology',
    'Acne': 'Dermatology',
    'Urinary Tract Infection': 'General Physician',
    'Psoriasis': 'Dermatology',
    'Impetigo': 'Dermatology'
  }

  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(SymptomList);
  const [right, setRight] = useState([]);
  const [diseaseID, setDiseaseID] = useState('');
  const [diseasePred, setDiseasePred] = useState('');
  const [specialistPred, setSpecialistPred] = useState('');

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card sx={{width:'20rem', marginTop:'1rem', marginBottom:'1rem'}} variant="outlined">
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: '20rem',
          height: '22rem',
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  const dispatch = useDispatch();

  const { userInformation } = useSelector((state) => state.auth);

  const predictDisease = async () => {

//     var myHeaders = new Headers();
// myHeaders.append("Cookie", "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTUyNjJmYWIyMWRlODE1NWE5NGYxNTUiLCJpYXQiOjE2OTk4OTgxMDcsImV4cCI6MTcwMjQ5MDEwN30.vPm-uVKw47dwuiGpy1QpwfQSqN3y-LrQ1F-fILGdwfc");

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
// };

// fetch("http://localhost:8989/hello", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

//   return;


    const diseases = right;
    if(diseases.length < 3) {
      toast.error("Please select atleast 3 symptoms");
      return;
    }
    const indexes = [];
    diseases.forEach((i) => {
      var index = SymptomList.indexOf(i);
      indexes.push(index);
    })
    var diseaseArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    indexes.forEach((i) => {
      diseaseArray[i] = 1;
    })
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("data", diseaseArray);
    var requestOptions = {
      // mode: 'no-cors',
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
    await fetch('http://localhost:8980/predict', requestOptions)
    .then(response => response.json())  
    .then(json => setDiseaseID(json))

    const dis = disease[Number(diseaseID)];
    const spe = specialist[`${disease[Number(diseaseID)]}`]
    setDiseasePred(dis);
    setSpecialistPred(spe);
    var urlencodedAddPrediction = new URLSearchParams();
    urlencodedAddPrediction.append("diseaseName", dis); 
    urlencodedAddPrediction.append("specialist", spe);
    urlencodedAddPrediction.append("symptoms", right);
    var requestOptionsAddPrediction = {
      method: 'POST',
      headers: myHeaders,
      body: urlencodedAddPrediction,
      redirect: 'follow'
    };
    await fetch(`${baseUrl}/patient/addPrediction`, requestOptionsAddPrediction)
    .then(response => response.json())
  }

  return (
    <Card sx={{marginTop:'3rem', width:'50rem', marginLeft:'20%'}} variant="outlined">
      <Grid sx={{marginTop:'1rem', marginLeft:'10%', width:'40rem', textAlign:'center'}}>
        <Typography>Please select the symptoms most applicable to you from drop down and press the right arrow.
        Select atleast 3 symptoms, For best prediction select 5 symptoms.</Typography>
        {/* {disease[value]} */}
      </Grid>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList('Choices', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Chosen', right)}</Grid>
      </Grid>
      <Button variant='contained' sx={{marginLeft:'20rem', marginBottom:'1rem'}} onClick={predictDisease}>Predict Disease</Button>
      {
        (diseaseID !== '')
        ? 
          <Grid sx={{marginBottom:'1rem', textAlign:'center'}}>
          {/* <Typography sx={{margin:'auto'}}> */}
              Disease : {diseasePred}, Suggested Specialist : {specialistPred}
              &nbsp;&nbsp;&nbsp;
              <Link to={'/chooseDoctor'} sx={{marginTop:'-0.2rem'}} state={{"doctorSpecialization": specialistPred}}>Choose Doctor</Link>
          {/* </Typography> */}
          </Grid>
        : ""
      }
      
    </Card>
  );
};

export default PatientPrediction;
