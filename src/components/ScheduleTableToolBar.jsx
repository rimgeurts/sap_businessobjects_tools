import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { getData } from "../api/BusinessObjectsAPI";
import Context from "../util/Context";
import { useStyles } from "./ScheduleTableToolBar.style";

const ScheduleTableToolBar = props => {
  const classes = useStyles();
  const { state, setState } = React.useContext(Context);
  const { logonToken, reportId } = state;
  const { numSelected, selected, setSelected, reload } = props;

  const handleDeleteInstance = () => {
    selected.map(instance => {
      getData(
        logonToken,
        `/v1/documents/${reportId}/instances/${instance}`,
        false,
        "DELETE"
      ).then(response => {
        console.log("DELETED: ", response);
        setSelected([]);
        reload();
      });
    });
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} id="tableTitle">
          Instances
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={handleDeleteInstance}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

ScheduleTableToolBar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

export default ScheduleTableToolBar;
