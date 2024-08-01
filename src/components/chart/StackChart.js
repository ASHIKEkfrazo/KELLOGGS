import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import axios from 'axios';
 import { ColorRing } from 'react-loader-spinner'

function StackChart({ data }) {
  const { Title } = Typography;
  const [defectColors, setDefectColors] = useState({});

  // useEffect(() => {
  //   // Fetch defect colors from the API
  //   axios.get('http://143.110.184.45:8100/defect/')
  //     .then(response => {
  //       // Organize the response data as an object with defect names as keys and color codes as values
  //       const colors = {};
  //       response.data.forEach(defect => {
  //         colors[defect.name] = defect.color_code;
  //       });
  //       // Set the defect colors state
  //       setDefectColors(colors);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching defect colors:', error);
  //     });
  // }, []);

  if (!data || Object.keys(data).length === 0) {
    return <div style={{display:'flex',justifyContent:'center'}}> 
    <ColorRing
visible={true}
height="80"
width="80"
ariaLabel="color-ring-loading"
wrapperStyle={{}}
wrapperClass="color-ring-wrapper"
colors={['#ec522d','#ec522d','#ec522d','#ec522d','#ec522d','#ec522d']}
/>
</div>
  }

  // Sort the data by date
  const sortedData = data.sort((a, b) => new Date(a.date_time) - new Date(b.date_time));

  // Prepare series data
  const personsSeries = sortedData.map(item => ({
    x: item.date_time.split('T')[0],
    y: parseInt(item.no_of_persons),
    fillColor: item.color_code
  }));

  const nonComplianceSeries = sortedData.map(item => ({
    x: item.date_time.split('T')[0],
    y: parseInt(item.non_compliance_count),
    fillColor: item.non_compliance_color_code
  }));

  // Prepare data for the chart
  const chartData = {
    series: [
      {
        name: "Number of Persons",
        data: personsSeries.map(item => ({
          x: item.x,
          y: item.y 
        })),
      },
      {
        name: "Non-Compliance Count",
        data: nonComplianceSeries.map(item => ({
          x: item.x,
          y: item.y,
          fillColor: item.fillColor
        })),
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
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
          columnWidth: '45%',
          endingShape: 'rounded',
        },
      },
      xaxis: {
        type: 'category',
        categories: sortedData.map(item => item.date_time.split('T')[0])
      },
      fill: {
        type: 'solid',
        opacity: 1
      },
      colors: [sortedData[0].color_code, sortedData[0].non_compliance_color_code],
      legend: {
        position: 'top',
        horizontalAlign: 'center'
      }
    }
  };

  return (
    <div>
      <div>
        <Title level={5}>Total Count and Violation Count</Title>
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
