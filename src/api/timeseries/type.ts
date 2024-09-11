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

export interface ITimeSeriesOutputEquity {
  symbol: string;
  exchange: string;
  type: string;
  price: number;
  day_low: number;
  day_high: number;
  year_low: number;
  year_high: number;
  currency: string;
  volume: number;
  exchange_timezone: string;
  exchange_timezone_short: string;
  exchange_timezone_utc_offset_sec: number;
  full_exchange_name: string;
  exchange_data_max_delay_sec: number;
  time_series: ISeries[];
  period: string;
  interval: string;
}

export interface ISeries {
  datetime: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  change: number;
  change_percent: number;
}
