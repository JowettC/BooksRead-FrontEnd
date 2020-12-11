<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item >
                <b>BOOOKIE</b>
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="#">
                <router-link to="/">Home</router-link>
            </b-navbar-item>
            <b-navbar-item href="#">
                <router-link to="/Progress">Your Progress</router-link>
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-primary"  @click="logout">
                        <strong>Log Out</strong>
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>
<script>
export default {
  name: "nav-bar",
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.is-primary{
  margin:auto;
}
</style>
