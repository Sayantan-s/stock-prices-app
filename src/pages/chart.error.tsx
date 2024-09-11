import { useRouteError } from 'react-router-dom';

export const FullScreenChartError = () => {
  const error = useRouteError() as Error;
  return <div>{error?.message}</div>;
};
