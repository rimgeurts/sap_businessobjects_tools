import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import UserIcon from "@material-ui/icons/AccountBox";
import React from "react";
import { login } from "../api/BusinessObjectsAPI";
import Context from "../layouts/context";
import { useStyles } from "./LoginModal.style";

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("login");
  const { state, setState } = React.useContext(Context);
  const [userError, setUserError] = React.useState(false);
  const [serverError, setServerError] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = event => {
    login(state.name, state.password, state.server)
      .then(response => {
        if (response.error_code) {
          setState({
            ...state,
            error: response.message,
            password: ""
          });
          setUserError(true);
        } else {
          setState({
            ...state,
            logonToken: '"' + response.logonToken + '"',
            error: "",
            password: ""
          });
          setOpen(false);
          setMessage(state.name);
          setServerError(false);
          setUserError(false);
        }
      })
      .catch(response => {
        setState({
          ...state,
          error: "Cannot connect to the server.",
          error: response.message
        });
        setServerError(true);
      });
  };

  const handleChange = event => {
    console.log([event.target.id]);
    setState({
      ...state,
      [event.target.id]: event.target.value
    });
    if (event.target.id == "server") {
      setServerError(false);
    } else {
      setUserError(false);
    }
  };

  const classes = useStyles();

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        <div variant="subtitle1" className={classes.buttontext}>
          {message}
        </div>
        <UserIcon />
      </Button>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          style={{ backgroundColor: "#3f51b5", color: "white", fontSize:"10px" }}
          id="form-dialog-title"
        >
          Login
        </DialogTitle>
        <DialogContent>
        <Box m={1.5} />
          <TextField
            className={classes.textfield}
            error={userError}
            autoFocus
            variant="outlined"
            onChange={handleChange}
            margin="dense"
            id="name"
            label="Enter Username"
            type="text"
            value={state.name}
            fullWidth
            InputLabelProps={{
              classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused
              }
            }}
            InputProps={{
              className: classes.input,
            }}
          />
          <Box m={1.5} />
          <TextField
            error={userError}
            helperText={userError ? "Incorrect username or password" : ""}
            variant="outlined"
            onChange={handleChange}
            margin="dense"
            id="password"
            label="Enter Password"
            type="password"
            value={state.password}
            fullWidth
            InputLabelProps={{
              classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused
              }
            }}
            InputProps={{
              className: classes.input,
            }}
          />
          <Box m={1.5} />
          <TextField
            error={serverError}
            helperText={serverError ? "Cannot connect to server." : ""}
            variant="outlined"
            onChange={handleChange}
            margin="dense"
            id="server"
            label="Server"
            type="text"
            value={state.server}
            fullWidth
            InputLabelProps={{
              classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused
              }
            }}
            InputProps={{
              className: classes.input,
            }}
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
