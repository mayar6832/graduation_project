import React from 'react';
import Paper from '@mui/material/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  chartContainer: {
    padding: '5px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
});

const PriceChart = ({ prices,current }) => {
  const classes = useStyles();

  const data = prices.reverse();
  const mappedArray = data.map((value, index) => ({ x: `Week ${index+1}`, y: Math.random() * (current - (current*0.1)) +(current*0.1)}));
  const newObject = { x: 'current week', y: current };

const updatedArray = [...mappedArray, newObject];


  return (
    <Paper className={classes.chartContainer}>
      <div className={classes.title}>Product Price During the Past 5 Weeks</div>
      <Chart data={updatedArray}>
        <ArgumentAxis />
        <ValueAxis />
        <LineSeries valueField="y" argumentField="x" />
      </Chart>
    </Paper>
  );
};

export default PriceChart;
