import { useState } from 'react';

export enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

const SORT_TYPES = Object.values(SortType);

interface SortingOptionsProps {
  currentSort: SortType;
  onSortChange: (sort: SortType) => void;
}

function SortingOptions({ currentSort, onSortChange }: SortingOptionsProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use href="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {SORT_TYPES.map((sort) => (
            <li
              key={sort}
              className={`places__option${sort === currentSort ? ' places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => {
                onSortChange(sort);
                setIsOpen(false);
              }}
            >
              {sort}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default SortingOptions;
