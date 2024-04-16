import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';
import { LinkContainer } from 'react-router-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import { Nav, Row, Col } from 'react-bootstrap';
import { Grid } from '@mui/material';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [profileType, setProfileType] = useState('');

  const dispatch = useDispatch();

  const { userInformation } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInformation.name);
    setEmail(userInformation.email);
    setProfileType(userInformation.profileType)
  }, [userInformation.email, userInformation.name, userInformation.profileType]);

  return (
    <FormContainer>
      <h1>Hello {profileType==="Doctor" ? "Dr." : ""} {name},</h1>
      <h6>&nbsp;Choose your action below :</h6>
      {/* <Grid sx={{textAlign:'center', marginTop:'1rem'}}>
        <Row className='justify-content-md-center'>
          <Col xs={8} className='card'>
            <LinkContainer to='/editProfile'>
                  <Nav.Link>
                    <EditIcon /> <h6>Edit Profile</h6>
                  </Nav.Link>
              </LinkContainer>
          </Col>
      </Row>
      </Grid> */}
      {
      profileType==="Pharmacy" ?  
        <Grid>
          <Grid  sx={{textAlign:'center', marginTop:'1rem'}}>
            <Row className='justify-content-md-center'>
              <Col xs={8} className='card'>
                <LinkContainer to='/OpenOrders'>
                      <Nav.Link>
                        <EditIcon /> <h6>View Orders</h6>
                      </Nav.Link>
                  </LinkContainer>
              </Col>
          </Row>
          </Grid>
          <Grid  sx={{textAlign:'center', marginTop:'1rem'}}>
            <Row className='justify-content-md-center'>
              <Col xs={8} className='card'>
                <LinkContainer to='/orderHistory'>
                      <Nav.Link>
                        <EditIcon /> <h6>Inventory Management</h6>
                      </Nav.Link>
                  </LinkContainer>
              </Col>
          </Row>
          </Grid>
          <Grid  sx={{textAlign:'center', marginTop:'1rem'}}>
            <Row className='justify-content-md-center'>
              <Col xs={8} className='card'>
                <LinkContainer to='/orderHistory'>
                      <Nav.Link>
                        <EditIcon /> <h6>Order History</h6>
                      </Nav.Link>
                  </LinkContainer>
              </Col>
          </Row>
          </Grid>

        </Grid>   
      :
      <></>
      }
      {
      profileType==="Doctor" ?  
        <Grid>
          {/* <Grid  sx={{textAlign:'center', marginTop:'1rem'}}>
            <Row className='justify-content-md-center'>
              <Col xs={8} className='card'>
                <LinkContainer to='/doctorConsultationsPending'>
                      <Nav.Link>
                        <EditIcon /> <h6>Consultation Requests</h6>
                      </Nav.Link>
                  </LinkContainer>
              </Col>
          </Row>
          </Grid>
          <Grid  sx={{textAlign:'center', marginTop:'1rem'}}>
            <Row className='justify-content-md-center'>
              <Col xs={8} className='card'>
                <LinkContainer to='/doctorConsultationsAccepted'>
                      <Nav.Link>
                        <EditIcon /> <h6>Accepted Consultations</h6>
                      </Nav.Link>
                  </LinkContainer>
              </Col>
          </Row>
          </Grid> */}
          <Grid  sx={{textAlign:'center', marginTop:'1rem'}}>
            <Row className='justify-content-md-center'>
              <Col xs={8} className='card'>
                <LinkContainer to='/doctorConsultationsHistory'>
                      <Nav.Link>
                        <EditIcon /> <h6>All Consultations</h6>
                      </Nav.Link>
                  </LinkContainer>
              </Col>
          </Row>
          </Grid>
          <Grid  sx={{textAlign:'center', marginTop:'1rem'}}>
            <Row className='justify-content-md-center'>
              <Col xs={8} className='card'>
                <LinkContainer to='/createPrescription'>
                      <Nav.Link>
                        <EditIcon /> <h6>Create Prescription</h6>
                      </Nav.Link>
                  </LinkContainer>
              </Col>
          </Row>
          </Grid>
          <Grid  sx={{textAlign:'center', marginTop:'1rem'}}>
            <Row className='justify-content-md-center'>
              <Col xs={8} className='card'>
                <LinkContainer to='/doctorPrecriptionHistory'>
                      <Nav.Link>
                        <EditIcon /> <h6>Prescription History</h6>
                      </Nav.Link>
                  </LinkContainer>
              </Col>
          </Row>
          </Grid>
        </Grid>   
      :
      <></>
      }
      {
      profileType==="Patient" ?
        <Grid>  
        <Grid sx={{textAlign:'center', marginTop:'1rem'}}>
          <Row className='justify-content-md-center'>
            <Col xs={8} className='card'>
              <LinkContainer to='/chooseDoctor' state={{'doctorSpecialization': ''}}>
                    <Nav.Link>
                      <EditIcon /> <h6>Consult Doctor</h6>
                    </Nav.Link>
                </LinkContainer>
            </Col>
        </Row>
        </Grid>
        <Grid sx={{textAlign:'center', marginTop:'1rem'}}>
          <Row className='justify-content-md-center'>
            <Col xs={8} className='card'>
              <LinkContainer to='/consultationHistory'>
                    <Nav.Link>
                      <EditIcon /> <h6>Consultations</h6>
                    </Nav.Link>
                </LinkContainer>
            </Col>
        </Row>
        </Grid>
        <Grid sx={{textAlign:'center', marginTop:'1rem'}}>
          <Row className='justify-content-md-center'>
            <Col xs={8} className='card'>
              <LinkContainer to='/prediction'>
                    <Nav.Link>
                      <EditIcon /> <h6>Predict Disease</h6>
                    </Nav.Link>
                </LinkContainer>
            </Col>
        </Row>
        </Grid>
        {/* <Grid sx={{textAlign:'center', marginTop:'1rem'}}>
          <Row className='justify-content-md-center'>
            <Col xs={8} className='card'>
              <LinkContainer to='/predictionHistory'>
                    <Nav.Link>
                      <EditIcon /> <h6>Prediction History</h6>
                    </Nav.Link>
                </LinkContainer>
            </Col>
        </Row>
        </Grid>
        <Grid sx={{textAlign:'center', marginTop:'1rem'}}>
          <Row className='justify-content-md-center'>
            <Col xs={8} className='card'>
              <LinkContainer to='/PlaceMedicineOrder'>
                    <Nav.Link>
                      <EditIcon /> <h6>Place Medicine Order</h6>
                    </Nav.Link>
                </LinkContainer>
            </Col>
        </Row>
        </Grid> */}
        {/* <Grid sx={{textAlign:'center', marginTop:'1rem'}}>
          <Row className='justify-content-md-center'>
            <Col xs={8} className='card'>
              <LinkContainer to='/DeliveredMedicine'>
                    <Nav.Link>
                      <EditIcon /> <h6>Delivered Medicine</h6>
                    </Nav.Link>
                </LinkContainer>
            </Col>
        </Row>
        </Grid> */}
        </Grid>   
      :
      <></>
      }
    </FormContainer>
  );
};

export default ProfileScreen;
