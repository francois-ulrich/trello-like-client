/**
 * Generic function for getting a series of objects from an API call
 */
export type Get<T> = () => Promise<T[]>
export type GetOne<T> = () => Promise<T>
export type Post<T> = () => Promise<T>
export type PostOne<U, T> = (item: U) => Promise<T>
