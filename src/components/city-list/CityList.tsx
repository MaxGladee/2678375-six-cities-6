import { useDispatch } from 'react-redux';
import { changeCity } from '../../store/action';

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

interface CityListProps {
  selectedCity: string;
}

function CityList({ selectedCity }: CityListProps): JSX.Element {
  const dispatch = useDispatch();

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li key={city} className="locations__item">
          <a
            className={`locations__item-link tabs__item${city === selectedCity ? ' tabs__item--active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              dispatch(changeCity(city));
            }}
            href="#"
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CityList;
