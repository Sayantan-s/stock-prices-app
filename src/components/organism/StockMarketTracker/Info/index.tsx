import * as Tabs from '@radix-ui/react-tabs';
import { Suspense, lazy, useState } from 'react';
import { motion } from 'framer-motion';
import { NoOp } from './Tabs/StockmarketChart/NoOp';

const StockMarketChart = lazy(() => import('./Tabs/StockmarketChart/index'));

const TABS: Record<string, { value: string; content: React.ReactNode }> = {
  Summary: {
    value: 'SUMMARY',
    content: <NoOp name="Summary" />,
  },
  Chart: {
    value: 'CHART',
    content: (
      <Suspense>
        <StockMarketChart />
      </Suspense>
    ),
  },
  Statistics: {
    value: 'STATISTICS',
    content: <NoOp name="Statistics" />,
  },
  Analysis: {
    value: 'ANALYSIS',
    content: <NoOp name="Analysis" />,
  },
  Settings: {
    value: 'SETTINGS',
    content: <NoOp name="Settings" />,
  },
};

const TabNames = Object.keys(TABS);

export const Info = () => {
  const [activeTab, setActive] = useState(TABS.Chart.value);

  return (
    <Tabs.Root value={activeTab} onValueChange={setActive}>
      <Tabs.List className="border-b border-neutral-100 md:block flex">
        {TabNames.map((tabKey) => (
          <Tabs.Trigger
            key={tabKey}
            value={TABS[tabKey].value}
            className={`relative p-3 md:min-w-28 min-w-10 text-sm md:text-base flex-1 ${activeTab === TABS[tabKey].value ? 'text-neutral-900' : ' text-neutral-600'}`}
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
