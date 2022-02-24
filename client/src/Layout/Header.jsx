import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { authenticationService } from '../Services/authenticationService';
import history from '../Utilities/history';
import logo from './logo.png';
import MeetingRoomTwoToneIcon from '@material-ui/icons/MeetingRoomTwoTone';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import GavelOutlinedIcon from '@material-ui/icons/GavelOutlined';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'flex',
    },
    userDropdown: {
        marginLeft: theme.spacing(2),
        padding: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            marginLeft: 'auto',
        },
    },
}));

const Header = () => {
    const [currentUser] = useState(authenticationService.currentUserValue);
    const [anchorEl, setAnchorEl] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
console.log(currentUser);
    const handleDropClose = () => {
        setDropdownOpen(false);
        setAnchorEl(null);
    };

    const handleDropOpen = event => {
        setDropdownOpen(true);
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        authenticationService.logout();
        history.push('/');
    };
    const handlesetting = () =>{
        history.push('/setting');
    }
    const handleprofile = () => {
        history.push('/profile');
    };
    const handlecontact =()=>{
        history.push('/contact');
    }
    const handleRules =()=>{
        history.push('/Rules');
    }
    const handleAdmin =()=>{
        history.push('/AdminSetting');
    }

    const arrowIcon = () => {
        if (dropdownOpen) {
            return <ArrowDropUpIcon />;
        }
        return <ArrowDropDownIcon />;
    };

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link href="/chat" className={classes.title}>
                        <img src={logo} alt="Logo" />
                    </Link>
                    <Button color="inherit" onClick={handleprofile}><AccountCircleOutlinedIcon />profile</Button>
                    <Button color="inherit"onClick={handlesetting} ><TuneOutlinedIcon  />setting</Button>
                    <Button color="inherit" onClick={handlecontact}><ContactSupportOutlinedIcon/>contact</Button>
                    <Button
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={handleDropOpen}
                        className={classes.userDropdown}
                        color="inherit"
                    >
                        {currentUser.name}
                        {arrowIcon()}
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleDropClose}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                      {currentUser.name === "raedrdh"?<MenuItem onClick={handleAdmin}><TuneOutlinedIcon color='primary'/>Admin Setting</MenuItem> : null}  
                        <MenuItem onClick={handleRules}><GavelOutlinedIcon color='primary'/>Rules</MenuItem>
                        <MenuItem onClick={handleLogout} ><MeetingRoomTwoToneIcon color='primary'/> Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            
        </div>
    );
};

export default Header;
