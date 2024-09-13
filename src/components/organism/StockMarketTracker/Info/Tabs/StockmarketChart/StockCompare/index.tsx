import { Dialog } from '@components/molecule/Dialog';
import { PERIOD, periods } from '@components/organism/StockMarketTracker/type';
import { FC, Suspense, lazy } from 'react';
import { StockSelector } from './StockSelector';
import { useSingleStockTimeSeries } from '@api/timeseries';
import { ApexOptions } from 'apexcharts';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { StockCompareTable } from './StockCompareTable';
import { IProps } from './type';

const Chart = lazy(() => import('react-apexcharts'));

const PRIMARY_COLOR = '#4a40ee';
const SECONDARY_COLOR = '#43a448';
const YTD_PERIOD = periods[periods.length - 2];

export const StockCompare: FC<IProps> = ({ onChange, ...stocks }) => {
  const entity1Query = useSingleStockTimeSeries(
    { period: YTD_PERIOD, symbol: stocks.entity1 },
    { enabled: !!stocks.entity1, refetchOnMount: true },
  );

  const entity2Query = useSingleStockTimeSeries(
    { period: YTD_PERIOD, symbol: stocks.entity2 },
    { enabled: !!stocks.entity2, refetchOnMount: true },
  );

  const { data: entityOneData, isLoading: isEntityOneLoading } = entity1Query;
  const { data: entityTwoData, isLoading: isEntityTwoLoading } = entity2Query;

  const dates1 = entityOneData?.time_series
    ? Object.keys(entityOneData.time_series)
    : [];

  const dates2 = entityTwoData?.time_series
    ? Object.keys(entityTwoData.time_series)
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
      colors: [PRIMARY_COLOR, SECONDARY_COLOR],
      strokeColors: ['#fff'],
    },
    legend: {
      show: false,
    },
    fill: {
      type: 'gradient',
      colors: [PRIMARY_COLOR, SECONDARY_COLOR],
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.59,
        opacityTo: 0,
        stops: [10, 90, 100],
      },
    },
    xaxis: {
      categories: dates1,
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
        ? dates1.map((date) => entityOneData.time_series[date].price)
        : [],
    },
    {
      name: stocks.entity2,
      type: 'area',
      data: entityTwoData
        ? dates2.map((date) => entityTwoData.time_series[date].price)
        : [],
    },
  ];

  const onSelectEntityOne = (v: string) => {
    const value = v as PERIOD;
    onChange({ ...stocks, entity1: value });
  };

  const onSelectEntityTwo = (v: string) => {
    const value = v as PERIOD;
    onChange({ ...stocks, entity2: value });
  };

  return (
    <Dialog>
      <Dialog.Trigger className="flex items-center space-x-1 text-neutral-700">
        <PlusCircledIcon />
        <span>Compare</span>
      </Dialog.Trigger>
      <Dialog.Content className="bg-white border-none md:w-auto md:h-auto w-screen h-screen">
        <Dialog.Header>
          <Dialog.Title className="text-neutral-900 px-6 pt-6 space-x-2 items-center flex">
            <span> Compare Stock Performance </span>
            <div className="text-tertiary-500 w-10 text-center flex items-center justify-center bg-tertiary-100 text-xs font-normal border border-tertiary-200 px-2 py-0.5 rounded-full">
              {/* <span className="block w-1 h-1 rounded-full bg-tertiary-500 mr-[0.2rem]" /> */}
              1Y
            </div>
          </Dialog.Title>
          <Dialog.Description className="text-neutral-500 px-6 pt-2">
            You are about to compare the selected stocks. This will display
            their recent performance, key metrics, and trends side by side. Make
            sure both stocks are correctly selected to get accurate insights.
          </Dialog.Description>
          <div className="flex pt-4 space-x-2 text-sm px-6">
            <StockSelector
              value={stocks.entity1}
              formerStockValue={stocks.entity2}
              onChange={onSelectEntityOne}
            />
            <StockSelector
              value={stocks.entity2}
              formerStockValue={stocks.entity1}
              onChange={onSelectEntityTwo}
            />
          </div>
          <StockCompareTable>
            <StockCompareTable.Heading />
            <StockCompareTable.Row
              {...entityOneData}
              isLoading={isEntityOneLoading}
            />
            <StockCompareTable.Row
              {...entityTwoData}
              isLoading={isEntityTwoLoading}
            />
          </StockCompareTable>
        </Dialog.Header>
        <Suspense>
          <Chart
            type="area"
            width={'100%'}
            height={'auto'}
            options={CHART_OPTIONS}
            series={CHART_SERIES}
          />
        </Suspense>
      </Dialog.Content>
    </Dialog>
  );
};
