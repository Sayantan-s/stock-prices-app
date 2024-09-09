import { useStockerMarketTracker } from '@components/organism/StockMarketTracker';
import { periods } from '@components/organism/StockMarketTracker/type';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { useState } from 'react';

export const StockmarketChartController = () => {
  const { period, onChangePeriod, setPeriod } = useStockerMarketTracker();
  const [localPeriod, setLocalPeriod] = useState(period);

  const handleChangePeriodValue = (value: string) => {
    setLocalPeriod(value);
    onChangePeriod(value);
    setPeriod(value as (typeof periods)[number]);
  };

  return (
    <div className="flex justify-between p-5">
      <div>
        <button>Fullscreen</button>
        <button>Compare</button>
      </div>
      <RadioGroup.Root
        className="flex space-x-1"
        value={localPeriod}
        onValueChange={handleChangePeriodValue}
      >
        {periods.map((period) => (
          <RadioGroup.Item
            value={period}
            key={period}
            className='data-[state="checked"]:bg-purple-500 data-[state="checked"]:text-white w-12'
          >
            {period}
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </div>
  );
};
