import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import UserIcon from "@material-ui/icons/AccountBox";
import CloseIcon from "@material-ui/icons/Close";
import Lock from "@material-ui/icons/LockOpenOutlined";
import React from "react";
import { login } from "../api/BusinessObjectsAPI";
import Context from "../util/Context";
import { useStyles } from "./LoginModal.style";
import LoginModalDropdown from "./loginModalDropdown";
import { useSnackbar } from "notistack";

export default function LoginModal() {
  const [open, setOpen] = React.useState(true);
  const [message, setMessage] = React.useState("login");
  const { state, setState } = React.useContext(Context);
  const [userError, setUserError] = React.useState(false);
  const [serverError, setServerError] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = event => {
    enqueueSnackbar("Atempting to authenticate...");
    login(state.name, state.password, state.server, state.auth)
      .then(response => {
        console.log("Customer error message", response);
        if (response.error_code == "SERVER_ERROR") {
          setState({
            ...state,
            error: "Cannot connect to the server.",
            error: response.message
          });
          setServerError(true);
          enqueueSnackbar("Unable to connect to server", { variant: "error" });
          return;
        }
        if (response.error_code) {
          setState({
            ...state,
            error: response.message,
            password: "",
            logonToken: ""
          });
          setUserError(true);
          enqueueSnackbar("Login Failed!", { variant: "error" });
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
          enqueueSnackbar("Login Successful!", { variant: "success" });
        }
      })
      .catch(response => {
        console.log(response);
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
      <Button color="inherit" onClick={handleOpen}>
        <div variant="subtitle1" className={classes.buttontext}>
          {message}
        </div>
        <UserIcon />
      </Button>
      <Dialog maxWidth="xs" open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <Lock className={classes.lockButton} />
          <div className={classes.title} >Login</div>
          <IconButton
            disabled={state.logonToken ? false : true}
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
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
            label="Username"
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
              className: classes.input
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
            label="Password"
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
              className: classes.input
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
              className: classes.input
            }}
          />
          <Box m={2.5} />
          <LoginModalDropdown />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            disabled={state.logonToken ? false : true}
          >
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
