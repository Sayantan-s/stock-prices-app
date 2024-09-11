import { useStockerMarketTracker } from '@components/organism/StockMarketTracker';
import { ApexOptions } from 'apexcharts';
import * as ApexChart from 'react-apexcharts';
import { LoadingAreaChart } from './loading';

const PRIMARY_COLOR = '#4a40ee';
const SECONDARY_COLOR = '#e9eaed';

export const Chart = () => {
  const {
    state: timeseries,
    IS_SUCCESS,
    IS_LOADING,
  } = useStockerMarketTracker();

  // console.log(timeseries, 'DATA');

  const CHART_OPTIONS: ApexOptions = {
    chart: {
      type: 'area',
      stacked: false,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      colors: PRIMARY_COLOR,
      strokeColors: ['#fff'],
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
        stops: [10, 90, 100],
      },
    },
    xaxis: {
      categories: timeseries.dates,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: false, offsetX: 0, offsetY: 0 },
      tooltip: {
        enabled: false,
      },
      tickPlacement: 'on', // Ensures the ticks are placed directly on the grid
    },
    yaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: false, offsetX: 0, offsetY: 0 },
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
      padding: {
        left: -14,
        right: -4,
        top: 0,
        bottom: 0,
      },
    },
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        return `<div class="bg-secondary-950 text-white px-2 py-1 rounded-md border-none outline-none">${series[seriesIndex][dataPointIndex]}</div>`;
      },
      fixed: {
        enabled: false,
        position: 'topRight',
      },
    },
    annotations: {
      yaxis: [
        {
          y: timeseries.previous_close,
          label: {
            style: {
              color: '#fff',
              background: PRIMARY_COLOR,
              padding: { top: 4, left: 4, right: 8, bottom: 8 },
              fontFamily: 'inherit',
              fontSize: '0.8rem',
            },

            text: timeseries.previous_close + '',
            borderColor: 'none',
            borderRadius: 4,
            offsetX: 3,
            orientation: 'vertical',
          },
        },
      ],
    },
  };

  const CHART_SERIES = [
    {
      name: 'Price',
      type: 'area',
      data: IS_SUCCESS
        ? timeseries.dates.map((date) => timeseries.time_series[date].price)
        : [],
    },
    {
      name: 'Change',
      type: 'column',
      data: IS_SUCCESS
        ? timeseries.dates.map((date) =>
            Math.floor(timeseries.time_series[date].change),
          )
        : [],
    },
  ];

  return (
    <div className="w-full">
      {IS_LOADING || !IS_SUCCESS ? (
        <LoadingAreaChart />
      ) : (
        <ApexChart.default
          options={CHART_OPTIONS}
          series={CHART_SERIES}
          type="area"
          width="100%"
          height={'auto'}
        />
      )}
    </div>
  );
};
