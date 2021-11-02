import React from 'react'
import {
  Switch,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Switch>
        {/* <Route path="/create-user">
          <FormCreateUser></FormCreateUser>
        </Route>
        <Route path="/create-product">
          <FormCreateProduct></FormCreateProduct>
        </Route> */}
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
