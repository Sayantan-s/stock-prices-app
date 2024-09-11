import { Dialog } from '@components/molecule/Dialog';
import { PERIOD, periods } from '@components/organism/StockMarketTracker/type';
import { useState } from 'react';
import { StockSelector } from './StockSelector';
import { useSingleStockTimeSeries } from '@api/timeseries';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { PlusCircledIcon } from '@radix-ui/react-icons';
const PRIMARY_COLOR = '#4a40ee';
const SECONDARY_COLOR = '#e9eaed';

export const StockCompare = () => {
  const [stocks, setStocks] = useState({ entity1: '', entity2: '' });
  const [period, setPeriod] = useState('YTD');

  const entity1Query = useSingleStockTimeSeries(
    { period, symbol: stocks.entity1 },
    { enabled: !!stocks.entity1 },
  );

  const entity2Query = useSingleStockTimeSeries(
    { period, symbol: stocks.entity2 },
    { enabled: !!stocks.entity2 },
  );

  const { data: entityOneData, isLoading: isEntityOneLoading } = entity1Query;
  const { data: entityTwoData, isLoading: isEntityTwoLoading } = entity2Query;

  const onSelectEntityOne = (v: string) => {
    const value = v as PERIOD;
    setStocks((prevState) => ({ ...prevState, entity1: value }));
  };

  const onSelectEntityTwo = (v: string) => {
    const value = v as PERIOD;
    setStocks((prevState) => ({ ...prevState, entity2: value }));
  };

  const dates = entityOneData?.time_series
    ? Object.keys(entityOneData.time_series)
    : [];

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
      categories: dates,
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
        return `<div class="bg-slate-800 text-white px-2 py-1 rounded-md border-none outline-none">${series[seriesIndex][dataPointIndex]}</div>`;
      },
      fixed: {
        enabled: false,
        position: 'topRight',
      },
    },
  };

  const CHART_SERIES = [
    {
      name: stocks.entity1,
      type: 'area',
      data: entityOneData
        ? dates.map((date) => entityOneData.time_series[date].price)
        : [],
    },
    {
      name: stocks.entity2,
      type: 'area',
      data: entityTwoData
        ? dates.map((date) => entityTwoData!.time_series[date].price)
        : [],
    },
  ];

  //   console.log(JSON.stringify(entityOneData), 'ENTITY ONE');
  // console.log(JSON.stringify(entityTwoData), 'ENTITY TWO');

  return (
    <Dialog>
      <Dialog.Trigger className="flex items-center space-x-1 text-neutral-700">
        <PlusCircledIcon />
        <span>Compare</span>
      </Dialog.Trigger>
      <Dialog.Content className="bg-white border-none">
        <Dialog.Header className="p-6">
          <Dialog.Title>Compare Stock Performance</Dialog.Title>
          <Dialog.Description>
            You are about to compare the selected stocks. This will display
            their recent performance, key metrics, and trends side by side. Make
            sure both stocks are correctly selected to get accurate insights.
          </Dialog.Description>
          <div className="flex">
            <StockSelector
              formerStockValue={stocks.entity1}
              onChange={onSelectEntityTwo}
            />
            <StockSelector
              formerStockValue={stocks.entity2}
              onChange={onSelectEntityOne}
            />
          </div>
          <div className="flex space-x-3">
            <div>
              <p>{entityOneData?.price}</p>
              <p>{entityOneData?.previous_close}</p>
              <p>
                {entityOneData?.change} ({entityOneData?.change_percent}%)
              </p>
              <p>{entityOneData?.pre_or_post_market}</p>
              <p>
                {entityOneData?.pre_or_post_market_change} (
                {entityOneData?.pre_or_post_market_change_percent}%)
              </p>
            </div>
            {/* <div>
              <p>{entityTwoData?.price}</p>
              <p>{entityTwoData?.previous_close}</p>
              <p>
                {entityTwoData?.change} ({entityTwoData?.change_percent}%)
              </p>
              <p>{entityTwoData?.pre_or_post_market}</p>
              <p>
                {entityTwoData?.pre_or_post_market_change} (
                {entityTwoData?.pre_or_post_market_change_percent}%)
              </p>
            </div> */}
          </div>
        </Dialog.Header>
        <Chart
          type="area"
          width={'100%'}
          height={'auto'}
          options={CHART_OPTIONS}
          series={CHART_SERIES}
        />
      </Dialog.Content>
    </Dialog>
  );
};
