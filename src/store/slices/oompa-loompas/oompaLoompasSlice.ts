import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OompaLoompasState } from '../../../types/types';
import { RootState } from '../../store';

const initialState: OompaLoompasState = {
  page: 0,
  oompaLoompas: [],
  isLoading: false,
};

export const oompaLoompasSlice = createSlice({
  name: 'oompaLoompa',
  initialState,
  reducers: {
    startLoadingOompaLoompas: (state) => {
      state.isLoading = true;
    },
    setOompaLoompas: (state, action: PayloadAction<OompaLoompasState>) => {
      state.oompaLoompas = action.payload.oompaLoompas;
      state.page = action.payload.page;
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { startLoadingOompaLoompas, setOompaLoompas } =
  oompaLoompasSlice.actions;

export const selectOompaLoompas = (state: RootState): OompaLoompasState =>
  state.oompaLoompas;
