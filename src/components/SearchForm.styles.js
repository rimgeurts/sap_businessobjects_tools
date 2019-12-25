import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({

    input: {
      height: 40,
      margin: theme.spacing(2)
    },
    labelRoot: {
      margin: theme.spacing(2),
      fontSize: "1.15em",
      "&$labelFocused": {
        color: "inherit"
      }
    },
    labelFocused: {
      color: "inherit"
    }
  }));
  

export default useStyles;