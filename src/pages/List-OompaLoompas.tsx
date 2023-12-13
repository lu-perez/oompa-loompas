import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectOompaLoompas } from '../store/slices/oompa-loompas/oompaLoompasSlice';
import { getOompaLoompas } from '../store/slices/oompa-loompas/thunks';

const ListOompaLoompas = () => {
  const dispatch = useAppDispatch();

  const {
    isLoading,
    oompaLoompas,
    currentPage,
    totalPages,
  } = useAppSelector(selectOompaLoompas);

  const isInitialRender = useRef(true);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isInitialRender.current) {
      dispatch(getOompaLoompas());
      isInitialRender.current = false;
    }
    
    const handleScroll = () => {
      if (
        bottomRef.current &&
        window.innerHeight + window.scrollY >= bottomRef.current.offsetTop
      ) {
        if (currentPage < totalPages && !isLoading) {
          dispatch(getOompaLoompas(currentPage + 1));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch, currentPage, totalPages, isLoading]);

  return (
    <>
      <main>
        <h1>Oompa Loompas List</h1>
        <ul>
          {oompaLoompas.map((oompaLoompa) => (
            <li style={{margin: '30px'}} key={oompaLoompa.id}>{oompaLoompa.first_name}</li>
          ))}
        </ul>
      </main>
      <div ref={bottomRef}></div>
      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default ListOompaLoompas;
