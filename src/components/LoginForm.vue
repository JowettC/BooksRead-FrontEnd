<template>
    <div class = login__form>
        <b-field label="Username"
            :label-position="labelPosition"
            type="is-success"
            message="This username is available">
            <b-input value="johnsilver" maxlength="30"></b-input>
        </b-field>

        <b-field label="Password"
            :label-position="labelPosition"
            type="is-warning">
            <b-input value="123" type="password" maxlength="30"></b-input>
            <template slot="message">
                <div>Password is too short</div>
                <div>Password must have at least 8 characters</div>
            </template>
        </b-field>
    </div>
</template>
<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
  }
}
</script>
