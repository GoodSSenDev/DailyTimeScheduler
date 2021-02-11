import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {ListItemText,ListItemIcon,MenuItem,Menu,Button} from '@material-ui/core'

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

export default function NavPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
        style={{padding:"10px" ,position:"fixed"}}
      >
        {Boolean(anchorEl) ? <MenuOpenIcon fontSize="medium" />:<MenuIcon fontSize="medium" />}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem to='/' component={Link}>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </StyledMenuItem>
        <StyledMenuItem to='/counter' component={Link}>
          <ListItemIcon>
            <DateRangeSharpIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </StyledMenuItem>
        <StyledMenuItem to='/tempHome' component={Link}>
          <ListItemIcon>
            <TimelineSharpIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Analysis" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}