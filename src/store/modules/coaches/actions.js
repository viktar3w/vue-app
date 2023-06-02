const firebaseUrl = 'https://vue-http-demo-ac11d-default-rtdb.europe-west1.firebasedatabase.app/coaches'
export default {
    async registerCoach(context, coach) {
        const userId = context.rootGetters["auth/userId"]
        const token = context.rootGetters["auth/token"]
        const coachData = {
            firstName: coach.first,
            lastName: coach.last,
            areas: coach.areas,
            description: coach.desc,
            hourlyRate: coach.rate
        }
        const response = await fetch(`${firebaseUrl}/${userId}.json?auth=${token}`, {
            method: "PUT",
            body: JSON.stringify(coachData)
        })
        const responseData = await response.json()
        if (!response.ok) {
            throw new Error(responseData.message || "Failed to fetch!")
        }

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        })
    },
    async loadCoaches(context, payload) {
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return
        }
        const response = await fetch(`${firebaseUrl}.json`,)
        const responseData = await response.json()
        if (!response.ok) {
            throw new Error(responseData.message || "Failed to fetch!")
        }
        const coaches = []
        let coach
        for (let key in responseData) {
            coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                areas: responseData[key].areas,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate
            }
            coaches.push(coach)
        }
        context.commit('setCoaches', coaches)
        context.commit('setFetchTimestamp')
    }
}