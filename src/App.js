import React, {useEffect, useRef} from 'react';
import './App.css';
import Header from './components/Header';
import Winners from './components/Winners';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import prizeVideo from './assets/video/noble_prize.mp4';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function App() {
  const videoRef = useRef();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const setPlayBack = () => {
    videoRef.current.playbackRate = 2.5;
  };
  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 2600);
  }, []);
  return (
    <div className="App">
      <Backdrop className={classes.backdrop} open={open}>
          <Paper style={{padding:'50px'}} elevation={12}>
            <video muted autoPlay ref={videoRef} onCanPlay={() => setPlayBack()}>
                <source src= { prizeVideo } type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
            </video>
          </Paper>
      </Backdrop>
      <Header/>
      <Winners/>
    </div>
  );
}

export default App;
