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
      const oompaFirstName = oompa.first_name.toLowerCase();
      const oompaLastName = oompa.last_name.toLowerCase();
      const oompaGender = oompa.gender.toLowerCase();
      const oompaProfession = oompa.profession.toLowerCase();
      return oompaFirstName
        .concat(oompaLastName)
        .concat(oompaProfession)
        .concat(oompaGender)
        .includes(searchText);
    });
  }, [searchTerm, oompaLoompas]);

  return filteredOompas;
};

export default useOompaLoompaFilter;
