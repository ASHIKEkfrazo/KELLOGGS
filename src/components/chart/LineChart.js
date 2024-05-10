import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";

function LineChart({ data }) {
  const { Title } = Typography;

  if (!data || data.length === 0) {
    return <div>Loading...</div>; // or some other fallback UI
  }
  
  // Sort the data by date_time
  const sortedData = data.sort((a, b) => new Date(a.date_time) - new Date(b.date_time));

  // Extract unique dates
  const uniqueDates = [...new Set(sortedData.map(item => item.date_time.split('T')[0]))];

  // Prepare series data
  const seriesData = uniqueDates.map(date => {
    const dataForDate = sortedData.filter(item => item.date_time.split('T')[0] === date.split('T')[0]);
    return {
      name: date.split('T')[0],
      data: dataForDate.map(item => ({
        x: new Date(item.date_time).getTime(), // Convert date string to JavaScript timestamp
        y: item.no_of_persons
      })),
      color: dataForDate.length > 0 ? dataForDate[0].color_code : "#FF5733" // Default color if no color code found
    };
  });

  // Prepare data for the line chart
  const chartData = {
    series: seriesData,
    options: {
      chart: {
        width: "100%",
        height: 350,
        type: "line",
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
    },
  };

  return (
    <div className="linechart">
      <div>
        <Title level={5}>Line Chart for Human Counts</Title>
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
