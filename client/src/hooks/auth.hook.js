import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [id, setId] = useState(null)

    const login = useCallback((jwtToken, userId) => {
        setToken(jwtToken)
        setId(userId)

        localStorage.setItem(storageName, JSON.stringify({
            token:jwtToken, id:userId
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if(data && data.token) {
            login(data.token, data.id)
        }
    }, [login])

    return {login, logout, token, id}
}