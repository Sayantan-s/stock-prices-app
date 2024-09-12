export const LoadingStockMarketController = () => {
  return (
    <div className="flex  flex-col md:flex-row md:justify-between items-center p-5">
      <div className="space-x-3 flex md:order-1 order-2">
        {new Array(2).fill(true).map((_, index) => (
          <div
            key={index}
            className="w-20 h-7 bg-neutral-200 rounded-md animate-pulse"
          />
        ))}
      </div>
      <div className="space-x-1 flex order-1 md:order-2 mb-4 md:mb-0">
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
