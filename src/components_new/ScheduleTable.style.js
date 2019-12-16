import { makeStyles, withStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";

const globalColors = {
  background: "white",
  columnsheader: "white",
  textcolor: "black !important",
  linecoloreven: "white",
  linecolorodd: "#fafafa"
  //hover: "#e8eaf6 !important"
};

export const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    //backgroundColor: "#e8eaf6",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: "auto"
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },
  row: {
    fontSize: "0.9em",
    "&:hover": {
      //backgroundColor: 'grey'
    }
  },
  paginitation: {
    fontsize: "0.1em"
    //backgroundColor: globalColors.background
  }
}));

export const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: globalColors.linecolorodd
    },
    "&:nth-of-type(even)": {
      backgroundColor: globalColors.linecoloreven
    }
  }
}))(TableRow);
