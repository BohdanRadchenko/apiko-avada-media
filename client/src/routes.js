import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {
  AsyncRegister,
  AsyncLogin,
  AsyncReset,
  AsyncHome,
  AsyncFavorite,
  AsyncCreate,
  AsyncEdit,
  AsyncProduct, AsyncProfile, AsyncInbox
} from "./async.routes";

export const useRoutes = () => {
  return (
    <div>
      <Switch>
          <Route path="/register" exact >
          <AsyncRegister/>
        </Route>
        <Route path="/login" exact>
          <AsyncLogin/>
        </Route>
        <Route path="/reset" exact>
          <AsyncReset/>
        </Route>
        <Route path="/home" exact>
          <AsyncHome/>
        </Route>
        <Route path="/product/favorite" exact>
          <AsyncFavorite/>
        </Route>
        <Route path="/product/:id">
          <AsyncProduct/>
        </Route>
        <Route path="/create" exact>
          <AsyncCreate/>
        </Route>
        <Route path="/profile/edit" exact>
          <AsyncEdit/>
        </Route>
        <Route path="/profile/:id">
          <AsyncProfile/>
        </Route>
        <Route path="/inbox" exact>
          <AsyncInbox/>
        </Route>
        <Redirect to="/home"/>
      </Switch>
    </div>
  )
};