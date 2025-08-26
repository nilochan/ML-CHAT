// apiService.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: { username: string; email: string; password: string }): Promise<AxiosResponse> =>
    apiClient.post('/auth/register', data),
    
  login: (data: { email: string; password: string }): Promise<AxiosResponse> =>
    apiClient.post('/auth/login', data),
    
  getProfile: (): Promise<AxiosResponse> =>
    apiClient.get('/auth/profile'),
};

// Chat API
export const chatAPI = {
  sendMessage: (data: { content: string; roomId?: string }): Promise<AxiosResponse> =>
    apiClient.post('/chat/messages', data),
    
  getMessages: (roomId: string, params?: { limit?: number; skip?: number }): Promise<AxiosResponse> =>
    apiClient.get(`/chat/messages/${roomId}`, { params }),
    
  createChatRoom: (data: { name: string; participants: string[]; isGroupChat?: boolean }): Promise<AxiosResponse> =>
    apiClient.post('/chat/rooms', data),
    
  getUserChatRooms: (): Promise<AxiosResponse> =>
    apiClient.get('/chat/rooms'),
};

export default apiClient;