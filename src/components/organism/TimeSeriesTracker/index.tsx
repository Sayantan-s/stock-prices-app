import { useGetStockTimeSeries } from '@api/timeseries';
import {
  DEFAULT_PERIOD,
  DEFAULT_SYMBOL,
  IProps,
  ITimeTrackerContextValues,
} from './type';
import { FC, PropsWithChildren, createContext, useContext } from 'react';
import { StockInformation } from './StockInformation';
import { TimeSeriesGraph } from './TimeSeriesGraph';

const TimeSeriesTrackerContext =
  createContext<ITimeTrackerContextValues | null>(null);

const Root: FC<PropsWithChildren<IProps>> = ({
  children,
  period,
  symbol,
  onChangePeriod,
  onChangeSymbol,
}) => {
  const [query, timeseriesData, setTimeSeriesData] = useGetStockTimeSeries({
    period,
    symbol,
  });

  const { isLoading } = query;

  console.log(timeseriesData);

  return (
    <TimeSeriesTrackerContext.Provider
      value={[query, timeseriesData, setTimeSeriesData]}
    >
      {children}
    </TimeSeriesTrackerContext.Provider>
  );
};

export const useTimeTrackerContext = () => useContext(TimeSeriesTrackerContext);

export const TimeSeriesTracker = Object.assign(Root, {
  StockInformation,
  TimeSeriesGraph,
});
