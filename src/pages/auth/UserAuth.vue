<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-spinner v-if="isLoading"></base-spinner>
    <base-card>
      <form @submit.prevent="sendForm">
        <div class="form-control" :class="{invalid: !email.isValid}">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email.val" @blur="clearValidate('email')">
        </div>
        <div class="form-control" :class="{invalid: !password.isValid}">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password.val" @blur="clearValidate('password')">
        </div>
        <p v-if="!isValidForm">Check fields on errors!</p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaption }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
const loginMode = 'login'
const signupMode = 'signup'
export default {
  name: "UserAuth",
  data() {
    return {
      email: {
        val: '',
        isValid: true
      },
      password: {
        val: '',
        isValid: true
      },
      isValidForm: true,
      mode: loginMode,
      error: null,
      isLoading: false
    }
  },
  computed: {
    submitButtonCaption() {
      return (this.mode === loginMode) ? "Login" : "Signup"
    },
    switchModeButtonCaption() {
      return (this.mode === loginMode) ? "Signup instead" : "Login instead"
    },
  },
  methods: {
    clearValidate(input) {
      this[input].isValid = true
    },
    validate() {
      this.isValidForm = true
      if (!this.email.val || this.email.val.length < 5 || !this.email.val.includes("@")) {
        this.email.isValid = false
        this.isValidForm = false
      }
      if (!this.password.val || this.password.val.length < 7) {
        this.password.isValid = false
        this.isValidForm = false
      }
    },
    async sendForm() {
      this.validate()
      if (!this.isValidForm) {
        return
      }
      this.isLoading = true
      try {
        let dispatch = (this.mode !== loginMode) ? "auth/signup" : "auth/login"
        await this.$store.dispatch(dispatch, {
          email: this.email.val,
          password: this.password.val
        })
        const redirectUrl = "/" + (this.$route.query.redirect || 'coaches')
        this.$router.replace(redirectUrl)
      } catch (e) {
        this.error = e.message || "Something was wrong!!!"
      }
      this.isLoading = false
    },
    switchAuthMode() {
      if (this.mode === loginMode) {
        this.mode = signupMode
      } else {
        this.mode = loginMode
      }
    },
    handleError() {
      this.error = null
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