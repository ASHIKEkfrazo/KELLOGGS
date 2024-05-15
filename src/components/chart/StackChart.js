import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import axios from 'axios';

function StackChart({ data }) {
  const { Title } = Typography;
  const [defectColors, setDefectColors] = useState({});
console.log(data)
  useEffect(() => {
    // Fetch defect colors from the API
    axios.get('http://143.110.184.45:8100/defect/')
      .then(response => {
        // Organize the response data as an object with defect names as keys and color codes as values
        const colors = {};
        response.data.forEach(defect => {
          colors[defect.name] = defect.color_code;
        });
        // Set the defect colors state
        setDefectColors(colors);
      })
      .catch(error => {
        console.error('Error fetching defect colors:', error);
      });
  }, []);

  if (!data || Object.keys(data).length === 0) {
    return <div>Loading...</div>; // or some other fallback UI
  }

  // Sort the data by date
  const sortedData = data.sort((a, b) => new Date(a.date_time) - new Date(b.date_time));
  

  // Prepare series data
  const seriesData = sortedData.map(item => (
    {
    x: item.date_time.split('T')[0],
    y: item.no_of_persons,
    fillColor: item.color_code
  }));

  console.log(seriesData)
  // Prepare data for the chart
  const chartData = {
    series: [{
      name: "Number of Persons",
      data: seriesData
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },

      fill: {
        type: 'solid',
        opacity: 1
      },
      colors: sortedData.map(item => item.color_code)
    }
  };
  

  return (
    <div>
      <div>
        <Title level={5}>Bar Graph for Human Counts </Title>
      </div>
      <ReactApexChart 
        options={chartData.options} 
        series={chartData.series} 
        type="bar" 
        height={350} 
      />
    </div>
  );
}

export default StackChart;
