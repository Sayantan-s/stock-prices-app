import { useStockerMarketTracker } from '..';
import { LoadingQuote } from './loading';

export const Quote = () => {
  const { state, IS_LOADING, IS_SUCCESS } = useStockerMarketTracker();

  const isProfit = state.change > 0;

  return IS_LOADING || !IS_SUCCESS ? (
    <LoadingQuote />
  ) : IS_SUCCESS ? (
    <div className="p-5 flex flex-col md:items-start  items-center">
      <div>
        <h1 className="text-6xl font-medium text-secondary-950 flex justify-start">
          {state?.price?.toFixed(2)}{' '}
          <span className="block text-neutral-300 font-medium text-xl ml-1">
            USD
          </span>
        </h1>
        <p
          className={`${isProfit ? 'text-tertiary-400' : 'text-rose-400'} mt-3 md:text-left text-center`}
        >
          {isProfit ? '+' : ''}
          {state.change.toFixed(2)} ({state.change_percent.toFixed(2)}
          %)
        </p>
      </div>
    </div>
  ) : null;
};
