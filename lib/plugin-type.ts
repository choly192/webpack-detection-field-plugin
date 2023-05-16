export interface WebpackPlugin {
  apply(compiler: any): void;
}
