const firebaseUrl = 'https://identitytoolkit.googleapis.com/v1/'
const signupKey = 'accounts:signUp?key='
const loginKey = 'accounts:signInWithPassword?key='
const apiKey = 'AIzaSyD-JczJrDz2BKlHDFcm2vq9G8xNzpE8SBw'
const lsTokenKey = 'token'
const lsUserIdKey = 'userId'
const lsTokenExpirationKey = 'expiration'
let timer
export default {
    async login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            url: `${firebaseUrl}${loginKey}${apiKey}`,
            errMessage: 'Error by "login" request'
        })
    },
    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            url: `${firebaseUrl}${signupKey}${apiKey}`,
            errMessage: 'Error by "signup" request'
        })
    },
    async auth(context, payload) {
        const response = await fetch(payload.url, {
                method: "POST",
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                })
            }
        )
        const responseData = await response.json()
        if (!response.ok) {
            throw new Error(responseData.message || payload.errMessage)
        }
        const expiresIn = +responseData.expiresIn * 1000
        // const expiresIn = 3000 // ToDo: For testing
        const expirationDate = new Date().getTime() + expiresIn

        localStorage.setItem(lsTokenKey, responseData.idToken)
        localStorage.setItem(lsUserIdKey, responseData.localId)
        localStorage.setItem(lsTokenExpirationKey, expirationDate)

        timer = setTimeout(() => {
            context.dispatch("autoLogout")
        }, expiresIn)

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId
        })
    },
    tryLogin(context) {
        const token = localStorage.getItem(lsTokenKey)
        const userId = localStorage.getItem(lsUserIdKey)
        if (!token || !userId) {
            return
        }
        const tokenExpiration = localStorage.getItem(lsTokenExpirationKey)
        const expiresIn = +tokenExpiration - (new Date().getTime())
        if (expiresIn < 0) {
            return;
        }

        timer = setTimeout(() => {
            context.dispatch("autoLogout")
        }, expiresIn)

        context.commit('setUser', {
            token: token,
            userId: userId
        })
    },
    logout(context) {
        localStorage.removeItem(lsTokenKey)
        localStorage.removeItem(lsUserIdKey)
        localStorage.removeItem(lsTokenExpirationKey)
        clearTimeout(timer)
        context.commit('setUser', {
            token: null,
            userId: null
        })
    },
    autoLogout(context) {
        context.dispatch("logout")
        context.commit("setAutoLogout", true)
    }
}