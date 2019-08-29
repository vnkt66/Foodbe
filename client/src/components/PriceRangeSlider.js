import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import './PriceRangeSlider.css';

// const useStyles = makeStyles({
//   root: {
//     width: '100%',
//     height: 8
//   }
// });

const useStyles = makeStyles({
  root: {
    color: 'darkolivegreen',
    height: 8,
    width: '100%',
    // margin: '0 2% 0 1%'
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: '10px',
    width: '100%',
    display: 'block',
    opacity: 0.38,
    position: 'absolute',
    borderRadius: 4,
  },
});


export default function PriceRangeSlider(props) {
  const classes = useStyles();

  console.log(props.value);
  // const [value, setValue] = React.useState([20, 37]);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  const valuetext = (value) => {
    console.log(value);
    return `${value}`;
  }

  return (
    <div className={classes.root}>
      {/* <Typography id="range-slider" gutterBottom>
        Temperature range
      </Typography> */}
      <Slider
        value={props.value}
        onChange={props.handlecchange}
        // onInput={props.handlechange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        min={props.min}
        max={props.max}
      />
    </div>
  );
}
