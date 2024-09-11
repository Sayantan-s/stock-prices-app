import { useGetStockTimeSeriesEquity } from '@api/index';
import { StockMarketChartTabs } from '@components/organism/StockMarketTracker/Info/Tabs/StockmarketChart/StocketmarketChartTabs';
import { periods, symbols } from '@components/organism/StockMarketTracker/type';
import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import * as ApexChart from 'react-apexcharts';
import { useSearchParams } from 'react-router-dom';

const PRIMARY_COLOR = '#4a40ee';
const SECONDARY_COLOR = '#e9eaed';

const identifier = (char: string) =>
  `<p class="font-bold text-slate-50">${char}</p>`;

export const FullScreenChart = () => {
  const [location] = useSearchParams();
  const symbol = location.get('symbol') as (typeof symbols)[number];

  const MAX_PERIOD = periods[periods.length - 1];
  const [period, setPeriod] = useState(MAX_PERIOD);

  const { data, isLoading } = useGetStockTimeSeriesEquity({
    symbol,
    period: period,
  });

  const SERIES = [
    {
      data: data?.time_series.map((stock) => ({
        x: stock.datetime,
        y: [stock.open, stock.high, stock.low, stock.close],
      }))!,
    },
  ];

  const OPTIONS: ApexOptions = {
    chart: {
      type: 'candlestick',
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
      curve: 'smooth',
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
        const OPEN = dataPointIndex;
        const HIGH = dataPointIndex + 1;
        const LOW = dataPointIndex + 2;
        const CLOSE = dataPointIndex + 3;

        return `
        <div class="p-2 bg-slate-800 text-xs">
          <div class="text-gray-400 flex">${identifier('O')} <p class="ml-2">${series[seriesIndex][OPEN].toFixed(2)}</p></div>
          <div class="text-gray-400 flex">${identifier('H')} <p class="ml-2">${series[seriesIndex][HIGH].toFixed(2)}</p></div>
          <div class="text-gray-400 flex">${identifier('L')} <p class="ml-2">${series[seriesIndex][LOW].toFixed(2)}</p></div>
          <div class="text-gray-400 flex">${identifier('C')} <p class="ml-2">${series[seriesIndex][CLOSE].toFixed(2)}</p></div>
        </div>
        `;
      },
      fixed: {
        enabled: false,
        position: 'topRight',
        offsetX: 0,
        offsetY: 0,
      },
    },
  };

  const handleChangePeriod = (value: string) =>
    setPeriod(value as (typeof periods)[number]);

  if (!symbol) throw new Error('There is no such symbol!');

  return (
    <div>
      <StockMarketChartTabs value={period} onChange={handleChangePeriod} />
      {isLoading && JSON.stringify(data) === '{}' ? (
        'loading...'
      ) : data && !isLoading ? (
        <ApexChart.default
          options={OPTIONS}
          series={SERIES}
          type="candlestick"
          width="100%"
          height={'auto'}
        />
      ) : null}
    </div>
  );
};
