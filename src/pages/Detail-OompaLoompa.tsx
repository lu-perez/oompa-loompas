import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getDetailedOompaLoompa } from '../store/slices/oompa-loompas/thunks';
import { useParams } from 'react-router-dom';
import { selectOompaLoompas } from '../store/slices/oompa-loompas/oompaLoompasSlice';

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
    <div>
      {detailedOompaLoompas
        .filter((x) => x.id === numericId)
        .map((o) => (
          <p key={o.id}>{o.email}</p>
        ))}
      {isLoading && 'loading'}
    </div>
  );
};

export default DetailOompaLoompa;
