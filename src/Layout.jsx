import React from "react";
import NavBar from "./NavBar";
import DrawerMenu from "./DrawerMenu";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Paper from "@material-ui/core/Paper";
import ScheduleTable from "./ScheduleTable";

const Layout = props => {
  const [state, setState] = React.useState({
    menu: {
      drawerMenuOpen: true
    },
    test: true
  });

  const handleDrawerOpen = () => {
    setState({
      ...state,
      menu: {
        drawerMenuOpen: true
      }
    });
  };

  const handleDrawerClose = () => {
    setState({
      ...state,
      menu: {
        drawerMenuOpen: false
      }
    });
  };

  const drawerWidth = 240;
  const open = state.menu.drawerMenuOpen;

  const useStyles = makeStyles(theme => ({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: 0
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: drawerWidth
    }
  }));

  const classes = useStyles();

  return (
    <div>
      <DrawerMenu handleDrawerClose={handleDrawerClose} state={state} />
      <NavBar handleDrawerOpen={handleDrawerOpen} state={state}></NavBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <ScheduleTable />
      </main>
    </div>
  );
};

export default Layout;
