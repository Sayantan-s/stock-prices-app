import {
  IStockAPIEndpints,
  IStockAPIEndpintsInputs,
  IStockAPIEndpintsOutputs,
} from '@api/type';
import { api } from '..';
import { isAxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';

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
) =>
  useQuery({
    queryKey: [params, TIMESERIES_QUERY_KEY],
    queryFn: async ({ queryKey: [p] }) =>
      getStockTimeSeries(
        p as IStockAPIEndpintsInputs[IStockAPIEndpints.timeSeries]['params'],
      ),
  });
