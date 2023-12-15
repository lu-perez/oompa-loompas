import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getDetailedOompaLoompa } from '../store/slices/oompa-loompas/thunks';
import { useParams } from 'react-router-dom';
import { selectOompaLoompas } from '../store/slices/oompa-loompas/oompaLoompasSlice';
import { getGenderLabel } from '../helpers/getGenderLabel';

const DetailOompaLoompa = () => {
  const { id } = useParams();
  const numericId = id ? Number(id) : undefined;

  const dispatch = useAppDispatch();

  const { isLoading, detailedOompaLoompas } =
    useAppSelector(selectOompaLoompas);

  useEffect(() => {
    if (numericId !== undefined) {
      dispatch(getDetailedOompaLoompa(numericId));
    }
  }, [dispatch, numericId]);

  return (
    <div className="container">
      <div className="details">
        {detailedOompaLoompas
          .filter((detailedOompa) => detailedOompa.id === numericId)
          .map((oompaLoompa) => (
            <div className="card" key={oompaLoompa.id}>
              <img src={oompaLoompa.image} />
              <div className="card-body">
                <h1>{oompaLoompa.first_name}</h1>
                <h2>{getGenderLabel(oompaLoompa.gender)}</h2>
                <h2>
                  <i>{oompaLoompa.profession}</i>
                </h2>
                <p>{oompaLoompa.description}</p>
              </div>
            </div>
          ))}
      </div>
      {isLoading && 'loading'}
    </div>
  );
};

export default DetailOompaLoompa;
