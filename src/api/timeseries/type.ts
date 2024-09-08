export interface ITimeSeriesOutput {
  symbol: string;
  type: string;
  price: number;
  previous_close: number;
  change: number;
  change_percent: number;
  pre_or_post_market: number;
  pre_or_post_market_change: number;
  pre_or_post_market_change_percent: number;
  last_update_utc: string;
  time_series: TimeSeries;
  key_events: any[];
  utc_offset_sec: number;
  interval_sec: number;
  period: string;
}

export interface ITimeSeriesState extends ITimeSeriesOutput {
  dates: string[];
}

export interface TimeSeries {
  [date: string]: TimeSeriesData;
}

export interface TimeSeriesData {
  price: number;
  change: number;
  change_percent: number;
  volume?: number;
}

export interface ITimeSeriesInput {
  method: 'GET';
  params: {
    symbol: string;
    period: string;
  };
}
