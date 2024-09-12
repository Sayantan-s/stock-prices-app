import { Command } from '@components/molecule/Combobox';
import { Popover } from '@components/molecule/Popover';
import { symbols } from '@components/organism/StockMarketTracker/type';
import { useSwitch } from '@hooks/useSwitch';
import { PlusIcon } from '@radix-ui/react-icons';
import { FC, useState } from 'react';
import { IStockSelectorProps } from './type';

export const StockSelector: FC<IStockSelectorProps> = ({
  value,
  onChange,
  formerStockValue,
}) => {
  const [open, { off, setSwitchStatus }] = useSwitch();
  const [stockName, setStockName] = useState(value || '');

  const onSelect = (value: string) => {
    off();
    onChange(value);
    setStockName(value);
  };

  const filteredSymbols = symbols.filter(
    (symbol) => symbol !== formerStockValue,
  );

  return (
    <Popover open={open} onOpenChange={setSwitchStatus}>
      <Popover.Trigger className="flex-1 flex items-center justify-center space-x-1  shadow bg-white p-2 text-neutral-950 hover:bg-primary-500 hover:text-primary-50 rounded-md">
        {stockName || (
          <>
            <PlusIcon stroke="2" /> <span>Add Stock</span>
          </>
        )}
      </Popover.Trigger>
      <Popover.Content className="bg-white">
        <Command>
          <Command.Input placeholder="search stocks eg. AAPL" />
          <Command.List>
            <Command.Empty>No Symbols found!</Command.Empty>
            <Command.Group>
              {filteredSymbols.map((symbol) => (
                <Command.Item key={symbol} value={symbol} onSelect={onSelect}>
                  {symbol}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </Popover.Content>
    </Popover>
  );
};
