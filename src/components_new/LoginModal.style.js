import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    buttontext: {
      paddingRight: "10px",
      fontSize: ".8em",
    },
    input: {
      fontSize: "1em"
    },
    labelRoot: {
      margin: theme.spacing(0),
      fontSize: "1.1em",
      "&$labelFocused": {
        color: "inherit"
      }
    },
    labelFocused: {
      color: "inherit"
    }
  }));
  

