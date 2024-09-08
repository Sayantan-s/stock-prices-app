import { TimeSeriesTracker } from '@components/organism/TimeSeriesTracker';
import {
  DEFAULT_PERIOD,
  DEFAULT_SYMBOL,
} from '@components/organism/TimeSeriesTracker/type';

const NOOP = () => {};

const App = () => {
  return (
    <div className="content">
      <TimeSeriesTracker
        period={DEFAULT_PERIOD}
        symbol={DEFAULT_SYMBOL}
        onChangePeriod={NOOP}
        onChangeSymbol={NOOP}
      >
        <TimeSeriesTracker.StockInformation />
        <TimeSeriesTracker.TimeSeriesGraph />
      </TimeSeriesTracker>
    </div>
  );
};

export default App;
