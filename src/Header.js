import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Logo from './terra.png';

const styles = theme => ({
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,

  },
  chip: {
    width: 80,
    margin: 2
  },
  lightStatus: {
    [theme.breakpoints.up('md')]: {
      marginLeft: 80
    },
    fontSize: 60
  }
});


class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

 
  render() {
    const { classes, data } = this.props
    const { lightStatus } = data;
    // const lightColor = lightStatus === 1 ? "secondary" : "disabled";
    const buttonText = lightStatus === 1 ? "Light OFF" : "Light ON";
    return (
      <AppBar>
        <Toolbar>
          {/* {/* <IconButton edge="start" className={classes.menuButton}>
            <img alt='Logo' src={Logo} style={{ width: 40 }} /> 
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Terrarium Dashboard
          </Typography>
          <Chip className={classes.chip} avatar={<Avatar>°C</Avatar>} label={data.temperatures} />
          <Chip className={classes.chip} avatar={<Avatar>U</Avatar>} label={data.humidities} />
          <Chip className={classes.chip} avatar={<Avatar>U.A.%</Avatar>} label={data.humiditiesAr} />
          <Chip className={classes.chip} avatar={<Avatar>Lx</Avatar>} label={data.lights} />
          {/* <WbIncandescentOutlinedIcon className={classes.lightStatus} color={lightColor} /> */}
          {/* <Button onClick={this.onButtonClick} variant="contained" color="secondary">
            {buttonText}
          </Button> */}
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Header);