import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sportAnchorEl, setSportAnchorEl] = React.useState(null);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleSportMenu = (event) => {
    setSportAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleSportClose = () => {
    setSportAnchorEl(null);
  };
  
  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };
  
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            color: 'white',
            textDecoration: 'none',
            flexGrow: 1,
            fontWeight: 'bold',
          }}
        >
          Sportboxd
        </Typography>
        
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button
            color="inherit"
            onClick={handleSportMenu}
            sx={{ marginRight: 2 }}
          >
            Sports
          </Button>
          <Menu
            anchorEl={sportAnchorEl}
            open={Boolean(sportAnchorEl)}
            onClose={handleSportClose}
          >
            <MenuItem
              onClick={() => {
                navigate('/matches/football');
                handleSportClose();
              }}
            >
              Football
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/matches/basketball');
                handleSportClose();
              }}
            >
              Basketball
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/matches/tennis');
                handleSportClose();
              }}
            >
              Tennis
            </MenuItem>
          </Menu>
          
          <SearchBox />
          
          {userInfo ? (
            <Box>
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar
                  alt={userInfo.username}
                  src={userInfo.profilePicture}
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    navigate('/profile');
                    handleClose();
                  }}
                >
                  Profil
                </MenuItem>
                <Divider />
                <MenuItem onClick={logoutHandler}>Déconnexion</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              color="inherit"
              component={RouterLink}
              to="/login"
            >
              Connexion
            </Button>
          )}
        </Box>
        
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                navigate('/matches/football');
                handleClose();
              }}
            >
              Football
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/matches/basketball');
                handleClose();
              }}
            >
              Basketball
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/matches/tennis');
                handleClose();
              }}
            >
              Tennis
            </MenuItem>
            <Divider />
            {userInfo ? (
              <>
                <MenuItem
                  onClick={() => {
                    navigate('/profile');
                    handleClose();
                  }}
                >
                  Profil
                </MenuItem>
                <MenuItem onClick={logoutHandler}>Déconnexion</MenuItem>
              </>
            ) : (
              <MenuItem
                onClick={() => {
                  navigate('/login');
                  handleClose();
                }}
              >
                Connexion
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;