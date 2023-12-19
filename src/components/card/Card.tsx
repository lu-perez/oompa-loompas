import { Link } from 'react-router-dom';
import { getGenderLabel } from '../../helpers/getGenderLabel';
import { FilteredOompaLoompa } from '../../types/types';

type CardProps = {
  oompaLoompa: FilteredOompaLoompa;
};

const Card = ({ oompaLoompa }: CardProps) => {
  return (
    <Link to={`/${oompaLoompa.id}`}>
      <div className="card">
        <div className="card-image">
          <img src={oompaLoompa.image} alt={oompaLoompa.first_name} />
        </div>
        <div className="card-body">
          <div className="card-title">{oompaLoompa.first_name}</div>
          <div className="card-subtitle">
            {getGenderLabel(oompaLoompa.gender)}
          </div>
          <div className="card-subtitle">
            <i>{oompaLoompa.profession}</i>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
