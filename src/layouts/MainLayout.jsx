import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import DrawerMenu from "../components_new/DrawerMenu";
import NavBar from "../components_new/NavBar";
import ReportTable from "../components_new/ReportTable";
import SearchField from "../components_new/SearchField";
import { login, getData } from "../api/BusinessObjectsAPI";
import Context from "../util/Context";
import { SnackbarProvider } from "notistack";

const Layout = props => {
  const [state, setState] = React.useState({
    menu: {
      drawerMenuOpen: true
    },
    reportId: "",
    isReportIdValid: false,
    logonToken: "",
    name: "",
    password: "",
    auth: "secEnterprise",
    server: "localhost:6405",
    error: "",
    reportIdChanged: false
  });

  const handleDrawerOpen = () => {
    setState({ ...state, menu: { drawerMenuOpen: true } });
  };

  const handleDrawerClose = () => {
    setState({ ...state, menu: { drawerMenuOpen: false } });
  };

  React.useEffect(() => {
  }, [state.logonToken]);

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
    },
    paper: {
      marginBottom: 5
    }
  }));

  const classes = useStyles();

  return (
    <SnackbarProvider>
      <Context.Provider value={{ state, setState }}>
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
          {props.children}
        </main>
      </Context.Provider>
    </SnackbarProvider>
  );
};

export default Layout;
