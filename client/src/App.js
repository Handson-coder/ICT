import React from 'react'
import {
  Switch,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NowPlaying from './pages/NowPlaying'
import DetailMovie from './pages/DetailMovie';
import Favourites from './pages/Favourites';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Switch>
        <Route path="/movies/:id">
          <DetailMovie></DetailMovie>
        </Route>
        <Route path="/favourites">
          <Favourites></Favourites>
        </Route>
        <Route path="/now-playing">
          <NowPlaying></NowPlaying>
        </Route>
        <Route path="/sign-up">
          <SignUp></SignUp>
        </Route>
        <Route path="/sign-in">
          <SignIn></SignIn>
        </Route>
        <Route path="/">
          <LandingPage></LandingPage>
        </Route>
      </Switch>
    </>
  );
}

export default App;
