import { createContext, useContext, useReducer } from 'react'
import { userReducer } from '../reducer/userReducer'

const userContext = createContext()
const useUser = () => useContext(userContext)

const UserProvider = ({ children }) => {
  const [userDetails, userDispatch] = useReducer(userReducer, {
    userName: '',
    userCity: '',
    latitude: "28.6139",
    longitude: "77.2090",
  })

  return (
    <userContext.Provider value={{ userDetails, userDispatch }}>
      {children}
    </userContext.Provider>
  )
}

export { UserProvider, useUser }