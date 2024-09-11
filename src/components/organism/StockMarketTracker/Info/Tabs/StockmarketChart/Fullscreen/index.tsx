import { useStockerMarketTracker } from '@components/organism/StockMarketTracker';
import { SizeIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export const Fullscreen = () => {
  const { symbol } = useStockerMarketTracker();
  return (
    <Link
      to={`/chart?symbol=${symbol}`}
      target="_blank"
      className="flex items-center space-x-1 text-neutral-700"
    >
      <SizeIcon />
      <span>Fullscreen</span>
    </Link>
  );
};
