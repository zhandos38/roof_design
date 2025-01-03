import httpCommon from '@/helpers/http-common';

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;
class AuthService {
  login(username: string, password: string) {
    return httpCommon.post(`${baseUrl}/login`, { username, password });
  }
}

export default new AuthService();
