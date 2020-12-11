<template>
    <section class="login__section">
    <div class = "card login__form">
        <div class ="login__fields">
            <div class ="login__title"><b>Books Read Login</b></div>
            <br/>
        <b-field label="Username"
            :label-position="labelPosition"
            :type="username_type"
            :message="username_msg">
            <b-input v-model="username_input" maxlength="30"></b-input>
        </b-field>

        <b-field label="Password"
            :label-position="labelPosition"
            :type="password_type"
            :message="password_msg">
            <b-input v-model="password_input" type="password" maxlength="30"></b-input>
        </b-field>
        <b-button type="is-primary" class="login__button" @click="submitForm">Login</b-button>
        <router-link to="/register">
        <b-button type="is-primary" class="login__button" outlined >Register</b-button>
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
            labelPosition: 'on-border',
            username_type:"",
            username_msg:"",
            password_type:"",
            password_msg:"",
            username_input:"test",
            password_input:"",
        }

    },
  name: 'Home',
  methods: {
      danger(message) {
      this.$buefy.toast.open({
        duration: 5000,
        message: message,
        type: "is-danger",
      });
    },
      async submitForm(){
          const res = await this.$http
        .post("api/user/login", {
          json: {
            username: this.username_input,
            password: this.password_input,
          },
        })
        .json();
        if(res.status === "Success"){
            // success
            console.log("success")
            // store token
            const token = res.accessToken;
            this.$store.dispatch("login", token);
            // console.log(this.$store.state.token)
            this.$router.push("/home");
        }
        else{
            this.danger(res.message)
        }
      }
  }
}
</script>
<style>
.login__section{
    position:relative;
    min-height:100vh;
}
.login__button{
    display:inline-block;
}
.login__form{
    width: 500px;
    margin:auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.login__fields{
    padding: 50px;
}
</style>
