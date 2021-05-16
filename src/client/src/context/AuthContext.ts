import {createContext} from 'react'

function noop2(a: any, b: any) {}
function noop() {}

export const AuthContext = createContext({
	token: null,
	userId: null,
	login: noop2,
	logout: noop,
	isAuthenticated: false
})