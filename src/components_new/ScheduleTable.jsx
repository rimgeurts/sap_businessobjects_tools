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
import ScheduleTableHeader from "./ScheduleTableHeader";
import ScheduleTableToolBar from "./ScheduleTableToolBar";
import { getData } from "../api/BusinessObjectsAPI";
import Moment from "react-moment";

function createData(rows) {
  const {
    owner,
    schedulestatus,
    opendoclink,
    cuid,
    uistatus,
    created,
    endtime,
    starttime,
    type,
    duration,
    path,
    instancename,
    expiry
  } = rows;
  return {
    owner,
    schedulestatus,
    opendoclink,
    cuid,
    uistatus,
    created,
    endtime,
    starttime,
    type,
    duration,
    path,
    instancename,
    expiry
  };
}

const rows = [
  createData({
    owner: "Administrator",
    schedulestatus: "Success",
    opendoclink:
      "http://DESKTOP-62SI676:6400/BOE/OpenDocument/opendoc/openDocument.jsp?sIDType=CUID&iDocID=AWeR11wPrzZMr_ezoJVs4Vg",
    cuid: "AWeR11wPrzZMr_ezoJVs4Vg",
    uistatus: "Success",
    created: "Dec 18, 2019 2:56 PM",
    endtime: "Dec 18, 2019 2:57 PM",
    starttime: "Dec 18, 2019 2:56 PM",
    type: "Excel",
    duration: "11 sec",
    path: "CPO/Schedule/",
    instancename: "CPO v1.1",
    expiry: "Dec 18, 2019 2:57 PM"
  })
  // createData("Instance B", "Success", "07/12/2019", 51, "Yes"),
  // createData("Instance C", "Failure", "08/12/2019", 24, "No")
];

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

  const { logonToken, reportId } = state;

  const [instance, setInstance] = useState([
    {
      instancename: "",
      schedulestatus: "",
      created: "",
      duration: "",
      owner: "",
      starttime: "",
      endtime: "",
      type: "",
      path: "",
      expiry: "",
      opendoclink: "",
      cuid: ""
    }
  ]);

  useEffect(() => {
    if (reportId) {
      const response = getData(
        logonToken,
        `/v1/documents/${reportId}/instances`
      ).then(response => {
        let newArr = instance;
        response.entries.forEach((element, i) => {
          newArr[i] = {
            owner: element.owner,
            schedulestatus: element.schedulestatus,
            opendoclink: element.opendoclink,
            cuid: element.cuid,
            uistatus: element.uistatus,
            created: element.created,
            endtime: element.endtime,
            starttime: element.starttime,
            type: element.type,
            duration: element.duration,
            path: element.path,
            instancename: element.instancename,
            expiry: element.expiry
          };
        });
        setInstance([...instance, newArr]);
        console.log(newArr);
      });
    }
  }, [reportId]);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
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
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ScheduleTableToolBar numSelected={selected.length} />
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
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow
                      className={classes.row}
                      hover
                      onClick={event => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        className={classes.row}
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.instancename}
                      </TableCell>
                      <TableCell className={classes.row} align="right">
                        {row.schedulestatus}
                      </TableCell>
                      <TableCell className={classes.row} align="right">
                        {row.created ? (
                          <Moment format="DD/MM/YYYY">{row.created}</Moment>
                        ) : (
                          undefined
                        )}
                      </TableCell>
                      <TableCell className={classes.row} align="right">
                        {row.duration}
                      </TableCell>
                      <TableCell className={classes.row} align="right">
                        {row.owner}
                      </TableCell>
                      <TableCell className={classes.row} align="right">
                        {row.starttime ? (
                          <Moment format="HH:mm">{row.starttime}</Moment>
                        ) : (
                          undefined
                        )}
                      </TableCell>
                      <TableCell className={classes.row} align="right">
                        {row.endtime ? (
                          <Moment format="HH:mm">{row.endtime}</Moment>
                        ) : (
                          undefined
                        )}
                      </TableCell>
                      <TableCell className={classes.row} align="right">
                        {row.type}
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
