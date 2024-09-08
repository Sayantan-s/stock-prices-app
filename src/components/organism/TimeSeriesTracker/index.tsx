import { useGetStockTimeSeries } from '@api/timeseries';
import { DEFAULT_PERIOD, DEFAULT_SYMBOL } from './type';

export const TimeSeriesTracker = () => {
  const { data } = useGetStockTimeSeries({
    period: DEFAULT_PERIOD,
    symbol: DEFAULT_SYMBOL,
  });

  console.log(data);

  return <div>{JSON.stringify(data)}</div>;
};
