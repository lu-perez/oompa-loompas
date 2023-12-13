import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectOompaLoompas } from '../store/slices/oompa-loompas/oompaLoompasSlice';
import { getOompaLoompas } from '../store/slices/oompa-loompas/thunks';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const ListOompaLoompas = () => {
  const dispatch = useAppDispatch();

  const {
    isLoading,
    oompaLoompas,
    currentPage,
    totalPages,
  } = useAppSelector(selectOompaLoompas);

  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      dispatch(getOompaLoompas());
      isInitialRender.current = false;
    }
  }, [dispatch]);

  const bottomRef = useInfiniteScroll(
    () => dispatch(getOompaLoompas(currentPage + 1)),
    currentPage,
    totalPages,
    isLoading,
  );

  return (
    <>
      <main>
        <h1>Oompa Loompas Infinite Scroll List</h1>
        <ul>
          {oompaLoompas.map((oompaLoompa) => (
            <li style={{ margin: '30px' }} key={oompaLoompa.id}>
              {oompaLoompa.first_name}
            </li>
          ))}
        </ul>
      </main>
      <div ref={bottomRef}></div>
      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default ListOompaLoompas;
