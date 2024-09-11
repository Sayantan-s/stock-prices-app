import {
  ITimeSeriesInput,
  ITimeSeriesOutput,
  ITimeSeriesOutputEquity,
} from '@api/timeseries/type';

export enum IStockAPIEndpints {
  timeSeries = '/stock-time-series',
  timeSeriesEquity = '/stock-time-series-source-2',
}

export interface IResponse<TData> {
  status: string;
  request_id: string;
  data: TData;
}

export interface IStockAPIEndpintsInputs {
  [IStockAPIEndpints.timeSeries]: ITimeSeriesInput;
}

export interface IStockAPIEndpintsOutputList {
  [IStockAPIEndpints.timeSeries]: ITimeSeriesOutput;
  [IStockAPIEndpints.timeSeriesEquity]: ITimeSeriesOutputEquity;
}

export type IStockAPIEndpintsOutputs = {
  [K in keyof IStockAPIEndpintsOutputList]: IResponse<
    IStockAPIEndpintsOutputList[K]
  >;
};
