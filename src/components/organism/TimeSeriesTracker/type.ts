import { ITimeSeriesOutput, ITimeSeriesState } from '@api/timeseries/type';
import { UseQueryResult } from '@tanstack/react-query';

const periods = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'MAX'] as const;
const symbols = ['AAPL:NASDAQ', 'MSFT:NASDAQ', 'MSFT', 'DJI', 'VTSAX'] as const;

export const DEFAULT_PERIOD = periods[0];
export const DEFAULT_SYMBOL = symbols[0];

export interface IProps {
  period: (typeof periods)[number];
  symbol: (typeof symbols)[number];
  onChangePeriod: () => void;
  onChangeSymbol: () => void;
}

export type ITimeTrackerContextValues = [
  UseQueryResult<ITimeSeriesOutput | undefined, Error>,
  ITimeSeriesState | null,
  React.Dispatch<React.SetStateAction<ITimeSeriesState | null>>,
];
