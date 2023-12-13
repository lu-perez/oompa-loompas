import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OompaLoompa, OompaLoompasState } from '../../../types/types';
import { RootState } from '../../store';

const initialState: OompaLoompasState = {
  oompaLoompas: [],
  currentPage: 1,
  totalPages: 20,
  isLoading: false,
};

export const oompaLoompasSlice = createSlice({
  name: 'oompaLoompa',
  initialState,
  reducers: {
    startLoadingOompaLoompas: (state) => {
      state.isLoading = true;
    },
    setOompaLoompas: (
      state,
      action: PayloadAction<{
        currentPage: number;
        totalPages: number;
        oompaLoompas: OompaLoompa[];
      }>,
    ) => {
      state.oompaLoompas = action.payload.oompaLoompas;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.isLoading = false;
    },
  },
});

export const { startLoadingOompaLoompas, setOompaLoompas } =
  oompaLoompasSlice.actions;

export const selectOompaLoompas = (state: RootState): OompaLoompasState =>
  state.oompaLoompas;
