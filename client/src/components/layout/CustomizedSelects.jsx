import React, { useState, useEffect, useContext } from 'react';
import HandWritingContext from '../../context/handwriting/HandWritingContext';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
}))(InputBase);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function CustomizedSelects() {
  const classes = useStyles();
  const handWritingContext = useContext(HandWritingContext);
  const {
    get_handwriting_id,
    get_handwritings,
    handwritings,
    get_render_png,
    get_render_pdf
  } = handWritingContext;
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    handwriting_id: '',
    text: '',
    handwriting_size: '20px',
    handwriting_color: '#000000'
  });

  useEffect(() => {
    setLoading(true);
    get_handwritings({});
  }, []);

  useEffect(() => {
    if (handwritings) {
      setLoading(false);
      console.log('handwritings: ', handwritings);
    }
  }, [handwritings]);

  // onChange
  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  console.log('handwritings: ', handwritings);

  return (
    <form className={classes.root} autoComplete='off'>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor='text-customized-input'>Text</InputLabel>
        <BootstrapInput
          id='text-customized-input'
          type='text'
          name='text'
          autoComplete='text'
          value={formData.text}
          onChange={onChange}
        />
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor='handwriting-customized-select'>
          handWriting
        </InputLabel>
        <Select
          value={formData.handwriting_id}
          onChange={onChange}
          input={
            <BootstrapInput
              name='handwriting'
              id='handwriting-customized-select'
            />
          }
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor='handwriting_size-customized-native-simple'>
          handwriting_size
        </InputLabel>
        <NativeSelect
          value={formData.handwriting_size}
          onChange={onChange}
          input={
            <BootstrapInput
              name='handwriting_size'
              id='handwriting_size-customized-native-simple'
            />
          }
        >
          <option value='' />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor='handwriting_color-customized-native-simple'>
          handwriting_color
        </InputLabel>
        <NativeSelect
          value={formData.handwriting_color}
          onChange={onChange}
          input={
            <BootstrapInput
              name='handwriting_color'
              id='handwriting_color-customized-native-simple'
            />
          }
        >
          <option value='' />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      </FormControl>
    </form>
  );
}
