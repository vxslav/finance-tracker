import styled from 'styled-components'
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);


export function PieChart(props) {
 
  const categories = [...new Set(props.data.map(item => item.category))]
  const amounts = categories.map(category => {
     return props.data.filter(item => item.category === category).reduce((acc, curr) => acc + Number(curr.amount), 0)
  })
 
  const data = {
    labels: categories,
    datasets: [
      {
        label: props.purpose,
        data: amounts,
        backgroundColor:  [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: "#FFF",
        borderWidth: 2,
      },
    ],
  };
  return  <ChartContainer><Pie data={data} /></ChartContainer>;
}
const ChartContainer = styled.div`
  height: 400px;
  width: 400px;

`