import { Link } from 'react-router-dom';

const Toolbar = () => {
  return (
    <nav>
      <div className="container">
        <Link to="/">
          <img src={'/public/static/assets/img/logo-umpa-loompa.png'} />
        </Link>
        <ul>
          <li>
            <p>Oompa Loompa's Crew</p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;
