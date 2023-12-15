import { Route, Routes } from 'react-router-dom';
import ListOompaLoompas from '../views/List-OompaLoompas';
import DetailOompaLoompa from '../views/Detail-OompaLoompa';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ListOompaLoompas />} />
      <Route path="/:id" element={<DetailOompaLoompa />} />
    </Routes>
  );
};

export default AppRouter;
