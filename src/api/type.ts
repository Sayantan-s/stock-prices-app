import { ITimeSeriesInput, ITimeSeriesOutput } from '@api/timeseries/type';

export enum IStockAPIEndpints {
  timeSeries = '/stock-time-series',
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
}

export type IStockAPIEndpintsOutputs = {
  [K in keyof IStockAPIEndpintsOutputList]: IResponse<
    IStockAPIEndpintsOutputList[K]
  >;
};
