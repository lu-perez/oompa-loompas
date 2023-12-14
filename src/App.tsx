import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './router/AppRouter';
import Toolbar from './components/nav/Toolbar';
import { useEffect } from 'react';
import { getOompaLoompas } from './store/slices/oompa-loompas/thunks';
import { useAppDispatch } from './store/hooks';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOompaLoompas());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Toolbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
