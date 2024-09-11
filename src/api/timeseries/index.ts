import {
  IStockAPIEndpints,
  IStockAPIEndpintsInputs,
  IStockAPIEndpintsOutputs,
} from '@api/type';
import { api } from '..';
import { isAxiosError } from 'axios';
import {
  QueryObserverOptions,
  QueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  ITimeSeriesOutput,
  ITimeSeriesOutputEquity,
  ITimeSeriesState,
} from './type';
import data from '../data/aapl.json';
import equity from '../data/applequity.json';

export const TIMESERIES_QUERY_KEY = 'TIMESERIES_QUERY_KEY';
export const TIMESERIES_QUERY_SINGLE_KEY = 'TIMESERIES_QUERY_SINGLE_KEY';
export const TIMESERIES_EQUITY_QUERY_KEY = 'TIMESERIES_EQUITY_QUERY_KEY';

export const getStockTimeSeries = async (
  params: IStockAPIEndpintsInputs[IStockAPIEndpints.timeSeries]['params'],
) => {
  try {
    // const res = await api.get<
    //   IStockAPIEndpintsOutputs[IStockAPIEndpints.timeSeries]
    // >(IStockAPIEndpints.timeSeries, { params: { language: 'en', ...params } });
    // return res.data.data;
    return data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }
  }
};

export const useGetStockTimeSeries = (
  params: IStockAPIEndpintsInputs[IStockAPIEndpints.timeSeries]['params'],
) => {
  return useQuery({
    queryKey: [params, TIMESERIES_QUERY_KEY],
    queryFn: async ({ queryKey: [p] }) =>
      getStockTimeSeries(
        p as IStockAPIEndpintsInputs[IStockAPIEndpints.timeSeries]['params'],
      ),
  });
};

export const getStockTimeSeriesEquity = async (
  params: IStockAPIEndpintsInputs[IStockAPIEndpints.timeSeries]['params'],
) => {
  try {
    // const res = await api.get<
    //   IStockAPIEndpintsOutputs[IStockAPIEndpints.timeSeriesEquity]
    // >(IStockAPIEndpints.timeSeriesEquity, {
    //   params: params,
    // });
    // return res.data.data;
    return equity.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }
  }
};

export const useGetStockTimeSeriesEquity = (
  params: IStockAPIEndpintsInputs[IStockAPIEndpints.timeSeries]['params'],
  options?: Omit<
    QueryObserverOptions<unknown, unknown, ITimeSeriesOutputEquity>,
    'queryKey' | 'queryFn'
  >,
) =>
  useQuery({
    queryKey: [params, TIMESERIES_EQUITY_QUERY_KEY],
    queryFn: async ({ queryKey: [p] }) =>
      getStockTimeSeriesEquity(
        p as IStockAPIEndpintsInputs[IStockAPIEndpints.timeSeries]['params'],
      ),
    ...options,
  });

export const useSingleStockTimeSeries = (
  params: IStockAPIEndpintsInputs[IStockAPIEndpints.timeSeries]['params'],
  options?: Omit<
    QueryObserverOptions<unknown, unknown, ITimeSeriesOutput>,
    'queryKey' | 'queryFn'
  >,
) =>
  useQuery({
    queryKey: [params, TIMESERIES_QUERY_SINGLE_KEY],
    queryFn: async ({ queryKey: [p] }) =>
      getStockTimeSeries(
        p as IStockAPIEndpintsInputs[IStockAPIEndpints.timeSeries]['params'],
      ),
    ...options,
  });
