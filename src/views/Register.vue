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

          <form class="" @submit.prevent="onSubmit">
            <fieldset >

              <fieldset class="form-group" >
                <input class="form-control form-control-lg" type="text" placeholder="Username">
              </fieldset>

              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="email" placeholder="Email">
              </fieldset>

              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password">
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
export default {
  name: 'McvRegister',
  computed: {
    isSubmitting() {
      return this.$store.state.auth.isSubmitting
    }
  },
  methods: {
    onSubmit() {
      console.log('submited form')
      this.$store.dispatch('register')
    }
  }
}
</script>