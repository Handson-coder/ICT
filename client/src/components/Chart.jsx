import React from "react";
import { Bar } from "react-chartjs-2";

export const BarChart = ({ chartData }) => {
  return (
    <div>
      <Bar
        data={chartData}
        options={{
          plugins: {
            // title: {
            //   display: true,
            //   text: "Movie Lists",
            // },
            legend: {
              display: true,
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
};
