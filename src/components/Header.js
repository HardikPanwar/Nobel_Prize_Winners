import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import logo from "../assets/favicon.png"
function Header() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{ backgroundColor: '#161A30' }} position="static">
          <Toolbar>
            <img src={logo} width={50} height={50} style={{marginRight:'20px'}} />
            <Typography sx={{ letterSpacing: 2 ,color:"white"}} variant="h6">
              Noble Winners
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Header;
