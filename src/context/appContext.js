import React from 'react'

export const AppContext = React.createContext({
  currentUser: null,
  setCurrentUser: () => {},
  isLogin: false,
  setIsLogin: () => {},
})
