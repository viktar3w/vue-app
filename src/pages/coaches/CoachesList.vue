<template>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button v-if="!isCoach" link to="/register">Register</base-button>
      </div>
      <ul v-if="hasCoaches">
        <coach-item v-for="coach in filteredCoaches" :key="coach.id"
                    :lastName="coach.lastName"
                    :areas="coach.areas"
                    :id="coach.id"
                    :rate="coach.hourlyRate"
                    :firstName="coach.firstName"></coach-item>
      </ul>
      <h3 v-else>No Coaches List</h3>
    </base-card>
  </section>
</template>
<script>
import CoachItem from "@/components/coaches/CoachItem";
import CoachFilter from "@/components/coaches/CoachFilter";

export default {
  components: {CoachFilter, CoachItem},
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    }
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'] || []
      return coaches.filter((coach) => {
        return (this.activeFilters.frontend && coach.areas.includes('frontend'))
            || (this.activeFilters.backend && coach.areas.includes('backend'))
            || (this.activeFilters.career && coach.areas.includes('career'))
      })
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches']
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach']
    }
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>