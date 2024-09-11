import { StockMarketTracker } from '@components/organism/StockMarketTracker';
import {
  DEFAULT_PERIOD,
  DEFAULT_SYMBOL,
  PERIOD,
  SYMBOL,
} from '@components/organism/StockMarketTracker/type';
import { useState } from 'react';

export const Home = () => {
  const [period, setPeriod] = useState<PERIOD>(DEFAULT_PERIOD);
  const [symbol, setSymbol] = useState<SYMBOL>(DEFAULT_SYMBOL);

  const handleSetPeriod = (value: string) => setPeriod(value as PERIOD);
  const handleSetSymbol = (value: string) => setSymbol(value as SYMBOL);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <StockMarketTracker
        period={period}
        symbol={symbol}
        onChangePeriod={handleSetPeriod}
        onChangeSymbol={handleSetSymbol}
      >
        <StockMarketTracker.Quote />
        <StockMarketTracker.Info />
      </StockMarketTracker>
    </div>
  );
};
