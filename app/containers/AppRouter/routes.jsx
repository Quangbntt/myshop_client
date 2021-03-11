import _ from "lodash";
import React from "react";
import { Route, Switch } from "react-router-dom";
import SignIn from "containers/SignIn/Loadable";

import Dashboard from "containers/Dashboard/Loadable";
import Home from "containers/Home/Loadable";
import ProductList from "containers/ProductList/Loadable";
import ProductDetail from "containers/ProductDetail/Loadable";
import Cart from "containers/Cart/Loadable";
import Account from "containers/Account/Loadable";
import Contact from "containers/Contact/Loadable";


import Profile from "containers/Profile/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";
import AuthorizedLayout from "components/Layout/AuthorizedLayout";
import GuestLayout from "components/Layout/GuestLayout";
import Public from "components/Layout/Public";
// Authorized router
export const MainRouter = (props) => {
  return (
    <Switch>
      {_.map(authorizedRoutes, (route, routeId) => {
        return <Route key={routeId} {...route} {...props} />;
      })}
    </Switch>
  );
};
// Các routes được public khi không đăng nhập

export const publicRouter = [
  {
    path: "/signin",
    exact: true,
    layout: GuestLayout,
    component: SignIn,
  },
  
  {
    path: "/",
    layout: AuthorizedLayout,
    component: MainRouter,
  },
];
export const authorizedRoutes = [
  {
    path: "/profile",
    exact: true,
    component: Profile,
  },
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/product-list",
    exact: true,  
    component: ProductList,
  },
  {
    path: "/product-detail",
    exact: true,  
    component: ProductDetail,
  },
  {
    path: "/gio-hang",
    exact: true,  
    component: Cart,
  },
  {
    path: "/lien-he",
    exact: true,  
    component: Contact,
  },
  {
    path: "/tai-khoan",
    exact: true,  
    component: Account,
  },
  
  {
    path: "*",
    exact: true,
    component: NotFoundPage,
  },
];
