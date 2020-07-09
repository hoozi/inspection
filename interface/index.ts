export interface Api {
  [key: string]: <T>(params?:any,extra?:any) => Promise<T>
}