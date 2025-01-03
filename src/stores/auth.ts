import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import authService from '@/services/auth.service'
import { useAppToast } from '@/helpers/toast'
import { HttpStatusCode } from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const toast = useAppToast()
  const router = useRouter()
  const returnUrl = ref<string | null>(null)

  const getUser = () => {
    const userData = localStorage.getItem('user')
    return userData ? JSON.parse(userData) : null
  }

  const getIsLoggedIn = () => {
    return localStorage.getItem('token') && localStorage.getItem('token')
  }

  const getToken = () => {
    return localStorage.getItem('token')
  }

  const login = async (username: string, password: string) => {
    try {
      const response = await authService.login(username, password)
      console.log('response', response)

      const { user, access_token } = response.data

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', access_token)

      // redirect to previous url or default to home page
      router.push(returnUrl.value || '/')
    } catch (err: any) {
      console.error(err)
      if (err && err.response && err.response.status === HttpStatusCode.Unauthorized) {
        toast.showError('Неверный пароль или логин')
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/login')
  }

  return { getUser, returnUrl, login, logout, getIsLoggedIn, getToken }
})
