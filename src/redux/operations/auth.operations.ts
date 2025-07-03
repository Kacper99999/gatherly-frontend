import { createAsyncThunk } from '@reduxjs/toolkit';
import { client, setAuthHeader, clearAuthHeader } from '../../lib/client';

interface User {
  name: string | null;
  email: string | null;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface LogInPayload {
  email: string;
  password: string;
}

export const register = createAsyncThunk<
  { user: User; token: string },
  RegisterPayload,
  { rejectValue: string }
>('auth/register', async (credentials, ThunkApi) => {
  try {
    const response = await client.post('/api/users/register', credentials);
    setAuthHeader(response.data.token);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return ThunkApi.rejectWithValue(err.message);
    }
    return ThunkApi.rejectWithValue('Nieznany błąd');
  }
});

export const logIn = createAsyncThunk<
  { user: User; token: string },
  LogInPayload,
  { rejectValue: string }
>('auth/login', async (credentials, ThunkApi) => {
  try {
    const response = await client.post('/api/users/login', credentials, {
      withCredentials: true,
    });
    setAuthHeader(response.data.token);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return ThunkApi.rejectWithValue(err.message);
    }
    return ThunkApi.rejectWithValue('Nieznany błąd');
  }
});
