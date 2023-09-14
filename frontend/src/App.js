import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import UsersPage from './components/UsersPage/UsersPage';
import HeadNav from './components/HeadNav/HeadNav';
import Listings from './components/Listings/Listings';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import'./App.css';
import Favorites from './components/Favorites/Favorites';
import Search from './components/Search/Search';
import ListingDetailsPage from './components/Listings/ListingDetailsPage';
import CreateListingPage from './components/Listings/CreateListing';
import EditProfile from './components/UsersPage/EditProfile';
import EditListingPage from './components/Listings/EditListingForm';
import Forum from './components/Forum/Forum';
import ContactUs from './components/ContactUs/ContactUs';
import Inbox from './components/Message/Inbox';
import Conversation from './components/Message/Conversation';
import NewConversation from './components/Message/NewConversation';
import LogoutPage from './components/LogoutPage/LogoutPage'; 
import { logout } from './store/session';
import { Link } from 'react-router-dom';


const App = () => {

  const dispatch = useDispatch();
  const logoutTimer = useRef(null);

  const resetTimer = () => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }
    logoutTimer.current = setTimeout(() => {
      console.log('Auto-logging out due to inactivity...');
      dispatch(logout()); // Dispatch your logout action
    }, 300000); // 300000ms = 5 minutes
  };

  useEffect(() => {
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);

    resetTimer(); // Initialize the timer for the first time

    return () => {
      if (logoutTimer.current) {
        clearTimeout(logoutTimer.current);
      }
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, []);

  
  return (
    <Router>
      <Route path="/" component={({ location }) => (
        (location.pathname !== "/" && location.pathname !=="/contact-us") ? <HeadNav /> : null
      )}/>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/listings" component={Listings} />
        <Route exact path="/listings/:id" component={ListingDetailsPage} />
        <Route exact path="/create-listing" component={CreateListingPage} />
        <Route exact path="/listings/:id/edit" component={EditListingPage} />
        <Route exact path="/users/:userId" component={UsersPage} />
        <Route exact path="/users/:userId/edit" component={EditProfile} />
        <Route exact path="/favorites" component={Favorites} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/inbox" component={Inbox} />
        <Route exact path="/conversation/:userName/:userId" component={Conversation} />
        <Route exact path="/start-new-conversation" component={NewConversation} />
        <Route exact path="/forum" component={Forum} />
        <Route exact path="/contact-us" component={ContactUs} />
        <Route exact path="/logout" component={LogoutPage} />
        <Redirect to="/"/>
      </Switch>
  <footer id="footer">
        <a className="github-links" href="/contact-us" ><i className="fa fa-diamond" aria-hidden="true"></i></a>
    <div className='footer-c'>
        <p><strong>© 2023 by F.A.  Imperial Estates. All rights reserved.</strong></p>
    </div>
    <div className='Contact-us-buts'>
      {/* <a className="github-links" href="https://github.com/Farivar90/VelvetVenues" ><i className="fa fa-user-circle" aria-hidden="true"></i></a> */}
    </div>
  </footer>
    </Router>
  );
};

export default App;
