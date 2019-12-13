import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
    root: {
      width: "100%",
      //backgroundColor: '#eceff1',
      overflowY: "hidden"
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
      paddingLeft: 20,
      backgroundColor: "inherit"
    },
    margin: {
      marginTop: 0,
      marginBottom: 0
    }
  });