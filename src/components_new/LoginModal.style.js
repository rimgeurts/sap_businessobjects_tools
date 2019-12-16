import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  buttontext: {
    paddingRight: "10px",
    fontSize: ".8em"
  },
  input: {
    //fontSize: ".9em"
  },
  labelRoot: {
    margin: theme.spacing(0),
    //fontSize: ".9em",
    "&$labelFocused": {
      color: "inherit"
    }
  },
  labelFocused: {
    color: "inherit"
    //fontSize: '0.9em'
  },
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "white"
  },
  lockButton: {
    position: "absolute",
    left: theme.spacing(1),
    top: theme.spacing(2.4),
    color: "white",
    fontSize: ".8em"
  },
  title: {
    paddingLeft: theme.spacing(1),
    color: 'white',
    fontSize: '.8em'
  }
}));
