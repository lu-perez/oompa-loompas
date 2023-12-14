import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectOompaLoompas } from '../store/slices/oompa-loompas/oompaLoompasSlice';
import { getOompaLoompas } from '../store/slices/oompa-loompas/thunks';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import Card from '../components/card/Card';

const ListOompaLoompas = () => {
  const dispatch = useAppDispatch();

  const { isLoading, oompaLoompas, currentPage, totalPages } =
    useAppSelector(selectOompaLoompas);

  const bottomRef = useInfiniteScroll(
    () => dispatch(getOompaLoompas(currentPage + 1)),
    currentPage,
    totalPages,
    isLoading,
  );

  return (
    <div className="container">
      <main>
        <div className="heading">
          <h1>Find your Oompa Loompa</h1>
          <h2>There are more than 100k</h2>
        </div>
        <div className="card-container">
          {oompaLoompas.map((oompaLoompa) => (
            <Card oompaLoompa={oompaLoompa} key={oompaLoompa.id} />
          ))}
        </div>
        <div ref={bottomRef}></div>
        {isLoading && <p>Loading...</p>}
      </main>
    </div>
  );
};

export default ListOompaLoompas;
