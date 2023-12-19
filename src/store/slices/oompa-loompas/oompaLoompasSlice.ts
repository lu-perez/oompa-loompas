import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  OompaLoompasState,
  DetailedOompaLoompaWithoutId,
  FilteredOompaLoompa,
} from '../../../types/types';
import { RootState } from '../../store';

const initialState: OompaLoompasState = {
  oompaLoompas: [],
  detailedOompaLoompas: [],
  activeDetailedOompaLoompa: null,
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
        oompaLoompas: FilteredOompaLoompa[];
      }>,
    ) => {
      const uniqueOompaLoompas = action.payload.oompaLoompas.filter(
        (incomingOompa) =>
          !state.oompaLoompas.some(
            (existingOompa) => existingOompa.id === incomingOompa.id,
          ),
      );
      state.oompaLoompas = [...state.oompaLoompas, ...uniqueOompaLoompas];
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.isLoading = false;
    },

    setDetailedOompaLoompas: (
      state,
      action: PayloadAction<{
        detailedOompaLoompas: DetailedOompaLoompaWithoutId;
        oompaLoompaId: number;
        activeDetailedOompaLoompa: DetailedOompaLoompaWithoutId;
      }>,
    ) => {
      const incomingDetailedOompas = action.payload.detailedOompaLoompas;
      const isDuplicate = state.detailedOompaLoompas.some(
        (existingDetailedOompa) =>
          existingDetailedOompa.id === action.payload.oompaLoompaId,
      );
      if (!isDuplicate) {
        state.detailedOompaLoompas = [
          ...state.detailedOompaLoompas,
          { id: action.payload.oompaLoompaId, ...incomingDetailedOompas },
        ];
      }
      state.isLoading = false;
      state.activeDetailedOompaLoompa = { id: action.payload.oompaLoompaId, ...action.payload.activeDetailedOompaLoompa };
    },
  },
});

export const {
  startLoadingOompaLoompas,
  setOompaLoompas,
  setDetailedOompaLoompas,
} = oompaLoompasSlice.actions;

export const selectOompaLoompas = (state: RootState): OompaLoompasState =>
  state.oompaLoompas;
