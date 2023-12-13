import './App.css';
import { selectOompaLoompas } from './store/slices/oompa-loompas/oompaLoompasSlice';
import { useEffect } from 'react';
import { getOompaLoompas } from './store/slices/oompa-loompas/thunks';
import { useAppDispatch, useAppSelector } from './store/hooks';

function App() {
  const dispatch = useAppDispatch();
  const { isLoading, oompaLoompas, page } = useAppSelector(selectOompaLoompas);

  useEffect(() => {
    dispatch(getOompaLoompas());
  }, [dispatch]);

  return (
    <>
      <main>
        <h1>Oompa Loompas</h1>

        <ul>
          {oompaLoompas.map((oompaLoompa) => (
            <li key={oompaLoompa.id}>{oompaLoompa.first_name}</li>
          ))}
        </ul>

        <button
          type="button"
          disabled={isLoading}
          onClick={() => dispatch(getOompaLoompas(page))}
        >
          Next
        </button>
      </main>
    </>
  );
}

export default App;
