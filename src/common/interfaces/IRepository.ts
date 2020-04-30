export interface IRepository<K> {
    save(object: K): Promise<any>
    getAll(limit: number, offset: number): Promise<any>
}