import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { getData } from "../api/BusinessObjectsAPI";
import Context from "../util/Context";
import { useStyles } from "./ScheduleTableToolBar.style";
import Grid from "@material-ui/core/Grid";
import ReplayIcon from "@material-ui/icons/Replay";
import AddIcon from "@material-ui/icons/Add";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PlayCircleOutlineOutlinedIcon from "@material-ui/icons/PlayCircleOutlineOutlined";

const ScheduleTableToolBar = props => {
  const classes = useStyles();
  const { state, setState } = React.useContext(Context);
  const { logonToken, reportId } = state;
  const { numSelected, selected, setSelected, reload } = props;

  const handleDeleteInstance = () => {
    selected.forEach(instance => {
      getData(
        logonToken,
        `/v1/documents/${reportId}/instances/${instance}`,
        false,
        "DELETE"
      )
        .then(response => {
          console.log("DELETED: ", response);
        })
        .then(() => {
          setSelected([]);
          reload(["instances", "schedules"]);
        });
    });
  };

  const handleRefresh = () => {
    reload(["instances", "schedules"]);
  };

  const handleReschedule = () => {
    selected.forEach(instance => {
      getData(
        logonToken,
        `/raylight/v1/documents/${reportId}/schedules/${instance}`,
        false,
        "GET"
      )
        .then(response => {
          delete response.schedule.serverGroup;
          const scheduleInfo = JSON.stringify(response);

          return scheduleInfo;
        })
        .then(scheduleInfo => {
          console.log("schedule data", scheduleInfo);
          getData(
            logonToken,
            `/raylight/v1/documents/${reportId}/schedules/`,
            false,
            "POST",
            scheduleInfo
          ).then(response => {
            console.log("schedule response", response);
          });
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
        <Grid container justify="flex-end">
          <Grid item>
            <Tooltip title="Refresh">
              <IconButton aria-label="filter list" onClick={handleRefresh}>
                <ReplayIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Reschedule">
              <IconButton aria-label="delete" onClick={handleReschedule}>
                <PlayArrowIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Delete">
              <IconButton aria-label="delete" onClick={handleDeleteInstance}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      ) : (
        <Grid container justify="flex-end">
          <Grid item>
            <Tooltip title="Refresh">
              <IconButton aria-label="filter list" onClick={handleRefresh}>
                <ReplayIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Link
              to="/instances/new"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Tooltip title="New">
                <IconButton aria-label="filter list" onClick={handleRefresh}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Link>
          </Grid>
          <Grid item>
            <Tooltip title="Filter list">
              <IconButton aria-label="filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      )}
    </Toolbar>
  );
};

ScheduleTableToolBar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

export default ScheduleTableToolBar;
