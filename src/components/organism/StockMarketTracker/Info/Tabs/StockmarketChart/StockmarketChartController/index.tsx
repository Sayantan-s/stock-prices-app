import { useStockerMarketTracker } from '@components/organism/StockMarketTracker';
import { useState } from 'react';
import { StockMarketChartTabs } from '../StocketmarketChartTabs';
import { StockCompare } from '../StockCompare';
import { Fullscreen } from '../Fullscreen';
import { LoadingStockMarketController } from './loading';

export const StockmarketChartController = () => {
  const { period, onChangePeriod, IS_LOADING, IS_SUCCESS } =
    useStockerMarketTracker();
  const [localPeriod, setLocalPeriod] = useState(period);

  const handleChangePeriodValue = (value: string) => {
    setLocalPeriod(value);
    onChangePeriod(value);
  };

  return IS_LOADING ? (
    <LoadingStockMarketController />
  ) : (
    <div className="flex justify-between p-5">
      <div className="flex space-x-3">
        <Fullscreen />
        <StockCompare />
      </div>
      <StockMarketChartTabs
        value={localPeriod}
        onChange={handleChangePeriodValue}
      />
    </div>
  );
};
