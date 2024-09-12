import { useGetStockTimeSeries } from '@api/timeseries';
import { IProps, ITimeTrackerContextValues, periods } from './type';
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Quote } from './Quote';
import { Info } from './Info';
import { ITimeSeriesState } from '@api/timeseries/type';

const TimeSeriesTrackerContext =
  createContext<ITimeTrackerContextValues | null>(null);

const Root: FC<PropsWithChildren<IProps>> = ({
  children,
  period,
  symbol,
  onChangePeriod,
  onChangeSymbol,
}) => {
  const query = useGetStockTimeSeries({
    period,
    symbol,
  });
  const [timeseriesData, setTimeSeriesData] = useState<ITimeSeriesState>(
    {} as ITimeSeriesState,
  );

  const { isSuccess, data, isFetching } = query;

  useEffect(() => {
    if (isSuccess && data)
      setTimeSeriesData({ ...data, dates: Object.keys(data.time_series) });
  }, [data, isSuccess]);

  return (
    <TimeSeriesTrackerContext.Provider
      value={{
        query,
        state: timeseriesData,
        setState: setTimeSeriesData,
        period,
        symbol,
        onChangePeriod,
        onChangeSymbol,
        IS_SUCCESS: JSON.stringify(timeseriesData) !== '{}',
        IS_LOADING: JSON.stringify(timeseriesData) === '{}' && isFetching,
      }}
    >
      <div className="bg-white h-screen lg:overflow-hidden text-sm shadow-lg lg:shadow-neutral-100/50 lg:border lg:border-neutral-100 lg:rounded-xl w-full lg:max-w-[50rem] lg:h-[50rem]">
        {children}
      </div>
    </TimeSeriesTrackerContext.Provider>
  );
};

export const useStockerMarketTracker = () => {
  const context = useContext(TimeSeriesTrackerContext);
  if (!context) throw new Error('Context no found!');
  return context;
};

Info;

export const StockMarketTracker = Object.assign(Root, {
  Quote,
  Info,
});
