/* eslint-disable react-hooks/exhaustive-deps */
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React, { useState, useEffect, useContext } from "react";
import Context from "../util/Context";
import { StyledTableRow, useStyles } from "./ScheduleTable.style";
import ScheduleTableHeader, { headCells } from "./ScheduleTableHeader";
import ScheduleTableToolBar from "./ScheduleTableToolBar";
import { getData } from "../api/BusinessObjectsAPI";
import Moment from "react-moment";
import { useSnackbar } from "notistack";
import Button from "@material-ui/core/Button";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("fat");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { state, setState } = useContext(Context);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { logonToken, reportId, reportIdChanged, serve, refresh } = state;
  const [isInstanceDataLoadComplete, setIsInstanceDataLoadComplete] = useState(
    false
  );

  const [instance, setInstance] = useState([]);

  const getInstanceData = types => {
    let url;
    setInstance([]);
    if (reportId) {
      types.forEach(type => {
        let newArr = [];
        console.log(type);
        type === "instances"
          ? (url = `/v1/documents/${reportId}/instances`)
          : (url = `/v1/documents/${reportId}/schedules`);

        getData(logonToken, url)
          .then(response => {
            if (response.entries.length > 0) {
              response.entries.forEach((element, i) => {
                newArr = [
                  ...newArr,
                  {
                    owner: element.owner,
                    schedulestatus: element.schedulestatus,
                    opendoclink:
                      type === "schedules"
                        ? undefined
                        : element.opendoclink.replace("6400", "6405"),
                    cuid: element.cuid,
                    uistatus: element.uistatus,
                    created: element.created,
                    endtime: type === "schedules" ? undefined : element.endtime,
                    starttime:
                      type === "schedules"
                        ? element.nextruntime
                        : element.starttime,
                    type: element.type,
                    duration: element.duration,
                    path: element.path,
                    instancename:
                      type === "schedules"
                        ? element.schedulename
                        : element.instancename,
                    instanceid: element.id,
                    expiry: element.expiry
                  }
                ];
              });

              console.log(type, instance);
              //setInstance(newArr);
              setInstance(prevState => {
                return [...prevState, ...newArr];
              });
            }
          })
          .catch(() => {
            setInstance([]);
          });
      });
    } else {
      setInstance([]);
    }
    if (instance.length === 0) {
      enqueueSnackbar("No Instances Found");
    }
  };

  useEffect(() => {
    if (reportId) {
      getInstanceData(["instances", "schedules"]);
    }
  }, [reportIdChanged]);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = instance.map(n => n.instanceid);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    console.log("selected: ", name);
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, instance.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ScheduleTableToolBar
          reload={getInstanceData}
          selected={selected}
          setSelected={setSelected}
          numSelected={selected.length}
        />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <ScheduleTableHeader
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={instance.length}
            />

            <TableBody>
              {stableSort(instance, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.instanceid);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow
                      className={classes.row}
                      hover
                      //onClick={event => handleClick(event, row.instanceid)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.instanceid}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={event => handleClick(event, row.instanceid)}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>

                      <TableCell
                        className={classes.row}
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="left"
                      >
                        {row.instancename}
                      </TableCell>
                      <TableCell className={classes.row} align="left">
                        {row.uistatus}
                      </TableCell>
                      <TableCell className={classes.row} align="left">
                        {row.created ? (
                          <Moment format="DD/MM/YYYY">{row.created}</Moment>
                        ) : (
                          undefined
                        )}
                      </TableCell>
                      <TableCell className={classes.row} align="left">
                        {row.duration}
                      </TableCell>
                      <TableCell className={classes.row} align="left">
                        {row.owner}
                      </TableCell>
                      <TableCell className={classes.row} align="center">
                        {row.starttime ? (
                          <Moment format="HH:mm">{row.starttime}</Moment>
                        ) : (
                          undefined
                        )}
                      </TableCell>
                      <TableCell className={classes.row} align="center">
                        {row.endtime ? (
                          <Moment format="HH:mm">{row.endtime}</Moment>
                        ) : (
                          undefined
                        )}
                      </TableCell>
                      <TableCell className={classes.row} align="center">
                        <Button
                          className={classes.rowButton}
                          variant="outlined"
                          color="primary"
                          size="small"
                          target="_blank"
                          href={row.opendoclink}
                        >
                          {row.type}
                        </Button>
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          className={classes.paginitation}
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={instance.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
