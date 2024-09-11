import { StockMarketTracker } from '@components/organism/StockMarketTracker';
import {
  DEFAULT_PERIOD,
  DEFAULT_SYMBOL,
} from '@components/organism/StockMarketTracker/type';
import { useState } from 'react';

const NOOP = () => {};

export const Home = () => {
  const [period, setPeriod] = useState(DEFAULT_PERIOD);
  const [symbol, setSymbol] = useState(DEFAULT_SYMBOL);

  return (
    <div className="content">
      <StockMarketTracker
        period={DEFAULT_PERIOD}
        symbol={DEFAULT_SYMBOL}
        onChangePeriod={NOOP}
        onChangeSymbol={NOOP}
      >
        <StockMarketTracker.Quote />
        <StockMarketTracker.Info />
      </StockMarketTracker>
    </div>
  );
};
