import React from "react";
import MainLayout from "./MainLayout";
import ScheduleTable from "../components/ScheduleTable";
import { green, orange } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      root: {
        fontSize: ".8em"
      }
    },
    MuiDialogTitle: {
      root: {
        backgroundColor: "#3f51b5",
        "& h6": {
          fontSize:'0.75em',
          color: "white"
        }
      }
    },
    MuiSvgIcon: {
      root: {
        fontSize: '1.5em'
      }
    },
    MuiTablePagination: {
      root: {
        fontSize: '0.7em'
      }
    }
  },

  typography: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontSize: "1em",
    display4: {
      fontSize: "1em"
    },
    display3: {
      fontSize: "1em"
    },
    display2: {
      fontSize: "1em"
    },
    display1: {
      fontSize: "1em"
    },
    headline: {
      fontSize: "1em"
    },
    title: {
      fontSize: "1em"
    },
    subheading: {
      fontSize: "1em"
    },
    body2: {
      fontSize: "1em"
    },
    body1: {
      fontSize: "1em"
    },
    caption: {
      fontSize: "1em"
    },
    button: {
      fontSize: "1em"
    },
    subtitle1: {
      fontSize: "1em"
    },
    button: {
      fontSize: '.9em'
    }
  },
});

const ManageLayout = props => {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        Manage
      </MainLayout>
    </ThemeProvider>
  );
};

export default ManageLayout;
