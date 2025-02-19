import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from 'axiosInstance';
import { format, parse } from 'date-fns';
import { ru } from 'date-fns/locale';
import { myAlert } from 'helpers/myAlert';

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  preloader_user: false,
  listUsers: []
};

////// getAllUserReq - get cписок всех польщователей
export const getAllUserReq = createAsyncThunk('getAllUserReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/user/main`;
  try {
    const response = await axiosInstance.post(url, data);
    if (response.status >= 200 && response.status < 300) {
      return response?.data;
    } else {
      throw Error(`Error: ${response.status}`);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

////// crudUserReq - crud всех польщователей
export const crudUserReq = createAsyncThunk('crudUserReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/user/crud`;
  try {
    const response = await axiosInstance.post(url, data);
    if (response.status >= 200 && response.status < 300) {
      return response?.data;
    } else {
      throw Error(`Error: ${response.status}`);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    listUsersFN: (state, action) => {
      state.listUsers = action.payload;
    }
  },

  extraReducers: (builder) => {
    ////////////// getAllUserReq
    builder.addCase(getAllUserReq.fulfilled, (state, action) => {
      state.preloader_user = false;
      state.listUsers = action.payload;
    });
    builder.addCase(getAllUserReq.rejected, (state, action) => {
      state.error = action.payload;
      state.listUsers = [];
      state.preloader_user = false;
    });
    builder.addCase(getAllUserReq.pending, (state, action) => {
      state.preloader_user = true;
    });

    ////////////// crudUserReq
    builder.addCase(crudUserReq.fulfilled, (state, action) => {
      state.preloader_user = false;
    });
    builder.addCase(crudUserReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_user = false;
    });
    builder.addCase(crudUserReq.pending, (state, action) => {
      state.preloader_user = true;
    });
  }
});

export const { listUsersFN } = usersSlice.actions;

export default usersSlice.reducer;
