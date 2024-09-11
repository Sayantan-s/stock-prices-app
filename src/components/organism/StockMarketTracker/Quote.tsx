import { useStockerMarketTracker } from '.';

export const Quote = () => {
  const { state } = useStockerMarketTracker();

  const isProfit = state.change > 0;

  return (
    <div className="p-5">
      <h1 className="text-6xl font-medium text-secondary-950 flex justify-start">
        {state?.price?.toFixed(2)}{' '}
        <span className="block text-neutral-300 font-medium text-xl ml-1">
          USD
        </span>
      </h1>
      <p className={`${isProfit ? 'text-tertiary-400' : 'text-rose-400'} mt-3`}>
        {isProfit ? '+' : '-'} {state.change} ({state.change_percent}%)
      </p>
    </div>
  );
};
