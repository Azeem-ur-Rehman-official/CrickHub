// Payment
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { loadUser } from './actions/userActions';
import Addblogs from './components/admin/Addblogs';
import AddFAQ from './components/admin/AddFAQ';
import BlogList from './components/admin/BlogList';
// Admin Imports
import Dashboard from './components/admin/Dashboard';
import FAQ from './components/admin/FAQ';
import NewProduct from './components/admin/NewProduct';
import OrdersList from './components/admin/OrdersList';
import ProcessOrder from './components/admin/ProcessOrder';
import ProductReviews from './components/admin/ProductReviews';
import ProductsList from './components/admin/ProductsList';
import SendNotification from './components/admin/SendNotification';
import Updateblog from './components/admin/Updateblog';
import UpdateFaq from './components/admin/UpdateFaq';
import UpdateProduct from './components/admin/UpdateProduct';
import UpdateUser from './components/admin/UpdateUser';
import UsersList from './components/admin/UsersList';
// Cart Imports
import Cart from './components/cart/Cart';
import ConfirmOrder from './components/cart/ConfirmOrder';
import OrderSuccess from './components/cart/OrderSuccess';
import Payment from './components/cart/Payment';
import Shipping from './components/cart/Shipping';
import './components/css/test.css';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
// Order Imports
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';
import BlogPage from './components/pages/BlogPage';
import BookNow from './components/pages/BookNow';
import BlogCardDetail from './components/pages/cards/BlogCardDetail';
import ChattForum from './components/pages/ChattForum';
import ContactUs from './components/pages/ContactUs';
//import pages
import FaqPage from './components/pages/FAQ';
import LivePage from './components/pages/Live/LivePage';
import TournamentSchedule from './components/pages/Live/TournamentSchedule';
import TournamentTeams from './components/pages/Live/TournamentTeams';
import TournamentTeamSquad from './components/pages/Live/TournamentTeamSquad';
import Products from './components/pages/Products';
import SearchedProducts from './components/pages/SearchedProducts';
import ProductDetails from './components/product/ProductDetails';
import ProtectedRoute from './components/route/ProtectedRoute';
//Tournament Dashboard
import tournamentDashboard from './components/tournamentAdmin/Dashboard';
import JoinTournament from './components/tournamentAdmin/JoinTournament';
import AddSchedule from './components/tournamentAdmin/Tournaments/AddSchedule';
import AllTournaments from './components/tournamentAdmin/Tournaments/AllTournaments';
import CreateTeams from './components/tournamentAdmin/Tournaments/CreateTeams';
import CreateTournament from './components/tournamentAdmin/Tournaments/CreateTournament';
import JoinTournamentTeam from './components/tournamentAdmin/Tournaments/JoinTournamentTeam';
import PlayersList from './components/tournamentAdmin/Tournaments/PlayersList';
import StartMatch from './components/tournamentAdmin/Tournaments/StartMatch';
import TeamSchedule from './components/tournamentAdmin/Tournaments/TeamSchedule';
import TeamsList from './components/tournamentAdmin/Tournaments/TeamsList';
import TeamSquad from './components/tournamentAdmin/Tournaments/TeamSquad';
import UpdateSchedule from './components/tournamentAdmin/Tournaments/UpdateSchedule';
import UpdateTeam from './components/tournamentAdmin/Tournaments/UpdateTeam';
import UpdateTournament from './components/tournamentAdmin/Tournaments/UpdateTournament';
import ViewTournament from './components/tournamentAdmin/Tournaments/ViewTournament';
import ProfileForm from './components/tournamentAdmin/UserProfile/UserProfile';
import ForgotPassword from './components/user/ForgotPassword';
// Auth or User imports
import Login from './components/user/Login';
import NewPassword from './components/user/NewPassword';
import Profile from './components/user/Profile';
import Register from './components/user/Register';
import UpdatePassword from './components/user/UpdatePassword';
import UpdateProfile from './components/user/UpdateProfile';
import store from './store';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');

      setStripeApiKey(data.stripeApiKey);
    }

    getStripApiKey();
    Aos.init({
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
      initClassName: 'aos-init', // class applied after initialization
      animatedClassName: 'aos-animate', // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 1500, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom',
    });
  }, []);

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="App">
        <Header />
        <div>
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={SearchedProducts} exact />
          <Route path="/product/:id" component={ProductDetails} exact />
          <Route path="/blogs" component={BlogPage} exact />
          <Route path={'/blog-details/:id'} component={BlogCardDetail} exact />

          <Route path="/cart" component={Cart} exact />
          <Route path="/me/update" component={UpdateProfile} exact />
          <Route path="/discusion" component={ChattForum} exact />
          <Route path="/faq" component={FaqPage} exact />
          <Route path="/booknow" component={BookNow} exact />
          <Route path="/contactus" component={ContactUs} exact />
          <Route path="/products" component={Products} exact />
          <Route path="/tournaments/matches/live" component={LivePage} exact />
          <Route
            path="/tournament/team/schedule/view/:id"
            component={TournamentSchedule}
            exact
          />
          <Route path="/update/schedule/:id" component={UpdateSchedule} exact />
          <Route
            path="/tournament/team/live/teams/:id"
            component={TournamentTeams}
            exact
          />
          <Route
            path="/tournament/live/team/squad/:id"
            component={TournamentTeamSquad}
            exact
          />
          <Route path="/view/tournament/:id" component={ViewTournament} exact />
          <Route path="/view/team/:id" component={TeamsList} exact />
          <Route
            path="/add/tournament/schedules/:id"
            component={AddSchedule}
            exact
          />
          <Route path="/create/teams/:id" component={CreateTeams} exact />
          <Route path="/update/team/:id" component={UpdateTeam} exact />
          <ProtectedRoute path="/shipping" component={Shipping} exact />
          <ProtectedRoute
            path="/tournament/players/profile"
            component={PlayersList}
            exact
          />
          <ProtectedRoute path="/confirm" component={ConfirmOrder} exact />
          <ProtectedRoute path="/success" component={OrderSuccess} exact />
          <ProtectedRoute
            path="/my/alltournaments"
            component={AllTournaments}
            exact
          />
          <ProtectedRoute
            path="/tournament/create"
            component={CreateTournament}
            exact
          />
          <ProtectedRoute
            path="/tournament/team/join/:id"
            component={JoinTournament}
            exact
          />
          <ProtectedRoute
            path="/tournament/team/squad/:id"
            component={TeamSquad}
            exact
          />
          <ProtectedRoute
            path="/create/tournament/schedule/:id"
            component={TeamSchedule}
            exact
          />
          <ProtectedRoute
            path="/tournament/match/start/:id"
            component={StartMatch}
            exact
          />
          <ProtectedRoute
            path="/player/tournament/join"
            component={JoinTournamentTeam}
            exact
          />
          <ProtectedRoute
            path="/update/tournament/:id"
            component={UpdateTournament}
            exact
          />
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          )}

          <Route path="/login" component={Login} exact />

          <Route path="/register" component={Register} exact />
          <Route path="/password/forgot" component={ForgotPassword} exact />
          <Route path="/password/reset/:token" component={NewPassword} exact />
          <ProtectedRoute path="/profile" component={Profile} exact />
          <ProtectedRoute
            path="/profile/update"
            component={UpdateProfile}
            exact
          />
          <ProtectedRoute
            path="/password/update"
            component={UpdatePassword}
            exact
          />
          <ProtectedRoute
            path="/tournament/dashboard"
            component={tournamentDashboard}
            exact
          />
          <ProtectedRoute
            path="/tournament/profile"
            component={ProfileForm}
            exact
          />

          <ProtectedRoute path="/orders/me" component={ListOrders} exact />
          <ProtectedRoute path="/order/:id" component={OrderDetails} exact />
        </div>

        <ProtectedRoute
          path="/dashboard"
          isAdmin={true}
          component={Dashboard}
          exact
        />

        <ProtectedRoute
          path="/admin/notification"
          isAdmin={true}
          component={SendNotification}
          exact
        />
        <ProtectedRoute
          path="/admin/products"
          isAdmin={true}
          component={ProductsList}
          exact
        />
        <ProtectedRoute
          path={'/blog-update/:id'}
          component={Updateblog}
          exact
        />

        <ProtectedRoute path={'/faq-update/:id'} component={UpdateFaq} exact />
        <ProtectedRoute
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
          exact
        />
        <ProtectedRoute
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
          exact
        />

        <ProtectedRoute
          path="/admin/orders"
          isAdmin={true}
          component={OrdersList}
          exact
        />
        <ProtectedRoute
          path="/admin/add/blogs"
          isAdmin={true}
          component={Addblogs}
          exact
        />

        <ProtectedRoute
          path="/admin/blogs"
          isAdmin={true}
          component={BlogList}
          exact
        />
        <ProtectedRoute
          path="/admin/add/faq"
          isAdmin={true}
          component={AddFAQ}
          exact
        />
        <ProtectedRoute
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
          exact
        />
        <ProtectedRoute
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
          exact
        />
        <ProtectedRoute
          path="/admin/faq"
          isAdmin={true}
          component={FAQ}
          exact
        />
        <ProtectedRoute
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
          exact
        />
        <ProtectedRoute
          path="/admin/reviews/:id"
          isAdmin={true}
          component={ProductReviews}
          exact
        />

        {!loading && (!isAuthenticated || user.role !== 'admin') && <Footer />}
      </div>
    </Router>
  );
}

export default App;
