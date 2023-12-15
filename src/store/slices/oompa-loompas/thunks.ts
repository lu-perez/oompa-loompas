import axios, { AxiosResponse } from 'axios';
import {
  setDetailedOompaLoompas,
  setOompaLoompas,
  startLoadingOompaLoompas,
} from './oompaLoompasSlice';
import { Dispatch } from '@reduxjs/toolkit';
import {
  DetailedOompaLoompaWithoutId,
  OompaLoompasResponse,
} from '../../../types/types';
import { RootState } from '../../store';

const baseURL =
  'https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas';

export const getOompaLoompas = (page = 1) => {
  return async (dispatch: Dispatch) => {
    dispatch(startLoadingOompaLoompas());
    try {
      const { data }: AxiosResponse<OompaLoompasResponse> = await axios.get(
        `${baseURL}?page=${page}`,
      );
      console.log(data);
      dispatch(
        setOompaLoompas({
          oompaLoompas: data.results,
          currentPage: data.current,
          totalPages: data.total,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };
};

export const getDetailedOompaLoompa = (oompaLoompaId: number) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(startLoadingOompaLoompas());

    const existingDetailedOompa =
      getState().oompaLoompas.detailedOompaLoompas.find(
        (detailedOompa) => detailedOompa.id === oompaLoompaId,
      );

    if (existingDetailedOompa) {
      dispatch(
        setDetailedOompaLoompas({
          detailedOompaLoompa: existingDetailedOompa,
          oompaLoompaId,
        }),
      );
      return;
    }

    try {
      const { data }: AxiosResponse<DetailedOompaLoompaWithoutId> =
        await axios.get(`${baseURL}/${oompaLoompaId}`);
      console.log(data);
      dispatch(
        setDetailedOompaLoompas({
          detailedOompaLoompa: data,
          oompaLoompaId,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };
};
