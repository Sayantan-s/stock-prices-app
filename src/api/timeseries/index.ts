import {
  IStockAPIEndpints,
  IStockAPIEndpintsInputs,
  IStockAPIEndpintsOutputs,
} from '@api/type';
import { api } from '..';
import { isAxiosError } from 'axios';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ITimeSeriesOutput, ITimeSeriesState } from './type';

export const getStockTimeSeries = async (
  params: IStockAPIEndpintsInputs[IStockAPIEndpints.timeSeries]['params'],
) => {
  try {
    const res = await api.get<
      IStockAPIEndpintsOutputs[IStockAPIEndpints.timeSeries]
    >(IStockAPIEndpints.timeSeries, { params: { language: 'en', ...params } });
    return res.data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }
  }
};

export const TIMESERIES_QUERY_KEY = 'TIMESERIES_QUERY_KEY';

export const useGetStockTimeSeries = (
  params: IStockAPIEndpintsInputs[IStockAPIEndpints.timeSeries]['params'],
): [
  UseQueryResult<ITimeSeriesOutput | undefined, Error>,
  ITimeSeriesState | null,
  React.Dispatch<React.SetStateAction<ITimeSeriesState | null>>,
] => {
  const [state, setState] = useState<ITimeSeriesState | null>(null);

  const result = useQuery({
    queryKey: [params, TIMESERIES_QUERY_KEY],
    queryFn: async ({ queryKey: [p] }) =>
      getStockTimeSeries(
        p as IStockAPIEndpintsInputs[IStockAPIEndpints.timeSeries]['params'],
      ),
  });

  useEffect(() => {
    if (result.isSuccess && result?.data)
      setState({ ...result.data, dates: Object.keys(result.data.time_series) });
  }, [result.isSuccess]);

  return [result, state, setState];
};
