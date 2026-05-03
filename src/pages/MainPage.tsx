import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import OffersList from '../components/OffersList';
import Map from '../components/Map';
import CityList from '../components/city-list/CityList';
import SortingOptions, { SortType } from '../components/sorting-options/SortingOptions';
import { RootState } from '../store';
import { City, Point, Points } from '../types/types';
import { Offer } from '../mocks/offers';

function getSortedOffers(offers: Offer[], sortType: SortType): Offer[] {
  switch (sortType) {
    case SortType.PriceLowToHigh:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortType.PriceHighToLow:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortType.TopRated:
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
}

function MainPage(): JSX.Element {
  const selectedCity = useSelector((state: RootState) => state.city);
  const allOffers = useSelector((state: RootState) => state.offers);

  const [currentSort, setCurrentSort] = useState<SortType>(SortType.Popular);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const cityOffers = allOffers.filter((offer) => offer.city === selectedCity);
  const sortedOffers = getSortedOffers(cityOffers, currentSort);

  const cityCenter: City = {
    lat: cityOffers[0]?.location.latitude ?? 48.85341,
    lng: cityOffers[0]?.location.longitude ?? 2.3488,
  };

  const points: Points = cityOffers.map((offer) => ({
    lat: offer.location.latitude,
    lng: offer.location.longitude,
    title: offer.title,
  }));

  const activeOffer = cityOffers.find((offer) => offer.id === activeOfferId);
  const selectedPoint: Point | undefined = activeOffer
    ? { lat: activeOffer.location.latitude, lng: activeOffer.location.longitude, title: activeOffer.title }
    : undefined;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList selectedCity={selectedCity} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cityOffers.length} places to stay in {selectedCity}</b>
              <SortingOptions currentSort={currentSort} onSortChange={setCurrentSort} />
              <OffersList offers={sortedOffers} onCardHover={setActiveOfferId} />
            </section>
            <div className="cities__right-section">
              <Map city={cityCenter} points={points} selectedPoint={selectedPoint} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
