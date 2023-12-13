import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectOompaLoompas } from '../store/slices/oompa-loompas/oompaLoompasSlice'
import { getOompaLoompas } from '../store/slices/oompa-loompas/thunks'

const ListOompaLoompas = () => {
  const dispatch = useAppDispatch();
  const { isLoading, oompaLoompas, currentPage, totalPages } =
    useAppSelector(selectOompaLoompas);

  useEffect(() => {
    dispatch(getOompaLoompas());
  }, [dispatch]);

  return (
    <main>
      <h1>Oompa Loompas</h1>

      <ul>
        {oompaLoompas.map((oompaLoompa) => (
          <li key={oompaLoompa.id}>{oompaLoompa.first_name}</li>
        ))}
      </ul>

      <button
        type="button"
        disabled={isLoading || totalPages === currentPage}
        onClick={() => dispatch(getOompaLoompas(currentPage + 1))}
      >
        Next
      </button>
    </main>
  );
}

export default ListOompaLoompas;
