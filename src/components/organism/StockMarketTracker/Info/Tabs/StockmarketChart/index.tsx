import { Suspense, lazy } from 'react';
import { StockmarketChartController } from './StockmarketChartController';

const Chart = lazy(() => import('./AreaChart'));

const StockMarketChart = () => {
  return (
    <div className="flex flex-col content-between relative md:mt-8 mt-2">
      <StockmarketChartController />
      <Suspense>
        <Chart />
      </Suspense>
    </div>
  );
};

export default StockMarketChart;
