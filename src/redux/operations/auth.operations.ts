import { createAsyncThunk } from '@reduxjs/toolkit';
import { client, setAuthHeader, clearAuthHeader } from '../../lib/client';

export const register = createAsyncThunk('auth/register', async (credentials, ThunkApi) => {
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

export const logIn = createAsyncThunk('auth/login', async (credentials, ThunkApi) => {
  try {
    const response = await client.post('api/users/login', credentials, {
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
