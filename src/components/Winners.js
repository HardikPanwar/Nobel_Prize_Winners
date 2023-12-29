import React, { useState, useEffect } from 'react';
import { FormControl, MenuItem, Button, Paper, Divider, Typography, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import yearOptions from '../components/YearOption'
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  root: {
    width: 345,
    margin: 50,
    height: 250,
    overflow: 'scroll',
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const categoryOptions = [
  {
    value: '',
    label: 'All',
  },
  {
    value: 'physics',
    label: 'Physics',
  },
  {
    value: 'chemistry',
    label: 'Chemistry',
  },
  {
    value: 'economics',
    label: 'Economics',
  },
  {
    value: 'literature',
    label: 'Literature',
  },
  {
    value: 'medicine',
    label: 'Medicine',
  },
  {
    value: 'peace',
    label: 'Peace',
  },
];



function Winners() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [filteredPrizes, setFilteredPrizes] = useState([]);
  const [multiwinners, setMultiWinners] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterMultiWinners = async () => {
    const arr = [];
    data.map((item) => {
      item.laureates?.map((laureate) => {
        const existing = arr.find((winner) => winner.id === laureate.id);
        if (existing) {
          existing.win += 1;
        } else {
          arr.push({ id: laureate.id, firstname:laureate.firstname ,surname:laureate.surname,year:item.year ,motivation:laureate.motivation, win: 1 });
        }
      });
    });
    const newData = arr.filter((data) => (data.win > 1 && data.year > 1900 && data.year <= 2018));
    setMultiWinners(newData);
  }; 

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.nobelprize.org/v1/prize.json').then(res =>{
        setData(res.data.prizes);
        setFilteredPrizes(res.data.prizes);
      });
      filterData();
      
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };

  const filterData = () => {
    let Temp = data;
    Temp = Temp.filter((data) => data.year > 1900 && data.year <= 2018);
    if (selectedYear) {
      Temp = Temp.filter((data) => data.year === selectedYear);
    }
    if (selectedCategory) {
      Temp = Temp.filter((data) => data.category === selectedCategory);
    }
    setFilteredPrizes(Temp);
  };

  useEffect(() => {
    filterData();
    filterMultiWinners();
  }, [selectedYear, selectedCategory, data]);
  const extra = multiwinners.length - 4;
  multiwinners.splice(3,extra);
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingRight: '50px' }}>
        <div style={{ marginRight: '150px' }}></div>
        <Typography sx={{ marginTop: '20px', letterSpacing: 2, color: '#164863', marginBottom: '10px', padding: '20px' }} variant="h4">
          The Nobel Prize Winners
        </Typography>
        <Button
          onClick={handleClickOpen}
          sx={{
            backgroundColor: '#161a30',
            color: 'white',
            padding: '20px',
            '&:hover': {
              backgroundColor: '#161A30',
            },
          }}
          className="winner-btn">
          <span> </span>
          <span> </span>
          <span> </span>
          <span> </span>
          top winners
        </Button>

        <BootstrapDialog onClose={handleClose} sx={{width:"560px",margin:"auto"}} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <span style={{ fontWeight: 700, color: '#662549' }}>People who won Nobel Prize Multiple times</span>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}>
            <CloseIcon />
          </IconButton>
          <DialogContent >
                {multiwinners.map((prize,idx)=>(
                    <Card className={classes.root} key={idx} elevation={12}>
                        <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="h1" style={{ color: '#B99470', fontVariant: 'oldstyle-nums' }}>
                            {prize.year}
                            </Typography>
                            <Typography style={{ color: '#662549', fontVariant: 'all-small-caps', fontWeight: '550', fontSize: '18px', marginBottom: '20px' }}>{prize.firstname} {prize.surname}</Typography>
                            <Typography variant="body2" style={{ fontWeight: '500', color: 'gray' }} component="p">
                            {prize.motivation}
                            </Typography>
                        </CardContent>
                        </CardActionArea>
                    </Card>
            ))}
           
           </DialogContent>
        </BootstrapDialog>
      </Box>

      <Divider dark />

      <FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px' }}>
          <Box sx={{ margin: '20px' }}>
            <TextField sx={{ width: '300px' }} onChange={(e) => setSelectedCategory(e.target.value)} id="outlined-select-currency" select label="Category" defaultValue="" helperText="Please select your category">
              {categoryOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={{ margin: '20px' }}>
            <TextField sx={{ width: '200px' }} onChange={(e) => setSelectedYear(e.target.value)} id="outlined-select-currency" select label="Year" defaultValue="" helperText="Please select your Year">
              {yearOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

        <Paper style={{ padding: '40px' }}>
          <Grid container spacing={1}>
            {filteredPrizes.length == 0 ? (
              <div style={{ fontSize: '30px', alignItems: 'center', justifyContent: 'center', margin: 'auto', display: 'inline-block' }}>
                <ErrorOutlineIcon sx={{ fontSize: '70px', margin: 'auto', color: 'purple' }} /> <p>Data not found</p>{' '}
              </div>
            ) : (
              ''
            )}
            {filteredPrizes.map((prize, ind) => (
              <>
                <Grid item xs={6} md={4}>
                  {/* <Item> */}
                  <Card className={classes.root} key={ind} elevation={12}>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h4" component="h1" style={{ color: '#B99470', fontVariant: 'oldstyle-nums' }}>
                          {prize.year}
                        </Typography>
                        <Typography style={{ color: '#662549', fontVariant: 'all-small-caps', fontWeight: '550', fontSize: '18px', marginBottom: '20px' }}>{prize.laureates?.map((laureate) => `${laureate.firstname} ${laureate.surname}`).join(', ')}</Typography>
                        <Typography variant="body2" style={{ fontWeight: '500', color: 'gray' }} component="p">
                          {prize.laureates?.length >= 1 ? prize.laureates[0].motivation : ''}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              </>
            ))}
          </Grid>
        </Paper>
      </FormControl>
    </div>
  );
}

export default Winners;
