export type TApi = {
	[key: string]: <T>(params?:any,extra?:any) => Promise<T>
}