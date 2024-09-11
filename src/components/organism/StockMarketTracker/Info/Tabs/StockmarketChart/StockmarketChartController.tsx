import { useStockerMarketTracker } from '@components/organism/StockMarketTracker';
import { periods } from '@components/organism/StockMarketTracker/type';
import { useState } from 'react';
import { StockMarketChartTabs } from './StocketmarketChartTabs';

export const StockmarketChartController = () => {
  const { period, onChangePeriod, setPeriod } = useStockerMarketTracker();
  const [localPeriod, setLocalPeriod] = useState(period);

  const handleChangePeriodValue = (value: string) => {
    setPeriod(value as (typeof periods)[number]);
    setLocalPeriod(value);
    onChangePeriod(value);
  };

  return (
    <div className="flex justify-between p-5">
      <div>
        <button>Fullscreen</button>
        <button>Compare</button>
      </div>
      <StockMarketChartTabs
        value={localPeriod}
        onChange={handleChangePeriodValue}
      />
    </div>
  );
};
