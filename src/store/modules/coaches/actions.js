export default {
    registerCoach(context, coach) {
        const coachData = {
            id: context.rootGetters.userId,
            firstName: coach.first,
            lastName: coach.last,
            areas: coach.areas,
            description: coach.desc,
            hourlyRate: coach.rate
        }
        context.commit('registerCoach', coachData)
    }
}