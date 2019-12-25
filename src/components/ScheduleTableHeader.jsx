import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import React from "react";
import { useStyles } from "./ScheduleTableHeader.style";

export const headCells = [
  {
    id: "instancename",
    numeric: false,
    align: "left",
    disablePadding: true,
    label: "Instance Name"
  },
  {
    id: "schedulestatus",
    numeric: true,
    align: "left",
    disablePadding: false,
    label: "Status"
  },
  {
    id: "created",
    numeric: true,
    align: "left",
    disablePadding: false,
    label: "Date"
  },
  {
    id: "duration",
    numeric: true,
    align: "left",
    disablePadding: false,
    label: "Duration"
  },
  {
    id: "owner",
    numeric: true,
    align: "left",
    disablePadding: false,
    label: "Owner"
  },
  {
    id: "starttime",
    numeric: true,
    align: "center",
    disablePadding: false,
    label: "Start"
  },
  {
    id: "endtime",
    numeric: true,
    align: "center",
    disablePadding: false,
    label: "End"
  },
  {
    id: "type",
    numeric: true,
    align: "center",
    disablePadding: false,
    label: "Format"
  }
];

function ScheduleTableHeader(props) {
  const classesTable = useStyles();

  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;

  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={classesTable.colorScheme}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            className={classesTable.colorScheme}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount && rowCount > 0}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            className={classesTable.row}
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              <div className={classesTable.colorScheme}>{headCell.label}</div>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

ScheduleTableHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default ScheduleTableHeader;
