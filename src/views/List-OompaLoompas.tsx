import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectOompaLoompas } from '../store/slices/oompa-loompas/oompaLoompasSlice';
import { getOompaLoompas } from '../store/slices/oompa-loompas/thunks';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import Card from '../components/card/Card';
import InputSearch from '../components/inputSearch/InputSearch';
import { useEffect, useState } from 'react';
import { OompaLoompa } from '../types/types';

const ListOompaLoompas = () => {
  const dispatch = useAppDispatch();

  const { isLoading, oompaLoompas, currentPage, totalPages } =
    useAppSelector(selectOompaLoompas);

  const [searchTerm, setSearchTerm] = useState<string>('');

  const bottomRef = useInfiniteScroll(
    () => dispatch(getOompaLoompas(currentPage + 1)),
    currentPage,
    totalPages,
    isLoading,
  );

  const [filteredOompas, setFilteredOompas] = useState<OompaLoompa[] | null>(
    null,
  );

  useEffect(() => {
    if (searchTerm && oompaLoompas.length) {
      const filtered = oompaLoompas.filter((oompa) => {
        const searchText = searchTerm.toLowerCase();
        const oompaName = oompa.first_name.toLowerCase();
        const oompaProfession = oompa.profession.toLowerCase();
        return (
          oompaName.includes(searchText) || oompaProfession.includes(searchText)
        );
      });
      setFilteredOompas(filtered);
    }
  }, [searchTerm, oompaLoompas]);

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
