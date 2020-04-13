import {createContext} from 'react'
const noop = () => {}

export const AuthContext  = createContext({
    token : null,
    id: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})