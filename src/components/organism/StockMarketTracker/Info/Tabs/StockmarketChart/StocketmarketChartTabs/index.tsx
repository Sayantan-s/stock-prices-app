import { FC, memo } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { IProps } from './type';
import { periods } from '@components/organism/StockMarketTracker/type';
import { motion } from 'framer-motion';

const Root: FC<IProps> = ({ value, onChange }) => {
  const handleChangePeriodValue = (v: string) => onChange(v);

  return (
    <ToggleGroup.Root
      className="flex space-x-1"
      type="single"
      value={value}
      onValueChange={handleChangePeriodValue}
    >
      {periods.map((period, index) => (
        <ToggleGroup.Item
          value={period}
          key={period}
          id={`${index}`}
          tabIndex={index}
          className={`w-12 px-2 py-1.5 rounded-md relative`}
        >
          {value === period ? (
            <motion.div
              layoutId="active-pill"
              className="bg-primary-600 inset-0 rounded-md absolute z-50 flex items-center justify-center  text-neutral-50"
            >
              {period}
            </motion.div>
          ) : null}
          <span className={`relative text-neutral-700`}>{period}</span>
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
};

export const StockMarketChartTabs = memo(Root);
