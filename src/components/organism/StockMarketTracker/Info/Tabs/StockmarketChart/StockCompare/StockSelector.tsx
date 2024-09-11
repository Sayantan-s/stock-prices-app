import { Command } from '@components/molecule/Combobox';
import { Popover } from '@components/molecule/Popover';
import { symbols } from '@components/organism/StockMarketTracker/type';
import { useSwitch } from '@hooks/useSwitch';
import { FC, useState } from 'react';

export const StockSelector: FC<IStockSelectorProps> = ({
  onChange,
  formerStockValue,
}) => {
  const [open, { off, setSwitchStatus }] = useSwitch();
  const [stockName, setStockName] = useState('');

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
      <Popover.Trigger>{stockName || 'Select Stock'}</Popover.Trigger>
      <Popover.Content>
        <Command className="bg-white">
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
