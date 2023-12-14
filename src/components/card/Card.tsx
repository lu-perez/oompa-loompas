import { OompaLoompa } from '../../types/types';

type CardProps = {
  oompaLoompa: OompaLoompa;
};

const Card = ({ oompaLoompa }: CardProps) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={oompaLoompa.image} alt={oompaLoompa.first_name} />
      </div>
      <div className="card-body">
        <div className="card-title">{oompaLoompa.first_name}</div>
        <div className="card-subtitle">{oompaLoompa.gender}</div>
        <div className="card-subtitle">
          <i>{oompaLoompa.profession}</i>
        </div>
      </div>
    </div>
  );
};

export default Card;
