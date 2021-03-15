<template>
    <ul class="error-messages">
      <li v-for="(errorMessage, idx) in errorMessages" :key="idx">
        {{errorMessage}}
      </li>
    </ul>
</template>

<script>
export default {
  name: 'McvValidationErrors',
  props: {
    validationErrors: {
      type: Object,
      required: true
    }
  },
  computed: {
    errorMessages() {
      // console.log('Error:', this.validationErrors)
      // return ['Email cant be blank', 'Password cant be blank']
      return Object.keys(this.validationErrors).map(name => {
        const messages = this.validationErrors[name].join(', ')
        return `${name} ${messages}`
      })
    }
  }
}
</script>
