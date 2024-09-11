export const LoadingStockMarketController = () => {
  return (
    <div className="flex justify-between p-5">
      <div className="space-x-3 flex">
        {new Array(2).fill(true).map((_, index) => (
          <div
            key={index}
            className="w-20 h-7 bg-neutral-200 rounded-md animate-pulse"
          />
        ))}
      </div>
      <div className="space-x-1 flex">
        {new Array(8).fill(true).map((_, index) => (
          <div
            key={index}
            className="w-10 h-7 bg-neutral-200 rounded-md animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};
