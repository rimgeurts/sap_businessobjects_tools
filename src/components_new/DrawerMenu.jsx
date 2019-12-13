import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useTheme } from "@material-ui/core/styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import BackupIcon from "@material-ui/icons/Backup";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CreateIcon from "@material-ui/icons/Create";
import ScheduleIcon from "@material-ui/icons/Schedule";
import React from "react";
import { useStyles } from './DrawerMenu.styles';


export default function DrawerMenu(props) {
  
  const theme = useTheme();
  const classes = useStyles();
 
  const open = props.state.menu.drawerMenuOpen;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={props.handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <List
            subheader={<ListSubheader>Scheduling</ListSubheader>}
            className={classes.root}
          >
            <ListItem button>
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText primary={"Status"} />
            </ListItem>
          </List>
          <Divider />
          <List
            subheader={<ListSubheader>Groups</ListSubheader>}
            className={classes.root}
          >
            <ListItem button>
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary={"Manage"} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <BackupIcon />
              </ListItemIcon>
              <ListItemText primary={"Import"} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary={"Create"} />
            </ListItem>
          </List>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
