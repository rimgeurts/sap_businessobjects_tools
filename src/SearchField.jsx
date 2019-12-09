import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(10)
  },
  input: {
    height: 35,
    margin: theme.spacing(1)
  },
  labelRoot: {
    fontSize: ".9em",
    "&$labelFocused": {
      color: "inherit"
    }
  },
  labelFocused: {
    color: "inherit"
  }
}));

const SearchField = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid container alignItems="center">
        <Grid item>
          <SearchIcon />
        </Grid>
        <Grid item>
          <TextField
            InputProps={{ className: classes.input }}
            InputLabelProps={{
              classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused
              }
            }}
            label="Enter Report ID"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchField;
