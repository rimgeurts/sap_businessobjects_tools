import React from "react";
import NavBar from "../components_new/NavBar";
import DrawerMenu from "../components_new/DrawerMenu";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ScheduleTable from "../components_new/ScheduleTable";
import ReportTable from "../components_new/ReportTable";
import SearchField from "../components_new/SearchField";

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
        <Paper className={classes.paper}>
          <SearchField />
        </Paper>
        <Paper className={classes.paper}>
          <ReportTable />
        </Paper>

        <ScheduleTable />
      </main>
    </div>
  );
};

export default Layout;
