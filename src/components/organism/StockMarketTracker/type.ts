import { ITimeSeriesOutput, ITimeSeriesState } from '@api/timeseries/type';
import { UseQueryResult } from '@tanstack/react-query';

export const periods = [
  '1D',
  '5D',
  '1M',
  '6M',
  'YTD',
  '1Y',
  '5Y',
  'MAX',
] as const;
export const symbols = [
  'AAPL:NASDAQ',
  'MSFT:NASDAQ',
  'MSFT',
  'DJI',
  'VTSAX',
] as const;

export const DEFAULT_PERIOD = periods[4];
export const DEFAULT_SYMBOL = symbols[0];

export interface IProps {
  period: (typeof periods)[number];
  symbol: (typeof symbols)[number];
  onChangePeriod: (period: string) => void;
  onChangeSymbol: (symbol: string) => void;
}

export type ITimeTrackerContextValues = {
  query: UseQueryResult<ITimeSeriesOutput | undefined, Error>;
  state: ITimeSeriesState;
  setState: React.Dispatch<React.SetStateAction<ITimeSeriesState>>;
  period: string;
  symbol: string;
  setPeriod: React.Dispatch<React.SetStateAction<IProps['period']>>;
  setSymbol: React.Dispatch<React.SetStateAction<IProps['symbol']>>;
  onChangePeriod: (period: string) => void;
  onChangeSymbol: (symbol: string) => void;
};
