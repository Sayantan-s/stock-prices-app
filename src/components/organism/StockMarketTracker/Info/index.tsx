import * as Tabs from '@radix-ui/react-tabs';
import { StockMarketChart } from './Tabs/StockmarketChart';

const TABS = {
  summary: 'SUMMARY',
  chart: 'CHART',
  stats: 'STATISTICS',
  analysis: 'ANALYSIS',
  settings: 'SETTINGS',
};

export const Info = () => {
  return (
    <Tabs.Root defaultValue={TABS.chart}>
      <Tabs.List>
        <Tabs.Trigger value={TABS.summary}>Summary</Tabs.Trigger>
        <Tabs.Trigger value={TABS.chart}>Chart</Tabs.Trigger>
        <Tabs.Trigger value={TABS.stats}>Statistics</Tabs.Trigger>
        <Tabs.Trigger value={TABS.analysis}>Analysis</Tabs.Trigger>
        <Tabs.Trigger value={TABS.settings}>Settings</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value={TABS.summary}>Summary</Tabs.Content>
      <Tabs.Content value={TABS.chart}>
        <StockMarketChart />
      </Tabs.Content>
      <Tabs.Content value={TABS.stats}>Statistics</Tabs.Content>
      <Tabs.Content value={TABS.analysis}>Analysis</Tabs.Content>
      <Tabs.Content value={TABS.settings}>Settings</Tabs.Content>
    </Tabs.Root>
  );
};
