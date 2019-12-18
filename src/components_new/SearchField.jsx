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
    console.log("searching");
    if (event.keyCode === 13 || event.keyCode === 9) {
      
      enqueueSnackbar("Searching for Report");
      
      let url = `/v1/documents/${state.reportId}`;

      getData(state.logonToken, url).then(response => {
        const { created, cuid, name, ownerid, parentid, updated } = response;

        if (response.id) {
          enqueueSnackbar("Report found", { variant: "info" });
          
          

          (async () => {
            url = `/infostore/${parentid}`
            const folderPath = await getParentFolders(state.logonToken, url, parentid)

            setState({
              ...state,
              reportName: name,
              parentId: parentid,
              folder: folderPath,
              updatedDate: updated,
              createdDate: created,
              owner: ownerid
            });
          })();

        } else {
          enqueueSnackbar("Unable to find report", { variant: "warning" });
          setState({
            ...state,
            reportName: "",
            parentId: "",
            updatedDate: "",
            createdDate: "",
            owner: ""
          });
        }
      });
    }
  };

  const handleSearchChange = event => {
    setState({ ...state, reportId: event.target.value });
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
