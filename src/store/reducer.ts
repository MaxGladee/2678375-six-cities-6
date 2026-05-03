import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { User } from '../types/user';
import { Comment } from '../types/comment';
import { AuthorizationStatus } from '../const';
import { TOKEN_KEY } from '../services/api';
import {
  changeCity, loadOffers, setOffersDataLoading, setOffersDataError,
  requireAuthorization, setUser, logout,
  setCurrentOffer, setNearbyOffers, setComments, setOfferLoading, setOfferNotFound,
} from './action';

interface State {
  city: string;
  offers: Offer[];
  isOffersDataLoading: boolean;
  offersDataError: string | null;
  authorizationStatus: AuthorizationStatus;
  user: User | null;
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  comments: Comment[];
  isOfferLoading: boolean;
  isOfferNotFound: boolean;
}

const initialState: State = {
  city: 'Paris',
  offers: [],
  isOffersDataLoading: false,
  offersDataError: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  isOfferLoading: false,
  isOfferNotFound: false,
};

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => { state.city = action.payload; })
    .addCase(loadOffers, (state, action) => { state.offers = action.payload; })
    .addCase(setOffersDataLoading, (state, action) => { state.isOffersDataLoading = action.payload; })
    .addCase(setOffersDataError, (state, action) => { state.offersDataError = action.payload; })
    .addCase(requireAuthorization, (state, action) => { state.authorizationStatus = action.payload; })
    .addCase(setUser, (state, action) => { state.user = action.payload; })
    .addCase(logout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.user = null;
      localStorage.removeItem(TOKEN_KEY);
    })
    .addCase(setCurrentOffer, (state, action) => { state.currentOffer = action.payload; })
    .addCase(setNearbyOffers, (state, action) => { state.nearbyOffers = action.payload; })
    .addCase(setComments, (state, action) => { state.comments = action.payload; })
    .addCase(setOfferLoading, (state, action) => { state.isOfferLoading = action.payload; })
    .addCase(setOfferNotFound, (state, action) => { state.isOfferNotFound = action.payload; });
});

export default appReducer;
