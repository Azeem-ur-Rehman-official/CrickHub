import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from './reducers/orderReducers';
import {
  newPlayerReducer,
  playerDetailsReducer,
  playerReducer,
  playersReducer,
} from './reducers/playerReducers';
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
  productsReducer,
  reviewReducer,
} from './reducers/productReducers';
import {
  newScheduleReducer,
  scheduleDetailsReducer,
  scheduleReducer,
  schedulesReducer,
} from './reducers/scheduleReducer';
import {
  newTeamReducer,
  teamDetailsReducer,
  teamReducer,
  teamsReducer,
} from './reducers/teamReducer';
import {
  newTournamentReducer,
  tournamentDetailsReducer,
  tournamentReducer,
  tournamentsReducer,
} from './reducers/tournamentReducers';
import {
  allUsersReducer,
  authReducer,
  forgotPasswordReducer,
  userDetailsReducer,
  userReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  Tournaments: tournamentsReducer,
  Tournament: tournamentReducer,
  newTournament: newTournamentReducer,
  TournamentDetail: tournamentDetailsReducer,
  Players: playersReducer,
  Player: playerReducer,
  newPlayer: newPlayerReducer,
  PlayerDetail: playerDetailsReducer,
  Teams: teamsReducer,
  Team: teamReducer,
  newTeam: newTeamReducer,
  TeamDetail: teamDetailsReducer,
  newSchedule: newScheduleReducer,
  Schedules: schedulesReducer,
  Schedule: scheduleReducer,
  ScheduleDetail: scheduleDetailsReducer,
  products: productsReducer,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  product: productReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  auth: authReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  allOrders: allOrdersReducer,
  orderDetails: orderDetailsReducer,
  order: orderReducer,
  newReview: newReviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  },
};

const middlware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
