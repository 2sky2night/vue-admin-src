export default interface ResponseType<T> {
    code: number,
    msg: string,
    data: T
}