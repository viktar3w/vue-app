const firebaseUrl = 'https://identitytoolkit.googleapis.com/v1/'
const signupKey = 'accounts:signUp?key='
const loginKey = 'accounts:signInWithPassword?key='
const apiKey = 'AIzaSyD-JczJrDz2BKlHDFcm2vq9G8xNzpE8SBw'
export default {
    async login(context, payload) {
        const response = await fetch(`${firebaseUrl}${loginKey}${apiKey}`, {
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
            throw new Error(responseData.message || 'Error by "signup" request')
        }
        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        })

    },
    async signup(context, payload) {
        const response = await fetch(`${firebaseUrl}${signupKey}${apiKey}`, {
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
            throw new Error(responseData.message || 'Error by "signup" request')
        }
        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        })
    },
    logout(context) {
        context.commit('setUser', {
            token: null,
            userId: null,
            tokenExpiration: null
        })
    }
}