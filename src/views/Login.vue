<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
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

              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="email" placeholder="Email" v-model="email">
              </fieldset>

              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="password">
              </fieldset>

              <button class="btn btn-lg btn-primary pull-xs-right" type="submit" :disabled="isSubmitting">Sign in</button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import McvValidationErrors from "@/components/ValidationErrors";
import {actionTypes} from "@/store/modules/auth";

export default {
  name: 'Mcvlogin',
  components: {McvValidationErrors},
  data (){
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      validationErrorsComp: state => state.auth.validationErrors
    })
    // isSubmitting() {
    //   return this.$store.state.auth.isSubmitting
    // },
    // validationErrorsComp() {
    //   return this.$store.state.auth.validationErrors
    // }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch(actionTypes.login,
          {
            email: this.email,
            password: this.password
          })
      .then(() => {
        this.$router.push({name: 'globalFeed'})
      })
    }
  }
}
</script>