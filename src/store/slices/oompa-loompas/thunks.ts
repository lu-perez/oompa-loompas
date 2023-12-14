import axios, { AxiosResponse } from 'axios';
import { setOompaLoompas, startLoadingOompaLoompas } from './oompaLoompasSlice';
import { Dispatch } from '@reduxjs/toolkit';
import { OompaLoompasResponse } from '../../../types/types';

const baseURL = 'https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas';

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
