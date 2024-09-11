import { FC, memo, useTransition } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { IProps } from './type';
import { periods } from '@components/organism/StockMarketTracker/type';

const Root: FC<IProps> = ({ value, onChange }) => {
  const handleChangePeriodValue = (v: string) => onChange(v);

  console.log(value);

  return (
    <RadioGroup.Root
      className="flex space-x-1"
      value={value}
      onValueChange={handleChangePeriodValue}
    >
      {periods.map((period) => (
        <RadioGroup.Item
          value={period}
          key={period}
          className={`${value === period ? 'bg-purple-500 text-white' : ''} w-12`}
        >
          {period}
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
};

export const StockMarketChartTabs = memo(Root);
