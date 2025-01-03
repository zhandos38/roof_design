export interface Paginated<T> {
  paginator: {
    count: number
    skip: number
    take: number
  }
  data: T
}

export enum Language {
  KZ = "kz",
  RU = "ru",
}
