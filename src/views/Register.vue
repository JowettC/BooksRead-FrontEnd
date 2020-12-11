<template>
  <div class="Login">
      <sign-up-form/>
  </div>
</template>

<script>
// @ is an alias to /src
import SignUpForm from '@/components/login/SignUpForm.vue'

export default {
  name: 'Home',
  components: {
      SignUpForm
  }
}
</script>
