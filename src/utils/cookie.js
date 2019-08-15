import Cookies from 'js-cookie'

const TokenKey = 'tokenkey-7d3e985ecfe08ce19bb1f7dd12a0923b'

export function getToken(key) {
    return Cookies.get(key || TokenKey)
}

export function setToken(key, token) {
    return Cookies.set(key || TokenKey, token)
}

export function removeToken(key) {
    return Cookies.remove(key || TokenKey)
}