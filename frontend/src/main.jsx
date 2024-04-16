import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import PatientRegistrationScreen from './screens/PatientScreens/PatientRegistrationScreen.jsx';
import DoctorRegistrationScreen from './screens/DoctorScreens/DoctorRegistrationScreen.jsx';
import DoctorConsultationHistory from './screens/DoctorScreens/ConsultationHistory.jsx';
import DoctorConsultationPending from './screens/DoctorScreens/ConsultationPending.jsx';
import DoctorConsultationAccepted from './screens/DoctorScreens/ConsultationAccepted.jsx';
import CreatePrescription from './screens/DoctorScreens/CreatePrescription.jsx';
import PharmacyRegistrationScreen from './screens/PharmacyScreens/PharmacyRegistrationScreen.jsx';
import OpenOrders from './screens/PharmacyScreens/OpenOrders.jsx';
import OrderHistory from './screens/PharmacyScreens/OrderHistory.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import EditProfileScreen from './screens/EditProfileScreen.jsx';
import ChooseDoctor from './screens/PatientScreens/ChooseDoctor.jsx';
import ConsultationHistory from './screens/PatientScreens/ConsultationHistory.jsx';
import PatientPrediction from './screens/PatientScreens/PatientPrediction.jsx';
import PredictionHistory from './screens/PatientScreens/PredictionHistory.jsx';
import PlaceMedicineOrder from './screens/PatientScreens/PlaceMedicineOrder.jsx';
import DoctorPrecriptionHistory from './screens/DoctorScreens/PrescriptionHistory.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/registerPatient' element={<PatientRegistrationScreen />} />
      <Route path='/registerDoctor' element={<DoctorRegistrationScreen />} />
      <Route path='/registerPharmacy' element={<PharmacyRegistrationScreen />} />
      <Route path='' element={<PrivateRoute />}>  
        <Route path='/editProfile' element={<EditProfileScreen />} />
        <Route path='/prediction' element={<PatientPrediction />} />
        <Route path='/chooseDoctor' element={<ChooseDoctor />} />
        <Route path='/consultationHistory' element={<ConsultationHistory />} />
        <Route path='/PlaceMedicineOrder' element={<PlaceMedicineOrder />} />
        <Route path='/predictionHistory' element={<PredictionHistory />} />
        <Route path='/doctorConsultationsHistory' element={<DoctorConsultationHistory />} />
        <Route path='/doctorConsultationsPending' element={<DoctorConsultationPending />} />
        <Route path='/doctorConsultationsAccepted' element={<DoctorConsultationAccepted />} />
        <Route path='/doctorPrecriptionHistory' element={<DoctorPrecriptionHistory />} />
        <Route path='/createPrescription' element={<CreatePrescription />} />
        <Route path='/OpenOrders' element={<OpenOrders />} />
        <Route path='/orderHistory' element={<OrderHistory />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
