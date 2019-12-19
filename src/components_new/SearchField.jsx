import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import useStyles from "./SearchForm.styles";
import Context from "../util/Context";
import { login, getData, getParentFolders } from "../api/BusinessObjectsAPI.js";
import { useSnackbar } from "notistack";

const SearchField = () => {
  const { state, setState } = React.useContext(Context);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleSearchSubmit = event => {
   
    if (event.keyCode === 13 || event.keyCode === 9) {

      setState({ ...state, reportId: event.target.value });
      enqueueSnackbar("Searching for Report");

    }
  };

  const handleSearchChange = event => {
    
  };

  const classes = useStyles();

  return (
    <div>
      <TextField
        onKeyDown={handleSearchSubmit}
        onChange={handleSearchChange}
        InputLabelProps={{
          classes: {
            root: classes.labelRoot,
            focused: classes.labelFocused
          }
        }}
        label="Enter Report ID"
        variant="outlined"
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    </div>
  );
};

export default SearchField;
