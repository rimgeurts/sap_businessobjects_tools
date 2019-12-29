import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { SnackbarProvider } from "notistack";
import React, {useContext} from "react";
import Context from '../util/Context'
import DrawerMenu from "../components/DrawerMenu";
import NavBar from "../components/NavBar";
import ReportSearch from "../components/ReportSearch";
import ReportTable from "../components/ReportTable";

const MainLayout = props => {
  const { state, setState } = useContext(Context);

  const handleDrawerOpen = () => {
    setState({ ...state, menu: { drawerMenuOpen: true } });
  };

  const handleDrawerClose = () => {
    setState({ ...state, menu: { drawerMenuOpen: false } });
  };

  React.useEffect(() => {
    if (state.logonToken) {
      setState({...state, isAuthenticated: true });
    }
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
    },
    papersearch: {
      marginBottom: 20,
      width: 500
    }
  }));

  const classes = useStyles();

  return (
    <SnackbarProvider>
        <DrawerMenu handleDrawerClose={handleDrawerClose} state={state} />
        <NavBar handleDrawerOpen={handleDrawerOpen} state={state}></NavBar>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <Paper className={classes.papersearch}>
            <ReportSearch />
          </Paper>
          <Paper className={classes.paper}>
            <ReportTable />
          </Paper>
          {props.children}
        </main>
    </SnackbarProvider>
  );
};

export default MainLayout;
