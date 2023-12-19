import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './router/AppRouter';
import Toolbar from './components/nav/Toolbar';

function App() {
  return (
    <BrowserRouter>
      <Toolbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
