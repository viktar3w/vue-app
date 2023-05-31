<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>{{ fullRate }}</h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2>Interested? Reach out now!</h2>
        <base-button link :to="contactUrl">Contact</base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge v-for="area in areas"
                  :key="area" :type="area" :title="area"></base-badge>
      <p>{{ description }}</p>
    </base-card>
  </section>
</template>
<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: null
    }
  },
  computed: {
    fullName() {
      if (!this.selectedCoach) {
        return ''
      }
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`
    },
    fullRate() {
      if (!this.selectedCoach) {
        return ''
      }
      return `$${this.selectedCoach.hourlyRate}/hour`
    },
    contactUrl() {
      return `${this.$route.path}/${this.id}/contact`
    },
    description() {
      if (!this.selectedCoach) {
        return ''
      }
      return this.selectedCoach.description
    },
    areas() {
      if (!this.selectedCoach) {
        return ''
      }
      return this.selectedCoach.areas
    }
  },
  created() {
    const coaches = this.$store.getters['coaches/coaches']
    if (!coaches || coaches.length === 0) {
      return
    }
    this.selectedCoach = coaches.find((coach) => coach.id === this.id)
  }
}
</script>