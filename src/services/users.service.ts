import httpCommon from '@/helpers/http-common'
import type { User } from '@/types/users'
import type { Paginated } from '@/types'

const baseUrl = `${import.meta.env.VITE_API_URL}/users`
class UsersService {
  getAll(params?: any): Promise<Paginated<User[]>> {
    return httpCommon.get(baseUrl, { params }).then((data) => data.data)
  }

  getOne(id: number): Promise<User> {
    return httpCommon.get(`${baseUrl}/${id}`).then((data) => data.data)
  }

  create(data: any): Promise<User> {
    return httpCommon.post(baseUrl, data)
  }

  update(id: number, data: any): Promise<User> {
    return httpCommon.patch(`${baseUrl}/${id}`, data)
  }

  delete(id: number): Promise<void> {
    return httpCommon.delete(`${baseUrl}/${id}`)
  }
}

export default new UsersService()
