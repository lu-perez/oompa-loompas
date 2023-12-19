import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectOompaLoompas } from '../store/slices/oompa-loompas/oompaLoompasSlice';
import { getOompaLoompas } from '../store/slices/oompa-loompas/thunks';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import Card from '../components/card/Card';
import InputSearch from '../components/inputSearch/InputSearch';
import { useState } from 'react';
import useOompaLoompaFilter from '../hooks/useFilter';
import { Labels } from '../config/labels'

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
          <h1>{Labels.findYourOompaLoompa}</h1>
          <h2>{Labels.moreThan100k}</h2>
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
                {Labels.notFound} <b>"{searchTerm}"</b>
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
        {isLoading && <p className="loader">{Labels.loading}</p>}
      </main>
    </div>
  );
};

export default ListOompaLoompas;
