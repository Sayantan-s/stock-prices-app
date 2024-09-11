import { Chart } from './Chart';
import { StockmarketChartController } from './StockmarketChartController';

export const StockMarketChart = () => {
  return (
    <div className="flex flex-col content-between relative">
      <StockmarketChartController />
      <Chart />
    </div>
  );
};
