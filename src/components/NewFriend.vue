<template>
  <form @submit.prevent="addNewFriend">
    <div><label>Name<input v-model="name" type="text"></label></div>
    <div><label>Email<input v-model="email" type="email"></label></div>
    <div><label>Phone<input v-model="phone" type="tel"></label></div>
    <div>
      <button>Add New Friend</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "NewFriend",
  emits: ['add-new-friend'],
  data() {
    return {
      name: "",
      email: "",
      phone: ""
    }
  },
  methods: {
    addNewFriend() {
      const friend = {
        name: this.name,
        email: this.email,
        phone: this.phone
      }
      this.$emit('add-new-friend', friend)
      this.name = ""
      this.email = ""
      this.phone = ""

    }
  }
}
</script>

<style scoped>

</style>