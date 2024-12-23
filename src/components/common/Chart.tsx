import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { useChartData } from "../../common/services/useChart";
import { URLS } from "../../common/constants/urls";
import { SmallLoader } from "./Loader";

interface ISingleData {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

interface IResourceData {
  page: string;
  per_page: string;
  total: number;
  total_pages: number;
  data: ISingleData[];
}

// Registering chart components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const ChartComponent = () => {
  const { data: apiData, isFetching: isFetching } = useChartData(
    URLS.GET_RESOURCES,
  );
  const [data, setData] = useState<ISingleData[]>([]);

  useEffect(() => {
    if (apiData && apiData.data) {
      setData(apiData.data);
    } else {
      setData([]);
    }
  }, [apiData]);

  const barData = {
    labels: data?.map((item: ISingleData) => item.name), // Color names as labels
    datasets: [
      {
        label: "Year of Release",
        data: data.map((item: ISingleData) => item.year),
        backgroundColor: data.map((item: ISingleData) => item.color),
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          // Customize tooltips to show Pantone value
          label: function (tooltipItem: any) {
            const index = tooltipItem.dataIndex;
            const pantoneValue = data[index].pantone_value;
            return `${tooltipItem.label}: ${pantoneValue}`;
          },
        },
      },
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div style={{ width: "70%", margin: "auto", paddingTop: "50px" }}>
      {isFetching && <SmallLoader />}
      <div>
        <h3>Bar Chart: Year of Release</h3>
        <Bar data={barData} options={options} />
      </div>
    </div>
  );
};

export default ChartComponent;
