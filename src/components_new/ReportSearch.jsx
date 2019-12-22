/* eslint-disable no-use-before-define */
import React, { useState, useContext } from "react";
import Context from "../util/Context"
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import { getData } from '../api/BusinessObjectsAPI'

const useStyles = makeStyles(theme => ({
  // textfield: {
  //   height: 10,
  // },

  searchtext: {
    marginTop: 3,
    fontSize: "0.9em"
  },
  searchicon: {},
  autocomplete: {
    //height: 55,
    //margin: theme.spacing(3)
  },
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18
    }
  }
}));

export default function ReportSearch() {
  const classes = useStyles();
  const { state, setState } = useContext(Context);
  const { logonToken, reportId } = state
  const [options, setOptions] = useState([]);

  const handleOnChange = (event, value) => {
    let newOptions = [];
    const payload = JSON.stringify({"query": "select si_id, si_name, si_parentid from ci_infoobjects where si_kind='Webi' and si_instance=0 and si_name like '%" + event.target.value + "%'"});
    getData(logonToken,"/v1/cmsquery?pagesize=1000", false, 'POST', payload).then((response) => {
      console.log("Search for reports: ", response.entries)
      newOptions = response.entries
      setOptions(newOptions)
    })
  }

  const handleOnClick = () => {
    let newOptions = [];
    const payload = JSON.stringify({"query": "select si_id, si_name, si_parentid from ci_infoobjects where si_kind='Webi' and si_instance=0"});
    getData(logonToken,"/v1/cmsquery?pagesize=1000", false, 'POST', payload).then((response) => {
      console.log("top 10 reports: ", response.entries)
      newOptions = response.entries
      setOptions(newOptions)
    })
  }

  const handleSearchSubmit = (event, value) => {
    console.log("autocomplete submit", value);
    console.log("keycode", event.keycode);
    if(value) {
      setState(prevState => {
        return {
          ...prevState,
          reportId: value.SI_ID,
          reportIdChanged: !prevState.reportIdChanged
        };
      });
      //enqueueSnackbar("Searching for Report");
    }
  };

  return (
    <div className={classes.divRim}>
      <Autocomplete
        onChange={handleSearchSubmit}
        loadingText="loading..."
        style={{ width: 500 }}
        size="medium"
        options={options}
        autoHighlight
        getOptionLabel={option => option.SI_NAME}
        renderOption={option => (
          <div>
            <h3>{option.SI_NAME}</h3>
            <p>{option.SI_NAME}</p>
          </div>
        )}
        renderInput={params => (
          <TextField
            {...params}
            onClick={handleOnClick}
            onChange={handleOnChange}
            label={
              <Grid
                container
                alignItems="flex-start"
                justify="center"
                spacing={1}
              >
                <Grid item>
                  <SearchIcon className={classes.searchicon} />
                </Grid>
                <Grid item>
                  <div className={classes.searchtext}>Report Search...</div>
                </Grid>
              </Grid>
            }
            variant="outlined"
            className={classes.autocomplete}
            fullWidth
          />
        )}
      />
    </div>
  );
}
