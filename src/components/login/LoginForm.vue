<template>
    <div class = "card login__form">
        <div class ="login__fields">
            <div class ="login__title"><h1>Books Read Login</h1></div>
            <br/>
        <b-field label="Username"
            :label-position="labelPosition"
            :type="username_type"
            :message="username_msg">
            <b-input value="johnsilver" maxlength="30"></b-input>
        </b-field>

        <b-field label="Password"
            :label-position="labelPosition"
            :type="password_type"
            :message="password_msg">
            <b-input value="123" type="password" maxlength="30"></b-input>
        </b-field>
        <b-button type="is-primary" outlined>Outlined</b-button>
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
        }

    },
  name: 'Home',
  components: {
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
