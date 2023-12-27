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

const yearOptions = [
  {
    value: '',
    label: '1900-2018',
  },
  {
    value: '2018',
    label: '2018',
  },
  {
    value: '2017',
    label: '2017',
  },
  {
    value: '2016',
    label: '2016',
  },
  {
    value: '2015',
    label: '2015',
  },
  {
    value: '2014',
    label: '2014',
  },
  {
    value: '2013',
    label: '2013',
  },
  {
    value: '2012',
    label: '2012',
  },
  {
    value: '2011',
    label: '2011',
  },
  {
    value: '2010',
    label: '2010',
  },
  {
    value: '2009',
    label: '2009',
  },
  {
    value: '2008',
    label: '2008',
  },
  {
    value: '2007',
    label: '2007',
  },
  {
    value: '2006',
    label: '2006',
  },
  {
    value: '2005',
    label: '2005',
  },
  {
    value: '2004',
    label: '2004',
  },
  {
    value: '2003',
    label: '2003',
  },
  {
    value: '2002',
    label: '2002',
  },
  {
    value: '2001',
    label: '2001',
  },
  {
    value: '2000',
    label: '2000',
  },
  {
    value: '1999',
    label: '1999',
  },
  {
    value: '1998',
    label: '1998',
  },
  {
    value: '1997',
    label: '1997',
  },
  {
    value: '1996',
    label: '1996',
  },
  {
    value: '1995',
    label: '1995',
  },
  {
    value: '1994',
    label: '1994',
  },
  {
    value: '1993',
    label: '1993',
  },
  {
    value: '1992',
    label: '1992',
  },
  {
    value: '1991',
    label: '1991',
  },
  {
    value: '1990',
    label: '1990',
  },
  {
    value: '1989',
    label: '1989',
  },
  {
    value: '1988',
    label: '1988',
  },
  {
    value: '1987',
    label: '1987',
  },
  {
    value: '1986',
    label: '1986',
  },
  {
    value: '1985',
    label: '1985',
  },
  {
    value: '1984',
    label: '1984',
  },
  {
    value: '1983',
    label: '1983',
  },
  {
    value: '1982',
    label: '1982',
  },
  {
    value: '1981',
    label: '1981',
  },
  {
    value: '1980',
    label: '1980',
  },
  {
    value: '1979',
    label: '1979',
  },
  {
    value: '1978',
    label: '1978',
  },
  {
    value: '1977',
    label: '1977',
  },
  {
    value: '1976',
    label: '1976',
  },
  {
    value: '1975',
    label: '1975',
  },
  {
    value: '1974',
    label: '1974',
  },
  {
    value: '1973',
    label: '1973',
  },
  {
    value: '1972',
    label: '1972',
  },
  {
    value: '1971',
    label: '1971',
  },
  {
    value: '1970',
    label: '1970',
  },
  {
    value: '1969',
    label: '1969',
  },
  {
    value: '1968',
    label: '1968',
  },
  {
    value: '1967',
    label: '1967',
  },
  {
    value: '1966',
    label: '1966',
  },
  {
    value: '1965',
    label: '1965',
  },
  {
    value: '1964',
    label: '1964',
  },
  {
    value: '1963',
    label: '1963',
  },
  {
    value: '1962',
    label: '1962',
  },
  {
    value: '1961',
    label: '1961',
  },
  {
    value: '1960',
    label: '1960',
  },
  {
    value: '1959',
    label: '1959',
  },
  {
    value: '1958',
    label: '1958',
  },
  {
    value: '1957',
    label: '1957',
  },
  {
    value: '1956',
    label: '1956',
  },
  {
    value: '1955',
    label: '1955',
  },
  {
    value: '1954',
    label: '1954',
  },
  {
    value: '1953',
    label: '1953',
  },
  {
    value: '1952',
    label: '1952',
  },
  {
    value: '1951',
    label: '1951',
  },
  {
    value: '1950',
    label: '1950',
  },
  {
    value: '1949',
    label: '1949',
  },
  {
    value: '1948',
    label: '1948',
  },
  {
    value: '1947',
    label: '1947',
  },
  {
    value: '1946',
    label: '1946',
  },
  {
    value: '1945',
    label: '1945',
  },
  {
    value: '1944',
    label: '1944',
  },
  {
    value: '1943',
    label: '1943',
  },
  {
    value: '1942',
    label: '1942',
  },
  {
    value: '1941',
    label: '1941',
  },
  {
    value: '1940',
    label: '1940',
  },
  {
    value: '1939',
    label: '1939',
  },
  {
    value: '1938',
    label: '1938',
  },
  {
    value: '1937',
    label: '1937',
  },
  {
    value: '1936',
    label: '1936',
  },
  {
    value: '1935',
    label: '1935',
  },
  {
    value: '1934',
    label: '1934',
  },
  {
    value: '1933',
    label: '1933',
  },
  {
    value: '1932',
    label: '1932',
  },
  {
    value: '1931',
    label: '1931',
  },
  {
    value: '1930',
    label: '1930',
  },
  {
    value: '1929',
    label: '1929',
  },
  {
    value: '1928',
    label: '1928',
  },
  {
    value: '1927',
    label: '1927',
  },
  {
    value: '1926',
    label: '1926',
  },
  {
    value: '1925',
    label: '1925',
  },
  {
    value: '1924',
    label: '1924',
  },
  {
    value: '1923',
    label: '1923',
  },
  {
    value: '1922',
    label: '1922',
  },
  {
    value: '1921',
    label: '1921',
  },
  {
    value: '1920',
    label: '1920',
  },
  {
    value: '1919',
    label: '1919',
  },
  {
    value: '1918',
    label: '1918',
  },
  {
    value: '1917',
    label: '1917',
  },
  {
    value: '1916',
    label: '1916',
  },
  {
    value: '1915',
    label: '1915',
  },
  {
    value: '1914',
    label: '1914',
  },
  {
    value: '1913',
    label: '1913',
  },
  {
    value: '1912',
    label: '1912',
  },
  {
    value: '1911',
    label: '1911',
  },
  {
    value: '1910',
    label: '1910',
  },
  {
    value: '1909',
    label: '1909',
  },
  {
    value: '1908',
    label: '1908',
  },
  {
    value: '1907',
    label: '1907',
  },
  {
    value: '1906',
    label: '1906',
  },
  {
    value: '1905',
    label: '1905',
  },
  {
    value: '1904',
    label: '1904',
  },
  {
    value: '1903',
    label: '1903',
  },
  {
    value: '1902',
    label: '1902',
  },
  {
    value: '1901',
    label: '1901',
  },
  {
    value: '1900',
    label: '1900',
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
