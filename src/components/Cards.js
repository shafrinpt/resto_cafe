import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import Cardsdata from './CardsData'
import "./style.css";
import { useDispatch ,useSelector} from 'react-redux';
import { ADD,REMOVE } from '../redux/action/action';

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { getDialogActionsUtilityClass } from '@mui/material';


const shadow = '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const Cards = () => {

  const [value, setValue] = React.useState(0);
  const [data] = useState(Cardsdata);
  const getdata = useSelector((state)=> state.cartreducer.carts);
  const [quantity, setQuantity] = useState(0);
  console.log(getdata)
  //  console.log(data);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const dispatch = useDispatch();

  const send = (e)=>{  
    dispatch(ADD(e));
  }
  const decrease = (e)=>{  
    dispatch(REMOVE(e));
  }

  return (
    <React.Fragment>
      <Typography component="h2" variant="h3" p={4}>{Cardsdata[0].rname}</Typography>
      
        <AppBar position="static" >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            variant="fullWidth"
            style={{background:'white', color:'black'}}
          >
            {
              data.map((restaurent, restaurent_id) =>
                restaurent.table_menu_list.map((menu_category, menu_category_id) => (
                  <Tab label={menu_category.menu_category} {...a11yProps(menu_category_id)} />
                )))
            }
          </Tabs>
        </AppBar>

        <Grid container spacing={2}>
          {
            data.map((restaurent, restaurent_id) =>
              restaurent.table_menu_list.map((menu_category, menu_category_id) => (
                <TabPanel key={menu_category_id} value={value} index={menu_category_id} style={{width: '100%'}}>
                {
                  menu_category.category_dishes.map((element, id) =>  (
                    <Grid item xs={12} key={id} p={2}>
                      <Card>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                          <CardContent style={{width: '100%'}}>
                            <Typography gutterBottom variant="h5" component="div">
                              {element.dish_name}
                            </Typography>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              spacing={{ xs: 1, sm: 2, md: 4 }}
                            >
                              <Typography variant="h6" color="text.secondary">
                                SAR {element.dish_price}
                              </Typography>
                              <div>
                              <Typography variant="h6" color="text.secondary">
                                {element.dish_calories} calories
                              </Typography>
                              <Typography variant="h6" color="text.secondary">
                                {element.dish_price} Price
                              </Typography>
                              </div>
                            </Stack>
                            <Typography variant="body2" color="text.secondary">
                              {element.dish_description}
                            </Typography>
                            <CardActions>
                              <Stack direction="row" spacing={1} alignItems="center"  style={{boxShadow: shadow, borderRadius: '50px', marginTop: '10px', marginBottom: '10px', backgroundColor: 'green'}}>
                                <IconButton aria-label="sub" onClick={()=> {
                                  
                                  setQuantity((pv) => {
                                   return pv - 1;
                                });
                                }}>
                                  <RemoveIcon />
                                </IconButton>
                                <Typography variant="h5" color="text.secondary">
                                  {quantity}
                                </Typography>
                                <IconButton aria-label="add" onClick={()=> {send(element); setQuantity((pv) => {
                                  return pv + 1;
                                })
                                }}>
                                  <AddIcon />
                                </IconButton>
                              </Stack>
                            </CardActions>
                            {element.addonCat.length > 0 && (
                              <Typography variant="body2" color="red">
                                Customizations available
                              </Typography>
                            )}
                          </CardContent>
                          <CardMedia
                            title="green iguana"
                            component="img"
                            alt="green iguana"
                            sx={{ width: '140px', minWidth:'140px', maxHeight: '140px',  padding: '10px', borderRadius: '24px' }}
                            image={element.dish_image}
                          />
                        </Stack>
                      </Card>
                    </Grid>
                  )
                )
              }
              </TabPanel>
            )))
          }
        </Grid>
    </React.Fragment> 
  )
}

export default Cards