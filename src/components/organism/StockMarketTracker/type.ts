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
export type PERIOD = (typeof periods)[number];
export const symbols = ['AAPL', 'MSFT:NASDAQ', 'MSFT', 'DJI', 'VTSAX'] as const;
export type SYMBOL = (typeof symbols)[number];

export const DEFAULT_PERIOD = periods[4];
export const DEFAULT_SYMBOL = symbols[0];

export interface IProps {
  period: PERIOD;
  symbol: SYMBOL;
  onChangePeriod: (period: string) => void;
  onChangeSymbol: (symbol: string) => void;
}

export type ITimeTrackerContextValues = {
  query: UseQueryResult<ITimeSeriesOutput | undefined, Error>;
  state: ITimeSeriesState;
  setState: React.Dispatch<React.SetStateAction<ITimeSeriesState>>;
  period: string;
  symbol: string;
  onChangePeriod: (period: string) => void;
  onChangeSymbol: (symbol: string) => void;
  IS_STATE_POPULATED: boolean;
};
