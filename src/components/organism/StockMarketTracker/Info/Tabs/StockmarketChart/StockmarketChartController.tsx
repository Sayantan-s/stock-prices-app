import { useStockerMarketTracker } from '@components/organism/StockMarketTracker';
import { periods } from '@components/organism/StockMarketTracker/type';
import { useState } from 'react';
import { StockMarketChartTabs } from './StocketmarketChartTabs';
import { Link } from 'react-router-dom';
import { StockCompare } from './StockCompare';

export const StockmarketChartController = () => {
  const { period, onChangePeriod, symbol } = useStockerMarketTracker();
  const [localPeriod, setLocalPeriod] = useState(period);

  const handleChangePeriodValue = (value: string) => {
    setLocalPeriod(value);
    onChangePeriod(value);
  };

  return (
    <div className="flex justify-between p-5">
      <div>
        <Link to={`/chart?symbol=${symbol}`} target="_blank">
          Fullscreen
        </Link>
        <StockCompare />
      </div>
      <StockMarketChartTabs
        value={localPeriod}
        onChange={handleChangePeriodValue}
      />
    </div>
  );
};
