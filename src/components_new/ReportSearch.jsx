/* eslint-disable no-use-before-define */
import React, { useState, useContext, useEffect } from "react";
import Context from "../util/Context"
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import { getData, getParentFolders } from '../api/BusinessObjectsAPI'
import DescriptionIcon from '@material-ui/icons/DescriptionOutlined';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';


const useStyles = makeStyles(theme => ({
  // textfield: {
  //   height: 10,
  // },
  inputRoot: {
    paddingLeft: '13px',
},
  searchlabel: {
    marginLeft: theme.spacing(1)
  },
  foldername: {
    color: 'grey',
    marginLeft: theme.spacing(3)
  },
  descriptionIcon: {
    fontSize: "0.9em",
    marginRight: theme.spacing(1),
    color: '#3f51b5'
  },
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
  const [reportSearch, setReportSearch] = useState('');
  const [options, setOptions] = useState([]);

  const handleOnChange = (event, value) => {
    setReportSearch(event.target.value)
    let newOptions = [];
    const payload = JSON.stringify({"query": "select si_id, si_name, si_parentid from ci_infoobjects where si_kind='Webi' and si_instance=0 and si_name like '%" + event.target.value + "%'"});
    console.log("payload: ", payload);
    getData(logonToken,"/v1/cmsquery?pagesize=1000", false, 'POST', payload).then((response) => {
      response.entries.map((entry) => {
        newOptions = [...newOptions, {...entry, parentfolder: ''}]
      })
      setOptions(newOptions)
    })
  }


  useEffect(() => {
    let newOptions = [];
    options.forEach( option => {
      (async () => {
        const folder = await getParentFolders(logonToken,`/infostore/${option.SI_PARENTID}`);
        newOptions = [...newOptions, {...option, parentfolder: folder}]
      })().then(() => {setOptions(newOptions)})
       
    })
  }, [reportSearch])

  const handleOnClick = () => {
    let newOptions = [];
    const payload = JSON.stringify({"query": "select si_id, si_name, si_parentid from ci_infoobjects where si_kind='Webi' and si_instance=0"});
    getData(logonToken,"/v1/cmsquery?pagesize=1000", false, 'POST', payload).then((response) => {

      newOptions = response.entries
      setOptions(newOptions)
    })
  }

  const handleSearchSubmit = (event, value) => {
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
        className={classes.MuiAutocomplete}
        onChange={handleSearchSubmit}
        loadingText="loading..."
        style={{ width: 500 }}
        size="medium"
        options={options}
        autoHighlight
        getOptionLabel={option => option.SI_NAME}
        renderOption={option => (
          <div>
            <DescriptionIcon className={classes.descriptionIcon}/>{option.SI_NAME}
            <div className={classes.foldername}>
            <FolderOutlinedIcon className={classes.descriptionIcon}/> {option.parentfolder}
            </div>
          </div>
        )}
        renderInput={params => (
          <TextField
            {...params}
            onClick={handleOnClick}
            onChange={handleOnChange}
            label={
              <Grid
                className={classes.searchlabel}
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
