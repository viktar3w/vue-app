<template>
  <div>
    <base-dialog :show="!!error"
                 title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
          <base-button v-if="!isCoach && !isLoading" link to="/register">Register</base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
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
  </div>
</template>
<script>
import CoachItem from "@/components/coaches/CoachItem";
import CoachFilter from "@/components/coaches/CoachFilter";

export default {
  components: {CoachFilter, CoachItem},
  data() {
    return {
      isLoading: false,
      error: null,
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
      return !this.isLoading && this.$store.getters['coaches/hasCoaches']
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach']
    }
  },
  created() {
    this.loadCoaches()
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true
      try {
        await this.$store.dispatch('coaches/loadCoaches', {forceRefresh: refresh})
      } catch (error) {
        this.error = error.message || 'Something is wrong!'
      }
      this.isLoading = false
    },
    handleError() {
      this.error = null
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