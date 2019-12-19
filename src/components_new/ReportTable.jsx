import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import Moment from "react-moment";
import { getData, getParentFolders } from "../api/BusinessObjectsAPI";
import Context from "../util/Context";
import { useStyles } from "./ReportTable.style";

const DenseTable = () => {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state, setState } = React.useContext(Context);
  const [report, setReport] = React.useState({
    reportName: "",
    parentId: "",
    folder: "",
    updatedDate: "",
    createdDate: "",
    owner: ""
  });
  const {
    reportName,
    parentId,
    folder,
    updatedDate,
    createdDate,
    owner
  } = report;

  useEffect(() => {
    if (state.reportId) {
      let url = `/v1/documents/${state.reportId}`;

      getData(state.logonToken, url).then(response => {
        const { created, cuid, name, ownerid, parentid, updated } = response;

        if (response.id) {
          enqueueSnackbar("Report found", { variant: "info" });

          (async () => {
            url = `/infostore/${parentid}`;
            const folderPath = await getParentFolders(
              state.logonToken,
              url,
              parentid
            );
            const owner = await getData(state.logonToken, "/users/12");
            console.log("owner ");
            setReport({
              ...state,
              reportName: name,
              parentId: parentid,
              folder: folderPath,
              updatedDate: updated,
              createdDate: created,
              owner: owner.entries[0].title
            });
          })();
        } else {
          enqueueSnackbar("Unable to find report", { variant: "warning" });
          setReport({
            ...state,
            report: {
              reportName: "",
              parentId: "",
              folder: "",
              updatedDate: "",
              createdDate: "",
              owner: ""
            }
          });
        }
      });
    }
  }, [state.reportId]);

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
          <TableRow>
            <TableCell className={classes.cell} component="th" scope="row">
              {reportName}
            </TableCell>
            <TableCell className={classes.cell} align="center">
              {folder}
            </TableCell>
            <TableCell className={classes.cell} align="center">
              {updatedDate ? (
                <Moment format="DD/MM/YYYY">{updatedDate}</Moment>
              ) : (
                undefined
              )}
            </TableCell>
            <TableCell className={classes.cell} align="center">
              {createdDate ? (
                <Moment format="DD/MM/YYYY">{createdDate}</Moment>
              ) : (
                undefined
              )}
            </TableCell>
            <TableCell className={classes.cell} align="center">
              {owner}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
export default DenseTable;
