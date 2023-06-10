import Paper from '@mui/material/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';

const PriceChart = ({prices}) => {
  console.log(prices);
  const data = prices.reverse();
  const mappedArray = data.map((value, index) => ({ x: index, y: value }));
 
console.log(data);
console.log(mappedArray);


  // const data = [
  //       { x: 1, y: 26000 },
  //       { x: 2, y: 22000 },
  //       { x: 3, y: 20000 },
  //       { x: 4, y: 21500 },
  //       { x: 5, y: 21000 },
  //     ];
  return (
    <Paper >
    <Chart
    className='chart'
      data={mappedArray}
    >
      <ArgumentAxis />
      <ValueAxis />
  
      <LineSeries valueField="y" argumentField="x" />
    </Chart>
  </Paper>
  )
}

export default PriceChart