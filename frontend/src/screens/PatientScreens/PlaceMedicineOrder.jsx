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

const PlaceMedicineOrder = () => {
  const [spinnerOn, setSpinnerOn] = useState(true);
  const [tabvalue, setTabvalue] = useState(0);
  const [ordersData, setOrdersData] = useState([]);
  const [ordersDisplay, setOrdersDisplay] = useState([]);
  const mode = ['All', 'Pending', 'Placed'];
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState({});

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
    if(ordersData[0] === null) toast.error("No orderss found")
  }, [""])


  const getOrders = async (e) => {
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
        const res = await fetch(`${baseUrl}/patient/getMedicineOrders`, requestOptions);
        const resp = await res.json()
        if(res.status === 400 || res.status === 500 || res.status === 401 || resp['orders'] === null) {
          toast.error("No orders found");
          setSpinnerOn(false);
          return;
        }
        const orders = Object.values(resp['orders']).reverse();
        setOrdersData(orders);
        setOrdersDisplay(orders);
        setSpinnerOn(false);
        // console.log(orders);
  }

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
    if(newValue === 0) {
      setOrdersDisplay(ordersData);
      return;
    }
    if(newValue === 2) {
      const displayData = ordersData.filter((orders) => {
        return orders.orderStatus !== 'Pending';
      })
      setOrdersDisplay(displayData);
      return;
    }
    const displayData = ordersData.filter((orders) => {
      return orders.orderStatus == mode[newValue];
    })
    setOrdersDisplay(displayData);
  };

  const handleButton = async (e) => {
    const orderID = e.target.value;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("_id", orderID);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    const res = await fetch(`${baseUrl}/patient/placeOrder`, requestOptions);
    const resp = await res.json()
    if(res.status === 400 || res.status === 500 || res.status === 401 || resp['order'] === null) {
      toast.error("Error in placing order");
      setSpinnerOn(false);
      return;
    }
    // const orders = Object.values(resp['orders']).reverse();
    toast.success("Order Placed Successfully");
    getOrders();
  }

  const handleDeliveredButton = async (e) => {
    const orderID = e.target.value;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("orderID", orderID);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    const res = await fetch(`${baseUrl}/patient/markDelivered`, requestOptions);
    const resp = await res.json()
    if(res.status === 400 || res.status === 500 || res.status === 401 || resp['order'] === null) {
      toast.error("Error in updating order details");
      setSpinnerOn(false);
      return;
    }
    toast.success("Order marked as Delivered");
    getOrders();
  }

  return (
    <FormContainer>
      <Tabs value={tabvalue} onChange={handleTabChange} centered>
        <Tab label="All" />
        <Tab label="Pending" />
        <Tab label="Placed" />
      </Tabs>
      <Grid sx={{marginTop:'1rem'}}>
        {spinnerOn ? <Loader /> : ""}
        {
          (ordersDisplay !== null)
          ?
            ordersDisplay.map((orders, index) => {
              return (
                <Card sx={{ minWidth: 275, marginTop:'1rem', minHeight:'5rem'}} variant="outlined" key={index}>
                  <CardContent sx={{display:'grid', gridTemplateColumns:'2fr 1fr', textAlign:'center'}}>
                      <div>
                        <Typography variant="body2" sx={{marginTop:'0.5rem'}}>
                          Dr. {orders.doctor}
                        </Typography>
                        <Typography variant="body2">
                          Prescription : {orders.prescriptionData}
                        </Typography>
                        <Typography variant="body2">
                          Created At : {`${String(orders.createdAt).slice(11,16)} / ${String(orders.createdAt).slice(0,10)}`}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="body2" sx={{marginTop:'0.7rem'}}>
                          Status : {orders.orderStatus}
                          {/* {orders.orderStatus === 'Pending' ? 'Pending' : 'Placed'} */}
                        </Typography>
                        {
                          (orders.orderStatus === 'Pending')
                          ?
                          <Button size="small" variant='contained' 
                                    value={orders._id}
                                    onClick={handleButton}
                          >
                            Place Order
                          </Button>
                          :
                          (orders.orderStatus === 'Delivered' || orders.orderStatus === 'Placed')
                          ?
                          <Button size="small" variant='contained' disabled>
                            Order {orders.orderStatus}
                          </Button>
                          :
                          <Button size="small" variant='contained' 
                                    value={orders.orderID}
                                    onClick={handleDeliveredButton}
                          >
                            Mark as Delivered
                          </Button>
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

export default PlaceMedicineOrder;
