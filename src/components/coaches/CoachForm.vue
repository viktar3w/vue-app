<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid: !firstname.isValid}">
      <input type="text" id="firstname" v-model.trim="firstname.val" @blur="clearValidate('firstname')">
      <label for="firstname">Firstname</label>
    </div>
    <div class="form-control" :class="{invalid: !lastname.isValid}">
      <input type="text" id="lastname" v-model.trim="lastname.val" @blur="clearValidate('lastname')">
      <label for="lastname">Lastname</label>
    </div>
    <div class="form-control" :class="{invalid: !description.isValid}">
      <textarea id="description" rows="5" v-model.trim="description.val"
                @blur="clearValidate('description')"></textarea>
      <label for="description">Description</label>
    </div>
    <div class="form-control" :class="{invalid: !rate.isValid}">
      <input type="number" id="hourly-rate" v-model.number="rate.val" @blur="clearValidate('rate')">
      <label for="hourly-rate">Hourly Rate</label>
    </div>
    <div class="form-control" :class="{invalid: !areas.isValid}">
      <h3>Areas of Expertise</h3>
      <div>
        <input type="checkbox" id="frontend" value="frontend" v-model="areas.val" @blur="clearValidate('areas')">
        <label for="frontend">Frontend</label>
      </div>
      <div>
        <input type="checkbox" id="backend" value="backend" v-model="areas.val"  @blur="clearValidate('areas')">
        <label for="backend">Backend</label>
      </div>
      <div>
        <input type="checkbox" id="career" value="career" v-model="areas.val"  @blur="clearValidate('areas')">
        <label for="career">Career</label>
      </div>
    </div>
    <p v-if="!isFormValid">Please, fix the above errors and submit form again</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  name: "CoachForm",
  data() {
    return {
      firstname: {
        val: '',
        isValid: true
      },
      lastname: {
        val: '',
        isValid: true
      },
      description: {
        val: '',
        isValid: true
      },
      rate: {
        val: null,
        isValid: true
      },
      areas: {
        val: [],
        isValid: true
      },
      isFormValid: true
    }
  },
  methods: {
    validate() {
      this.isFormValid = true
      if (this.firstname.val.length < 3) {
        this.firstname.isValid = false
        this.isFormValid = false
      }
      if (this.lastname.val.length < 3) {
        this.lastname.isValid = false
        this.isFormValid = false
      }
      if (this.description.val.length < 5) {
        this.description.isValid = false
        this.isFormValid = false
      }
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false
        this.isFormValid = false
      }
      if (this.areas.val.length === 0) {
        this.areas.isValid = false
        this.isFormValid = false
      }
    },
    clearValidate(input) {
      this[input].isValid = true
    },
    submitForm() {
      this.validate()
      if (!this.isFormValid) {
        return
      }
      const formData = {
        first: this.firstname.val,
        last: this.lastname.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val
      }
      this.$emit('save-data', formData)
    }
  }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>