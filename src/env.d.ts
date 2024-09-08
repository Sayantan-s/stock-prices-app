/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
  readonly PUBLIC_RAPID_API_KEY: string;
  readonly PUBLIC_RAPID_API_HOST: string;
  readonly PUBLIC_RAPID_API_STOCKQUOTE_URI: string;
  readonly PUBLIC_RAPID_API_TIMESERIES_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
