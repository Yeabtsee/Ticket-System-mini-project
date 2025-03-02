import React from "react";

const AuthContext = React.createContext({
  token: null,
  role: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
