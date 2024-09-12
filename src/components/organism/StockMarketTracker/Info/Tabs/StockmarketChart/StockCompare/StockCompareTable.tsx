import { ITimeSeriesOutput } from '@api/timeseries/type';
import { FC, PropsWithChildren } from 'react';

export const Row: FC<ITimeSeriesOutput & { isLoading: boolean }> = (props) => {
  const { isLoading, ...rest } = props;

  const {
    price = 0,
    previous_close = 0,
    change = 0,
    change_percent = 0,
    pre_or_post_market = 0,
    pre_or_post_market_change = 0,
    pre_or_post_market_change_percent = 0,
  } = rest;

  const IS_NOT_FETCHED = JSON.stringify(rest) === '{}';

  const isChangProfit = change > 0;
  const isPrePostMarketChangeProfit = pre_or_post_market_change > 0;

  return isLoading ? (
    <div className="flex-[0.25] flex flex-col text-center border-b border-t border-neutral-200 mt-4">
      {new Array(5).fill(true).map((_, index) => (
        <div key={index} className="flex-1 p-0.5">
          <p className="p-2 bg-neutral-100 h-full relative animate-pulse" />
        </div>
      ))}
    </div>
  ) : IS_NOT_FETCHED ? (
    <div className="flex-[0.25] flex flex-col text-center border-b border-t border-neutral-200 mt-4">
      {new Array(5).fill(true).map((_, index) => (
        <div key={index} className="flex-1 p-0.5">
          <p className="p-2 bg-neutral-50 h-full relative">
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              -
            </span>
          </p>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex-[0.25] px-6 text-sm text-neutral-600 border-b border-t mt-4">
      <p className="py-2 text-neutral-950 font-semibold">{price}</p>
      <p className="py-2">{previous_close}</p>
      <p
        className={`py-2 relative ${isChangProfit ? 'text-tertiary-500' : 'text-rose-500'}`}
      >
        {change}{' '}
        <span className="absolute text-xs top-1/2 transform -translate-y-1/2 ml-1">
          ({change_percent?.toFixed(2)}%)
        </span>
      </p>
      <p className="py-2">{pre_or_post_market?.toFixed(2)}</p>
      <p
        className={`py-2 relative ${isPrePostMarketChangeProfit ? 'text-tertiary-500' : 'text-rose-500'}`}
      >
        {pre_or_post_market_change?.toFixed(2)}{' '}
        <span className="absolute text-xs top-1/2 transform -translate-y-1/2 ml-1">
          ({pre_or_post_market_change_percent?.toFixed(2)}%)
        </span>
      </p>
    </div>
  );
};

export const Heading = () => {
  return (
    <div className="flex-[0.5] text-sm border-b border-t border-r border-neutral-200 mt-4 pl-6">
      <p className="py-2 text-neutral-800">Price</p>
      <p className="py-2 text-neutral-800">Previous Close</p>
      <p className="py-2 text-neutral-800">Change Percent</p>
      <p className="py-2 text-neutral-800">Pre or Post Market</p>
      <p className="py-2 text-neutral-800">Pre or Post Market Change</p>
    </div>
  );
};

const Root: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex">{children}</div>
);

export const StockCompareTable = Object.assign(Root, { Heading, Row });
