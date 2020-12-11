<template>
  <section class="signUp__section">
    <div class="card signUp__form">
      <div class="signUp__fields">
        <div class="signUp__title"><b>Books Read Register</b></div>
        <br />
        <b-field
          label="Username"
          :label-position="labelPosition"
          :type="username_type"
          :message="username_msg"
        >
          <b-input v-model="username_input" maxlength="30"></b-input>
        </b-field>

        <b-field
          label="Password"
          :label-position="labelPosition"
          :type="password_type"
          :message="password_msg"
        >
          <b-input
            v-model="password_input"
            type="password"
            maxlength="30"
          ></b-input>
        </b-field>
        <b-field
          label="Password Re-Type"
          :label-position="labelPosition"
          :type="password_type"
          :message="password_msg"
        >
          <b-input
            v-model="password2_input"
            type="password"
            maxlength="30"
          ></b-input>
        </b-field>

        <b-button type="is-primary" class="signUp__button" @click="submitForm"
          >Register</b-button
        >

        <router-link to="/">
          <b-button type="is-primary" class="signUp__button" outlined
            >Back to Login</b-button
          >
        </router-link>
      </div>
    </div>
  </section>
</template>
<script>
// @ is an alias to /src

export default {
  data() {
    return {
      labelPosition: "on-border",
      username_type: "",
      username_msg: "",
      password_type: "",
      password_msg: "",
      username_input: "test",
      password_input: "",
      password2_input: "",
    };
  },
  name: "Home",
  methods: {
    danger(message) {
      this.$buefy.toast.open({
        duration: 1000,
        message: message,
        type: "is-danger",
      });
    },
    success(message) {
      this.$buefy.toast.open({
        duration: 1000,
        message: message,
        type: "is-success",
      });
    },
    async submitForm() {
      if (this.password_input === this.password2_input) {
        const res = await this.$http
          .post("api/user/register", {
            json: {
              username: this.username_input,
              password: this.password_input,
            },
          })
          .json();
        if (res.error) {
          this.danger("User name already exist!");
        } else {
          // success
          await this.success(
            "Successfully registered, Redirecting to Login Page"
          );
          // store token
          // console.log(this.$store.state.token)
          this.$router.push("/");

          // this.$router.push("/home");
        }
      } else {
        this.danger("Passwords Doesn't Match");
      }
    },
  },
};
</script>
<style>
.signUp__form{

}
.signUp__button {
  display: inline-block;
}
.signUp__form {
  width: 500px;
    margin:auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.signUp__fields {
  padding: 50px;
}
</style>
