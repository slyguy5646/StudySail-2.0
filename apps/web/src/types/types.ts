export interface UploadedFile {
  name: string;
  key: string;
  url: string;
  size: number;
}

export type NoNullFields<Ob> = {
  [K in keyof Ob]: Ob[K] extends object ? NoNullFields<Ob[K]> : NonNullable<Ob[K]>;
};

export interface CustomUploadthingError {
  title: string;
  description: string;
}
