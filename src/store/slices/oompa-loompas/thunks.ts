import axios, { AxiosResponse } from 'axios';
import {
  setActiveDetailedOompaLoompa,
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
import { getGenderLabel } from '../../../helpers/getGenderLabel'

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

      const filteredResults = data.results.map(
        ({ id, first_name, last_name, gender, image, profession }) => ({
          id,
          first_name,
          last_name,
          gender: getGenderLabel(gender),
          image,
          profession,
        }),
      );

      dispatch(
        setOompaLoompas({
          oompaLoompas: filteredResults,
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
          detailedOompaLoompas: existingDetailedOompa,
          oompaLoompaId,
        }),
      );
      return;
    }

    try {
      const { data }: AxiosResponse<DetailedOompaLoompaWithoutId> =
        await axios.get(`${baseURL}/${oompaLoompaId}`);

      console.log(data);

      const { first_name, last_name, gender, image, profession, description } =
        data;

      dispatch(
        setDetailedOompaLoompas({
          oompaLoompaId,
          detailedOompaLoompas: {
            first_name,
            last_name,
            gender: getGenderLabel(gender),
            image,
            profession,
            description,
          },
        }),
      );

      dispatch(
        setActiveDetailedOompaLoompa({
          oompaLoompaId,
          activeDetailedOompaLoompa: {
            first_name,
            last_name,
            gender: getGenderLabel(gender),
            image,
            profession,
            description,
          },
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };
};
