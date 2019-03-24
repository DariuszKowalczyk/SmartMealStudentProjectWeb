// import React from 'react';

import React, { useState } from 'react';

export const LoginContext = React.createContext();

export const LoginProvider = props => {
  const [activeLogin, setLogActive] = useState(true);
  const [activeRegister, setRegActive] = useState(false);
  const changeLoginToActive = () => {
    setLogActive(true);
    setRegActive(false);
  };
  const changeRegisterToAcvite = () => {
    setLogActive(false);
    setRegActive(true);
  };
  return (
    <LoginContext.Provider
      value={{
        activeLogin,
        activeRegister,
        changeLoginToActive,
        changeRegisterToAcvite,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
