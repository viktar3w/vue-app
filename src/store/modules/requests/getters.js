export default {
    requests(state, _, _2, rootGetters) {
        const coachID = rootGetters["auth/userId"]
        return state.requests.filter((req) => req.coachId === coachID)
    },
    hasRequests(_, getters) {
        return getters.requests && getters.requests.length > 0
    }
}