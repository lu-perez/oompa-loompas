import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectOompaLoompas } from '../store/slices/oompa-loompas/oompaLoompasSlice';
import { getOompaLoompas } from '../store/slices/oompa-loompas/thunks';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import Card from '../components/card/Card';
import InputSearch from '../components/inputSearch/InputSearch';
import { useState } from 'react';
import useOompaLoompaFilter from '../hooks/useFilter';

const ListOompaLoompas = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const dispatch = useAppDispatch();

  const { isLoading, oompaLoompas, currentPage, totalPages } =
    useAppSelector(selectOompaLoompas);

  const bottomRef = useInfiniteScroll(
    () => dispatch(getOompaLoompas(currentPage + 1)),
    currentPage,
    totalPages,
    isLoading,
  );

  if (!oompaLoompas.length) {
    dispatch(getOompaLoompas());
  }

  const filteredOompas = useOompaLoompaFilter(searchTerm, oompaLoompas);

  return (
    <div className="container">
      <main>
        <InputSearch setSearchTerm={setSearchTerm} />
        <div className="heading">
          <h1>Find your Oompa Loompa</h1>
          <h2>There are more than 100k</h2>
        </div>
        <div>
          {searchTerm ? (
            filteredOompas?.length ? (
              <div className="card-container">
                {filteredOompas.map((oompaLoompa) => (
                  <Card oompaLoompa={oompaLoompa} key={oompaLoompa.id} />
                ))}
              </div>
            ) : (
              <h4 className="not-found">
                Cannot find Oompa Loompas with term <b>"{searchTerm}"</b>
              </h4>
            )
          ) : (
            <div className="card-container">
              {oompaLoompas.map((oompaLoompa) => (
                <Card oompaLoompa={oompaLoompa} key={oompaLoompa.id} />
              ))}
            </div>
          )}
          <div ref={bottomRef}></div>
        </div>
        {isLoading && <p className="loader">Loading...</p>}
      </main>
    </div>
  );
};

export default ListOompaLoompas;
