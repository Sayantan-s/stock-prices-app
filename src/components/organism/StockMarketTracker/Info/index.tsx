import * as Tabs from '@radix-ui/react-tabs';
import { StockMarketChart } from './Tabs/StockmarketChart';
import { useState } from 'react';
import { motion } from 'framer-motion';

const TABS: Record<string, { value: string; content: React.ReactNode }> = {
  Summary: {
    value: 'SUMMARY',
    content: 'Summary',
  },
  Chart: {
    value: 'CHART',
    content: <StockMarketChart />,
  },
  Statistics: {
    value: 'STATISTICS',
    content: 'Statistics',
  },
  Analysis: {
    value: 'ANALYSIS',
    content: 'Statistics',
  },
  Settings: {
    value: 'SETTINGS',
    content: 'Settings',
  },
};

const TabNames = Object.keys(TABS);

export const Info = () => {
  const [activeTab, setActive] = useState(TABS.Chart.value);

  return (
    <Tabs.Root value={activeTab} onValueChange={setActive}>
      <Tabs.List className="border-b border-neutral-100">
        {TabNames.map((tabKey) => (
          <Tabs.Trigger
            key={tabKey}
            value={TABS[tabKey].value}
            className={`relative p-3 min-w-28 ${activeTab === TABS[tabKey].value ? 'text-neutral-900' : ' text-neutral-600'}`}
          >
            {tabKey}
            {activeTab === TABS[tabKey].value ? (
              <motion.div
                layoutId="active-tab"
                className="inset-0 absolute top-full rounded-full left-0 bg-primary-500 h-1"
              />
            ) : null}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {TabNames.map((tabKey) => (
        <Tabs.Content value={TABS[tabKey].value} key={tabKey}>
          {TABS[tabKey].content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};
