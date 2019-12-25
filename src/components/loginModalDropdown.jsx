import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Context from '../util/Context'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(0),
    
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
  selector: {
      fontSize: '0.8em'
  }
}));

export default function SimpleSelect() {
  const classes = useStyles();
  const {state, setState} = React.useContext(Context)
  const [authMethod, setAuthMethod] = React.useState('SecEnterprise');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleSelectChange = event => {
    setAuthMethod(event.target.value);
    setState({...state, auth: event.target.value})
  };

  return (
    <div>
      <FormControl fullWidth margin="dense" variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel}>
          Authentication
        </InputLabel>
        <Select
          value={authMethod}
          onChange={handleSelectChange}
          labelWidth={labelWidth}
        >
          <MenuItem className={classes.selector} value={"SecEnterprise"}>Enterprise</MenuItem>
          <MenuItem className={classes.selector} value={"SecWinAD"}>Windows AD</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
