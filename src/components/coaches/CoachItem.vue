<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>{{ rate }}</h4>
    <div class="area">
      <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
    </div>
    <div class="actions">
      <base-button mode="outline" link :to="contactUrl">Contact</base-button>
      <base-button link :to="viewDetailUrl">Detail</base-button>
    </div>
  </li>
</template>

<script>
export default {
  name: "CoachItem",
  props: ['firstName', 'lastName', 'description', 'rate', 'areas', 'id'],
  computed: {
    contactUrl() {
      return this.$route.path + "/" + this.id + "/contact"
    },
    viewDetailUrl() {
      return this.$route.path + "/" + this.id
    },
    fullName() {
      return this.firstName + ' ' + this.lastName
    },
  }
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>