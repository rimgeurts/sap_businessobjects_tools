import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import useStyles from './SearchForm.styles';


const SearchField = ({handleSearchSubmit, handleSearchChange}) => {
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
          ),
        }}
      />
    </div>
  );
};

export default SearchField;
