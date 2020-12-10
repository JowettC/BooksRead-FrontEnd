<template>
  <div class="home">
    <div class="home__container">
      <div class="home__title">Today a READER, tomorrow a LEADER</div>
      <books-table :bookData="this.books" />
    </div>
  </div>
</template>

<script>
import BooksTable from "@/components/BooksTable";

export default {
  name: "Home",
  components: {
    BooksTable,
  },
  data() {
    return {
      books: [],
      user: "",
      // isComponentModalActive: false,
      // editProps: null,
    };
  },
  mounted() {
    this.getBooks();
  },
  methods: {
    async getBooks() {
      const res = await this.$http
        .get("api/books", {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .json();
      if (res.error) {
        console.log();
      } else {
        this.books = res;
      }
    },
  },
};
</script>
<style>
.home__title {
  font-size: 36px;
  padding-bottom:50px;
}
.home__container{
  padding-top:50px;
}
</style>
