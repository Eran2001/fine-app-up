import React from "react";
import { Route, Redirect } from "react-router-dom";

const PostOfficeProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/post-office-login" />
        )
      }
    />
  );
};

export default PostOfficeProtectedRoute;
