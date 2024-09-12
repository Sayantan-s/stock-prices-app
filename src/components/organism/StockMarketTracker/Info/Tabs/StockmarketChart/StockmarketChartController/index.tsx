import { useStockerMarketTracker } from '@components/organism/StockMarketTracker';
import { useState } from 'react';
import { StockMarketChartTabs } from '../StocketmarketChartTabs';
import { StockCompare } from '../StockCompare';
import { Fullscreen } from '../Fullscreen';
import { LoadingStockMarketController } from './loading';
import { IStockEntities } from '../StockCompare/type';

export const StockmarketChartController = () => {
  const { period, onChangePeriod, IS_LOADING } = useStockerMarketTracker();
  const [localPeriod, setLocalPeriod] = useState(period);
  const [stocks, setStocks] = useState({ entity1: '', entity2: '' });

  const handleChangePeriodValue = (value: string) => {
    setLocalPeriod(value);
    onChangePeriod(value);
  };

  const onChange = (v: IStockEntities) => setStocks(v);

  return IS_LOADING ? (
    <LoadingStockMarketController />
  ) : (
    <div className="flex flex-col md:flex-row md:justify-between items-center p-5">
      <div className="flex space-x-3 md:order-1 order-2">
        <Fullscreen />
        <StockCompare {...stocks} onChange={onChange} />
      </div>
      <StockMarketChartTabs
        value={localPeriod}
        onChange={handleChangePeriodValue}
        className="order-1 md:order-2 mb-4 md:mb-0"
      />
    </div>
  );
};
