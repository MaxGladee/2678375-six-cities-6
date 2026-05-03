import OfferCard from './OfferCard';
import { Offer } from '../mocks/offers';

interface OffersListProps {
  offers: Offer[];
  onCardHover: (offerId: string | null) => void;
}

function OffersList({ offers, onCardHover }: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => onCardHover(offer.id)}
          onMouseLeave={() => onCardHover(null)}
        />
      ))}
    </div>
  );
}

export default OffersList;
