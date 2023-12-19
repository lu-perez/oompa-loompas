import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getDetailedOompaLoompa } from '../store/slices/oompa-loompas/thunks';
import { useParams } from 'react-router-dom';
import { selectOompaLoompas } from '../store/slices/oompa-loompas/oompaLoompasSlice';
import { getGenderLabel } from '../helpers/getGenderLabel';
import { Labels } from '../config/labels';

const DetailOompaLoompa = () => {
  const { id } = useParams();
  const numericId = id ? Number(id) : undefined;

  const dispatch = useAppDispatch();

  const { isLoading, activeDetailedOompaLoompa } =
    useAppSelector(selectOompaLoompas);

  useEffect(() => {
    if (numericId !== undefined) {
      dispatch(getDetailedOompaLoompa(numericId));
    }
  }, [dispatch, numericId]);

  return (
    <>
      {!isLoading && activeDetailedOompaLoompa && (
        <div className="container">
          <div className="details">
            <div className="card" key={activeDetailedOompaLoompa.id}>
              <img src={activeDetailedOompaLoompa.image} />
              <div className="card-body">
                <h1>{activeDetailedOompaLoompa?.first_name}</h1>
                <h2>{getGenderLabel(activeDetailedOompaLoompa.gender)}</h2>
                <h2>
                  <i>{activeDetailedOompaLoompa?.profession}</i>
                </h2>
                <p>{activeDetailedOompaLoompa?.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading && <p className="loader">{Labels.loading}</p>}
    </>
  );
};

export default DetailOompaLoompa;
