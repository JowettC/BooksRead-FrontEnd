<template>
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
        <b-button type="is-primary" outlined @click="submitForm">Login</b-button>
        </div>
    </div>
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
            console.log(res.message)
            // store token
            const token = res.accessToken;
            console.log(token)
        }
        else{
            console.log(res.message)
        }
      }
  }
}
</script>
<style>
.login__form{
    width: 500px;
    margin:auto;
}
.login__fields{
    padding: 50px;
}
</style>
