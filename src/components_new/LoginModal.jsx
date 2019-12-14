import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import UserIcon from "@material-ui/icons/AccountBox";
import React from "react";
import { useStyles } from "./LoginModal.style";
import Context from "../layouts/context";
import { login } from '../api/BusinessObjectsAPI'

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const { state, setState } = React.useContext(Context);

  const handleClickOpen = () => {
    setOpen(true);
    console.log("hello", state);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = event => {
    login(state.name, state.password, state.server)
  };

  const handleChange = event => {
    console.log([event.target.id]);
    setState({
      ...state,
      [event.target.id]: event.target.value
    })
  };

  const classes = useStyles();

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        <div variant="subtitle1" className={classes.buttontext}>
          Login
        </div>{" "}
        <UserIcon />
      </Button>
      <Dialog
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          style={{ backgroundColor: "#3f51b5", color: "white" }}
          id="form-dialog-title"
        >
          Authenticate
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            onChange={handleChange}
            margin="dense"
            id="name"
            label="Username"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            onChange={handleChange}
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
          />
          <TextField
            autoFocus
            onChange={handleChange}
            margin="dense"
            id="server"
            label="Server"
            type="text"
            value={state.server}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
