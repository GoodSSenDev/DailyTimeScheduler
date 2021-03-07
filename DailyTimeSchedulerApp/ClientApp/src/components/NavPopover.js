import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ListItemText, ListItemIcon, MenuItem, Menu, Button, Box } from '@material-ui/core'

import DateRangeSharpIcon from '@material-ui/icons/DateRangeSharp';
import TimelineSharpIcon from '@material-ui/icons/TimelineSharp';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import { Link } from 'react-router-dom';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function NavPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box display={props.isDisplay?"inline":"none"} style={{ padding: "10px", position: "fixed", zIndex: 1400 }}>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          {Boolean(anchorEl) ? <MenuOpenIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
        </Button >
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem to='/' component={Link}>
            <ListItemIcon>
              <HomeIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </StyledMenuItem>
          <StyledMenuItem to='/calendar' component={Link}>
            <ListItemIcon>
              <DateRangeSharpIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </StyledMenuItem>
          <StyledMenuItem to='/analysis' component={Link}>
            <ListItemIcon>
              <TimelineSharpIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Analysis" />
          </StyledMenuItem>
        </StyledMenu>
      </Box>
    </div>
  );
}