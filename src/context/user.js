import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  return <UserContext.Provider>{children}</UserContext.Provider>;
};
