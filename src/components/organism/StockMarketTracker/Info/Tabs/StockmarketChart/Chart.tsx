import { useStockerMarketTracker } from '@components/organism/StockMarketTracker';
import { ApexOptions } from 'apexcharts';
import * as ApexChart from 'react-apexcharts';

const PRIMARY_COLOR = '#4a40ee';
const SECONDARY_COLOR = '#e9eaed';

export const Chart = () => {
  const { state: timeseries } = useStockerMarketTracker();

  const CHART_OPTIONS: ApexOptions = {
    chart: {
      type: 'area',
      stacked: false,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    fill: {
      type: 'gradient',
      colors: [PRIMARY_COLOR],
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.59,
        opacityTo: 0,
        stops: [30, 90, 100],
      },
    },
    xaxis: {
      categories: timeseries.dates,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: false },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: false },
      tooltip: {
        enabled: false,
      },
    },
    stroke: {
      curve: 'straight',
      width: 2,
      colors: [PRIMARY_COLOR, SECONDARY_COLOR],
    },
    grid: {
      show: true,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        return `<div>${series[seriesIndex][dataPointIndex]}</div>`;
      },
      fixed: {
        enabled: false,
        position: 'topRight',
        offsetX: 0,
        offsetY: 0,
      },
    },
    // annotations: {
    //   points: [
    //     {
    //       x: 0, // X-axis value corresponding to the last data point
    //       y: 1, // Y-axis value for the last data point
    //       marker: {
    //         size: 0, // Hide the default marker
    //       },
    //       label: {
    //         offsetY: 0,
    //         style: {
    //           cssClass: '.latest-marker',
    //         },
    //         text: `mnop`, // Custom HTML div
    //       },
    //     },
    //   ],
    // },
  };

  const CHART_SERIES = [
    {
      name: 'Price',
      type: 'area',
      data: timeseries.dates.map((date) =>
        Math.floor(timeseries.time_series[date].price),
      ),
    },
    {
      name: 'Change',
      type: 'column',
      data: timeseries.dates.map((date) =>
        Math.floor(timeseries.time_series[date].change),
      ),
    },
  ];

  return (
    <div className="w-full">
      <ApexChart.default
        options={CHART_OPTIONS}
        series={CHART_SERIES}
        type="area"
        width="100%"
        height={'450px'}
      />
    </div>
  );
};
