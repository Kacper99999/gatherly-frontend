import { createAsyncThunk } from '@reduxjs/toolkit';
import { client, setAuthHeader, clearAuthHeader } from '../../lib/client';

export const register = createAsyncThunk('auth/register', async (credentials, ThunkApi) => {
  try {
    const response = await client.post('/api/users/register', credentials);
    setAuthHeader(response.data.token);
    return response.data;
  } catch (err: unknown) {
    return ThunkApi.rejectWithValue(err.message);
  }
});
