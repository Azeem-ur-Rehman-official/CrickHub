import React from 'react';
import { Line } from 'react-chartjs-2';

// const data = {
//   labels: ['January', 'February', 'March',
//            'April', 'May'],
//   datasets: [
//     {
//       label: 'Rainfall',
//       fill: false,
//       lineTension: 0.5,
//       backgroundColor: 'rgba(255,0,0,0.3)',
//       borderColor: 'rgba(0,0,255,1)',
//       borderWidth: 2,
//       data: [65, 59, 80, 81, 56]
//     }
//   ]
// }

// {
//   title: {
//     display: true,
//     text: props.title,
//     fontSize: 20
//   },
//   legend: {
//     display: true,
//     position: 'right'
//   }
// }


const Chart = (props) => {
  return (
    <>
      <Line
        data={props.data}
        options={props.options}
      />
    </>
  );
}


// import { Line } from 'react-chartjs-2';

// const Chart = (props) => {
//   return <Line options={props.options} data={props.data} />;
// }

export default Chart;
