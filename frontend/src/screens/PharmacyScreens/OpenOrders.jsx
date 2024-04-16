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

const OpenOrders = () => {
  const [spinnerOn, setSpinnerOn] = useState(true);
  const [tabvalue, setTabvalue] = useState(0);
  const [ordersData, setOrdersData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const dispatch = useDispatch();

  const { userInformation } = useSelector((state) => state.auth);

  useEffect(() => {
    getOrders();
    if(ordersData[0] === null) toast.error("No meetings found")
  }, [""])


  const getOrders = async (e) => {
      var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var urlencoded = new URLSearchParams();
        urlencoded.append("city", userInformation.city);
  
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        const res = await fetch(`${baseUrl}/pharmacy/openOrders`, requestOptions);
        const resp = await res.json()
        if(res.status === 400 || res.status === 500 || res.status === 401 || resp['orders'] === null) {
          toast.error("No orders found");
          setSpinnerOn(false);
          return;
        }
        const orders = Object.values(resp['orders']);
        // console.log(orders);
        setOrdersData(orders);
        setSpinnerOn(false);
        // console.log(r);
  }

  const handleButton = (e) => {
    const orderID = e.target.value;
    const order = ordersData.filter((o) => {return o._id === orderID})[0];
    setSelectedOrder([order.customer, order.prescriptionData, order.customerAddress, order.doctor, order._id, order.customerEmail]);
    handleClickOpen();
  }

  const handleAccept = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("id", selectedOrder[4]);
    urlencoded.append("customerEmail", selectedOrder[5]);
    urlencoded.append("storeID", userInformation._id);
    urlencoded.append("pharmacyEmail", userInformation.email);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    const res = await fetch(`${baseUrl}/pharmacy/acceptOrder`, requestOptions);
    const resp = await res.json()
    if(res.status === 400 || res.status === 500 || res.status === 401 || resp['order'] === null) {
      toast.error("Error in accepting order");
      setSpinnerOn(false);
      return;
    }
    // const orderaccepted = Object.values(resp['order']).reverse();
    // console.log(orderaccepted);
    toast.success("Order Accepted");
    getOrders();
    // setOrdersData(orders);
    // setSpinnerOn(false);
    handleClose();
  }

  return (
    <FormContainer>
      Open Orders :
      <Grid sx={{marginTop:'1rem'}}>
        {spinnerOn ? <Loader /> : ""}
        {
          (ordersData !== null)
          ?
            ordersData.map((order, index) => {
              return (
                <Card sx={{ minWidth: 275, marginTop:'1rem', minHeight:'5rem'}} variant="outlined" key={index}>
                  <CardContent sx={{display:'grid', gridTemplateColumns:'2fr 1fr', textAlign:'center'}}>
                    {/* {console.log(order)} */}
                      <div>
                      <Typography variant="body2" sx={{marginTop:'0.5rem'}}>
                        Customer Name : {order.customer}
                      </Typography>
                      <Typography variant="body2">
                        Prescription : {order.prescriptionData}
                      </Typography>
                      <Typography variant="body2">
                        Order Time : {`${String(order.updatedAt).slice(11,16)} / ${String(order.updatedAt).slice(0,10)}`}
                      </Typography>
                      </div>
                      <div>
                      <Typography variant="body2" sx={{marginTop:'0.7rem'}}>
                        Status : {order.orderStatus}
                      </Typography>
                      <Button size="small" variant='contained' 
                              value={order._id} 
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
          Order Details
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
            Customer : {selectedOrder[0]}
          </Typography>
          <Typography gutterBottom>
            Prescription : {selectedOrder[1]}
          </Typography>
          <Typography gutterBottom>
            Address: {selectedOrder[2]}
          </Typography>
          <Typography gutterBottom>
            Doctor: {selectedOrder[3]}
          </Typography>
        </DialogContent>
        <DialogActions>
        <Button autoFocus onClick={handleAccept}>
            Accept Order
        </Button> 
        </DialogActions>
      </Dialog>
      </Grid>
    </FormContainer>
  );
};

export default OpenOrders;
