import axios from 'axios'
import { api_base } from '../environment'

let tokenGetter = () => localStorage.getItem('authToken') || ''

class ApiClient {
  private client

  constructor(baseURL = api_base) {
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: { Accept: 'application/json' },
    })

    this.client.interceptors.request.use((config: any) => {
      const t = tokenGetter()
      if (t) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${t}`
      }
      return config
    })

    this.client.interceptors.response.use(
      res => res,
      (err: any) => Promise.reject(err)
    )
  }

  get(url, params?, config?) {
    return this.client.get(url, { params, ...config }).then(r => r.data)
  }

  post(url, data?, config?) {
    return this.client.post(url, data, config).then(r => r.data)
  }

  put(url, data?, config?) {
    return this.client.put(url, data, config).then(r => r.data)
  }

  delete(url, config?) {
    return this.client.delete(url, config).then(r => r.data)
  }
}

export default ApiClient
export const apiClient = new ApiClient()
