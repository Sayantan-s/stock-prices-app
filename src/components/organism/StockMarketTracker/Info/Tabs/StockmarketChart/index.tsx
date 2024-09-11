import { Chart } from './AreaChart';
import { StockmarketChartController } from './StockmarketChartController';

export const StockMarketChart = () => {
  return (
    <div className="flex flex-col content-between relative mt-8">
      <StockmarketChartController />
      <Chart />
    </div>
  );
};
