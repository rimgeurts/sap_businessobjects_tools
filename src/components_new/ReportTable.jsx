import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { useStyles } from './ReportTable.style';
import Context from '../util/Context';



function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
/*
const rows = [
  createData(
    "CPO Report",
    "CRAFT \\ CPO",
    "05/12/2019",
    "05/07/2018",
    "geurrem"
  )
];
*/
const DenseTable = () => {
  const classes = useStyles();
  const { state, setState } = React.useContext(Context);
  const {  reportName, parentId, folder, updatedDate, createdDate, owner } = state

  const rows = [
    createData(
      reportName,
      folder,
      updatedDate,
      createdDate,
      owner
    )
  ];

  return (
    <div className={classes.root}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.cell}>Report Name</TableCell>
            <TableCell className={classes.cell} align="center">
              Location
            </TableCell>
            <TableCell className={classes.cell} align="center">
              Last Modified
            </TableCell>
            <TableCell className={classes.cell} align="center">
              Created
            </TableCell>
            <TableCell className={classes.cell} align="center">
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
              <TableCell className={classes.cell} align="center">
                {row.calories}
              </TableCell>
              <TableCell className={classes.cell} align="center">
                {row.fat}
              </TableCell>
              <TableCell className={classes.cell} align="center">
                {row.carbs}
              </TableCell>
              <TableCell className={classes.cell} align="center">
                {row.protein}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default DenseTable