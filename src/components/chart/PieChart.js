import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";

function PieChart({ data }) {
  const { Title } = Typography;
  const [chartData, setChartData] = useState({ labels: [], series: [] });
  const [colorCodes, setColorCodes] = useState({});

  useEffect(() => {
    if (!data || typeof data !== 'object') return;

    const groupedData = data.reduce((acc, entry) => {
      const { date_time, no_of_persons, color_code } = entry;
      const date = date_time.split('T')[0];
      if (!acc[date]) {
        acc[date] = { no_of_persons: 0 };
      }
      acc[date].no_of_persons += parseInt(no_of_persons);
      return acc;
    }, {});

    const labels = Object.keys(groupedData);
    const series = Object.values(groupedData).map(item => item.no_of_persons);

    setChartData({ labels: labels, series: series });

    const colors = {};
    data.forEach(entry => {
      const { date_time, color_code } = entry;
      const date = date_time.split('T')[0];
      if (!colors[date]) {
        colors[date] = color_code;
      }
    });
    setColorCodes(colors);
  }, [data]);

  return (
    <div>
      <div>
        <Title level={5}>Pie Chart for No. of Persons by Date</Title>
      </div>
      <ReactApexChart
        options={{
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: chartData.labels,
          colors: chartData.labels.map(label => colorCodes[label]),
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }}
        series={chartData.series}
        type="pie"
        height={350}
      />
    </div>
  );
}

export default PieChart;
