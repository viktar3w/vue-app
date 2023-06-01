const firebaseUrl = 'https://vue-http-demo-ac11d-default-rtdb.europe-west1.firebasedatabase.app/requests'
export default {
    async contactCoach(context, payload) {
        const newRequest = {
            userEmail: payload.email,
            message: payload.message,
        }
        const request = await fetch(`${firebaseUrl}/${payload.coachId}.json`, {
            method: "POST",
            body: JSON.stringify(newRequest)
        })
        const responseData = await request.json()
        if (!request.ok) {
            throw new Error(responseData.message || 'Fetch "contactCoach" was failed!')
        }
        newRequest.id = responseData.name
        newRequest.coachId = payload.coachId
        context.commit('addRequest', newRequest)
    },
    async fetchRequests(context) {
        const couchId = context.rootGetters.userId
        const request = await fetch(`${firebaseUrl}/${couchId}.json`)
        const responseData = await request.json()
        if (!request.ok) {
            throw new Error(responseData.message || 'Fetch "fetchRequests" was failed!')
        }
        const requests = []
        for (let key in responseData) {
            requests.push({
                id: key,
                email: responseData[key].userEmail,
                coachId: couchId,
                message: responseData[key].message,
            })
        }
        context.commit('setRequests', requests)
    }
}