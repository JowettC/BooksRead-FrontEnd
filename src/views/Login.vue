<template>
  <div class="Login">
      <login-form/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/login/LoginForm.vue'

export default {
  name: 'Home',
  components: {
      LoginForm
  }
}
</script>
