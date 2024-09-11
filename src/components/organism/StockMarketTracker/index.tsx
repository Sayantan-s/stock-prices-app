import { useGetStockTimeSeries } from '@api/timeseries';
import { IProps, ITimeTrackerContextValues } from './type';
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import { Quote } from './Quote';
import { Info } from './Info';

const TimeSeriesTrackerContext =
  createContext<ITimeTrackerContextValues | null>(null);

const Root: FC<PropsWithChildren<IProps>> = ({
  children,
  period,
  symbol,
  onChangePeriod,
  onChangeSymbol,
}) => {
  const [localPeriod, setLocalPeriod] = useState(period);
  const [localSymbol, setLocalSymbol] = useState(symbol);
  const [query, timeseriesData, setTimeSeriesData] = useGetStockTimeSeries({
    period: localPeriod,
    symbol: localSymbol,
  });

  const { isLoading, isFetched, isRefetching, isFetching, isSuccess } = query;

  const IS_STATE_POPULATED = JSON.stringify(timeseriesData) !== '{}';
  const IS_FETCHING_INITIALLY = !IS_STATE_POPULATED && isLoading;

  console.log(IS_STATE_POPULATED);

  return (
    <TimeSeriesTrackerContext.Provider
      value={{
        query,
        state: timeseriesData,
        setState: setTimeSeriesData,
        period: localPeriod,
        symbol: localSymbol,
        setPeriod: setLocalPeriod,
        setSymbol: setLocalSymbol,
        onChangePeriod,
        onChangeSymbol,
      }}
    >
      <div className="bg-white text-sm shadow border rounded-xl w-full max-w-[50rem] h-[38rem]">
        {IS_STATE_POPULATED ? children : null}
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
