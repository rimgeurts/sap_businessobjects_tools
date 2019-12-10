import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    width: "100%",
    //backgroundColor: '#eceff1',
    overflowY: 'hidden'
  },
  paper: {
    width: "100%",
    overflow: "hidden"
  },
  table: {
    //backgroundColor: 'grey',
  },
  cell: {
    fontSize: ".85em",
    //color: 'white',
    //border: 'none',
    padding: 10,
    paddingLeft:20,
    backgroundColor: 'inherit'
  },
  margin: {
    marginTop: 0,
    marginBottom: 0
  }
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(
    "CPO Report",
    "CRAFT \\ CPO",
    "05/12/2019",
    "05/07/2018",
    "geurrem"
  )
];

export default function DenseTable() {
  const classes = useStyles();

  return (
    
      <div className={classes.root}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>Report Name</TableCell>
              <TableCell className={classes.cell} align="middle">
                Location
              </TableCell>
              <TableCell className={classes.cell} align="middle">
                Last Modified
              </TableCell>
              <TableCell className={classes.cell} align="middle">
                Created
              </TableCell>
              <TableCell className={classes.cell} align="middle">
                Owner
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell className={classes.cell} component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell className={classes.cell} align="middle">
                  {row.calories}
                </TableCell>
                <TableCell className={classes.cell} align="middle">
                  {row.fat}
                </TableCell>
                <TableCell className={classes.cell} align="middle">
                  {row.carbs}
                </TableCell>
                <TableCell className={classes.cell} align="middle">
                  {row.protein}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <div className={classes.margin}></div>
        </Table>
      </div>
  );
}
