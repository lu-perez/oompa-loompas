import { useMemo } from 'react';
import { FilteredOompaLoompa } from '../types/types';

const useOompaLoompaFilter = (
  searchTerm: string,
  oompaLoompas: FilteredOompaLoompa[],
) => {
  const filteredOompas = useMemo(() => {
    if (!searchTerm) {
      return oompaLoompas;
    }
    return oompaLoompas.filter((oompa: FilteredOompaLoompa) => {
      const searchText = searchTerm.toLowerCase();
      const oompaName = oompa.first_name.toLowerCase();
      const oompaProfession = oompa.profession.toLowerCase();
      return oompaName.concat(oompaProfession).includes(searchText);
    });
  }, [searchTerm, oompaLoompas]);

  return filteredOompas;
};

export default useOompaLoompaFilter;
