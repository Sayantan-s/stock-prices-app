import { useEffect } from 'react';
import { getStockTimeSeries } from '@api/index';
import { TimeSeriesTracker } from '@components/organism/TimeSeriesTracker';

const App = () => {
  useEffect(() => {
    (async () => {
      const data = await getStockTimeSeries({
        symbol: 'AAPL:NASDAQ',
        period: '1D',
      });
      console.log(data);
    })();
  }, []);

  return (
    <div className="content">
      <TimeSeriesTracker />
    </div>
  );
};

export default App;
