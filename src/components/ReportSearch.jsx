/* eslint-disable no-use-before-define */
import React, { useState, useContext, useEffect } from "react";
import Context from "../util/Context";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import { getData, getParentFolders } from "../api/BusinessObjectsAPI";
import DescriptionIcon from "@material-ui/icons/DescriptionOutlined";
import FolderOutlinedIcon from "@material-ui/icons/FolderOutlined";

const useStyles = makeStyles(theme => ({
  // textfield: {
  //   height: 10,
  // },
  inputRoot: {
    paddingLeft: "13px"
  },
  searchlabel: {
    marginLeft: theme.spacing(1)
  },
  foldername: {
    color: "grey",
    marginLeft: theme.spacing(3)
  },
  descriptionIcon: {
    fontSize: "0.9em",
    marginRight: theme.spacing(1),
    color: "#3f51b5"
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
  const { logonToken, reportId } = state;
  const [reportSearch, setReportSearch] = useState("");
  const [reportBaseOptions, setReportBaseOptions] = useState([]);
  const [options, setOptions] = useState([]);

  const handleOnChange = (event, value) => {
    console.log(event.target.value.length);
    let newreportBaseOptions = [];
    let payload = "";
    event.target.value.length > 0
      ? (payload = JSON.stringify({
          query:
            "select si_id, si_name, si_parentid from ci_infoobjects where si_kind='Webi' and si_instance=0 and si_name like '%" +
            event.target.value +
            "%'"
        }))
      : (payload = JSON.stringify({
          query:
            "select si_id, si_name, si_parentid from ci_infoobjects where si_kind='Webi' and si_instance=0"
        }));
    getData(logonToken, "/v1/cmsquery?pagesize=1000", false, "POST", payload)
      .then(response => {
        response.entries.map(entry => {
          newreportBaseOptions = [
            ...newreportBaseOptions,
            { ...entry, parentfolder: "" }
          ];
        });
        return newreportBaseOptions;
      })
      .then(newreportBaseOptions => {
        setReportBaseOptions(newreportBaseOptions);
        let folderArr = [];
        newreportBaseOptions.forEach(option => {
          (async () => {
            const folder = await getParentFolders(
              logonToken,
              `/infostore/${option.SI_PARENTID}`,
              false,
              ""
            );
            folderArr = [...folderArr, { ...option, parentfolder: folder }];
            return folderArr;
          })().then(() => {
            setReportBaseOptions(folderArr);
            console.log(folderArr);
          });
        });
        console.log("newArr: ", folderArr);
      });
    setReportSearch(event.target.value);
  };

  const handleSearchSubmit = (event, value) => {
    if (value) {
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

  // useEffect(() => {
  //   console.log("USE EFFECT!");
  //   console.log("Base option:", reportBaseOptions );

  //   let newoptions = [];
  //   reportBaseOptions.forEach(option => {
  //     console.log("effect option: ", option);
  //     (async () => {
  //       const folder = await getParentFolders(
  //         logonToken,
  //         `/infostore/${option.SI_PARENTID}`,
  //         false,
  //         ""
  //       );
  //       newoptions = [...newoptions, { ...option, parentfolder: folder }];
  //       return newoptions;
  //     })().then(() => {
  //       setOptions(newoptions);
  //       console.log(newoptions);
  //     });
  //   });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [reportSearch]);

  return (
    <div className={classes.divRim}>
      <Autocomplete
      noOptionsText="Type the name of a report"
        className={classes.MuiAutocomplete}
        onChange={handleSearchSubmit}
        loadingText="loading..."
        style={{ width: 500 }}
        size="medium"
        options={reportBaseOptions}
        autoHighlight
        getOptionLabel={option => option.SI_NAME}
        renderOption={option => (
          <div>
            <DescriptionIcon className={classes.descriptionIcon} />
            {option.SI_NAME}
            <div className={classes.foldername}>
              <FolderOutlinedIcon className={classes.descriptionIcon} />{" "}
              {option.parentfolder}
            </div>
          </div>
        )}
        renderInput={params => (
          <TextField
            {...params}
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
