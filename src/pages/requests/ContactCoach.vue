<template>
  <form @submit.prevent="sendMessage">
    <div class="form-control" :class="{invalid: !email.isValid}">
      <label for="email">Email</label>
      <input type="email" id="email" v-model.trim="email.val" @blur="clearValidate('email')">
    </div>
    <div class="form-control" :class="{invalid: !message.isValid}">
      <label for="message">Message</label>
      <textarea rows="5" id="message" v-model.trim="message.val" @blur="clearValidate('message')"></textarea>
    </div>
    <div class="actions">
      <p v-if="!isFormValid">Please, fix the above errors and submit form again</p>
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      error: null,
      email: {
        val: '',
        isValid: true
      },
      message: {
        val: '',
        isValid: true
      },
      isFormValid: true
    }
  },
  methods: {
    clearValidate(input) {
      this[input].isValid = true
    },
    validate() {
      this.isFormValid = true
      if (this.email.val.length < 3 || !this.email.val.includes('@')) {
        this.email.isValid = false
        this.isFormValid = false
      }
      if (this.message.val.length < 10) {
        this.message.isValid = false
        this.isFormValid = false
      }
    },
    async sendMessage() {
      this.validate()
      if (!this.isFormValid) {
        return
      }
      const messageData = {
        email: this.email.val,
        message: this.message.val,
        coachId: this.$route.params.id
      }
      try {
        await this.$store.dispatch('requests/contactCoach', messageData)
      } catch (error) {
        this.error = error.message || 'Something was wrong!'
      }
      this.$router.replace('/coaches')
    }
  }
}
</script>
<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>