import Paper from '@mui/material/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';

const PriceChart = () => {
    const data = [
        { x: 1, y: 26000 },
        { x: 2, y: 22000 },
        { x: 3, y: 20000 },
        { x: 4, y: 21500 },
        { x: 5, y: 21000 },
      ];
  return (
    <Paper >
    <Chart
    className='chart'
      data={data}
    >
      <ArgumentAxis />
      <ValueAxis />
  
      <LineSeries valueField="y" argumentField="x" />
    </Chart>
  </Paper>
  )
}

export default PriceChart