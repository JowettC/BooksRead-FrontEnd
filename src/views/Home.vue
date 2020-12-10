<template>
  <div class="home">
    <div class="home__container">
      <div class="home__title">Today a READER, tomorrow a LEADER</div>
      <add-book-modal @reload-data="getBooks()"/>
      <books-table :bookData="this.books" />
    </div>
  </div>
</template>

<script>
import BooksTable from "@/components/BooksTable";
import AddBookModal from '@/components/AddBookModal';

export default {
  name: "Home",
  components: {
    BooksTable,
    AddBookModal
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
