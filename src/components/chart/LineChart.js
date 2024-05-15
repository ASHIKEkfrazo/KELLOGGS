import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import axios from 'axios';

function LineChart({ data }) {
  const { Title } = Typography;
  const [defectColors, setDefectColors] = useState({});

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

  if (!data || data.length === 0) {
    return <div>Loading...</div>; // or some other fallback UI
  }

  // Sort the data by date_time
  const sortedData = data.sort((a, b) => new Date(a.date_time) - new Date(b.date_time));

  // Prepare series data for no_of_persons
  const personsSeries = {
    name: "Number of Persons",
    data: sortedData.map(item => ({
      x: new Date(item.date_time).getTime(), // Convert date string to JavaScript timestamp
      y: parseInt(item.no_of_persons),
      fillColor: item.color_code
    })),
  };

  // Prepare series data for non_compliance_count
  const nonComplianceSeries = {
    name: "Non-Compliance Count",
    data: sortedData.map(item => ({
      x: new Date(item.date_time).getTime(), // Convert date string to JavaScript timestamp
      y: parseInt(item.non_compliance_count),
      fillColor: item.non_compliance_color_code
    })),
  };

  // Prepare data for the line chart
  const chartData = {
    series: [personsSeries, nonComplianceSeries],
    options: {
      chart: {
        width: "100%",
        height: 350,
        type: "line",
        stacked: false,
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: true,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      yaxis: {
        min: 0,
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: ["#8c8c8c"],
          },
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: ["#8c8c8c"],
          },
        },
      },
      tooltip: {
        x: {
          format: 'yyyy-MM-dd'
        },
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      colors: [sortedData[0].color_code, sortedData[0].non_compliance_color_code]
    },
  };

  return (
    <div className="linechart">
      <div>
        <Title level={5}>Total Count and Violation Count</Title>
      </div>
      <ReactApexChart
        className="full-width"
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
        width={"100%"}
      />
    </div>
  );
}

export default LineChart;
