import { useQuery, useMutation } from '@tanstack/react-query';
import { registerUserApi, loginUserApi, fetchUserApi, fetchUsersApi } from '../apis/auth';
import type { RegisterData, LoginData, User, LoginResponse } from '@/types/types';

export function useRegisterUser() {
    return useMutation<User, Error, RegisterData>({
      mutationFn: (data) => registerUserApi(data),
    });
  }
  
  export function useLoginUser() {
    return useMutation<LoginResponse, Error, LoginData>({
      mutationFn: (data) => loginUserApi(data),
    });
  }
  
  

  export function useFetchUser(userId: string) {
    return useQuery<User, Error>({
      queryKey: ['fetchUser', userId],
      queryFn: () => fetchUserApi(userId),
      enabled: !!userId,
    });
  }
  

  export function useFetchUsers() {
    return useQuery<User[], Error>({
      queryKey: ['fetchUsers'],
      queryFn: fetchUsersApi,
    });
  }