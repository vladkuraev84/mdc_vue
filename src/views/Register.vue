<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'login'}">
              Have an account?
            </router-link>
            <router-link :to="{name: 'register'}" class="hide">
              Need an account?
            </router-link>
          </p>

          <mcv-validation-errors
              v-if="validationErrorsComp"
              :validationErrors="validationErrorsComp"
          />

          <form class="" @submit.prevent="onSubmit">
            <fieldset >

              <fieldset class="form-group" >
                <input class="form-control form-control-lg" type="text" placeholder="Username" v-model="username">
              </fieldset>

              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="email" placeholder="Email" v-model="email">
              </fieldset>

              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="password">
              </fieldset>

              <button class="btn btn-lg btn-primary pull-xs-right" type="submit" :disabled="isSubmitting">Sign up</button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from "@/components/ValidationErrors";
import {actionTypes} from "@/store/modules/auth";

export default {
  name: 'McvRegister',
  components: {McvValidationErrors},
  data (){
    return {
      email: '',
      password: '',
      username: ''
    }
  },
  computed: {
    isSubmitting() {
      return this.$store.state.auth.isSubmitting
    },
    validationErrorsComp() {
      return this.$store.state.auth.validationErrors
    }
  },
  methods: {
    onSubmit() {
      console.log('submited form')
      this.$store.dispatch(actionTypes.register,
          {
            email: this.email,
            username: this.username,
            password: this.password
          })
          .then(user => {
            console.log('successfully register user', user)
            this.$router.push({name: 'home'})
          })
    }
  }
}
</script>