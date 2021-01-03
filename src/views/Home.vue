<template>
  <div class="home">
    <div class="home__container">
      <div class="home__title">Today a READER, tomorrow a LEADER</div>
      <add-book-modal @reload-data="getBooks()" />

      <books-table
        :bookData="this.books"
        @delete-book="deleteBook"
        @edit-book="editBook"
      />

      <b-modal
        v-model="isComponentModalActive"
        has-modal-card
        trap-focus
        aria-role="dialog"
        aria-modal
      >
        <template>
          <edit-book-modal
            :bookObj="editProps"
            @reload-data="getBooks()"
            @close="editProps = null"
          />
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import BooksTable from "@/components/BooksTable";
import AddBookModal from "@/components/AddBookModal";
import EditBookModal from "@/components/EditBookModal";

export default {
  name: "Home",
  components: {
    BooksTable,
    AddBookModal,
    EditBookModal,
  },
  data() {
    return {
      books: [],
      user: "",
      isComponentModalActive: false,
      editProps: null,
    };
  },
  mounted() {
    this.getBooks();
  },
  methods: {
    danger() {
      this.$buefy.toast.open({
        duration: 5000,
        message: "Book has been deleted",
        type: "is-danger",
      });
    },
    async getBooks() {
      const res = await this.$http
        .get("books", {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .json();
      if (res.error) {
        console.log();
      } else {
        this.books = res.data;
        console.log(this.books)
      }
    },
    async deleteBook(books_id) {
      const res = await this.$http
        .delete(`books/${books_id}`, {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .json();
      if (res.error) {
        console.log(res.message);
      } else {
        this.danger();
        this.getBooks();
      }
    },
    editBook(bookObj) {
      console.log(bookObj)
      this.editProps = bookObj;
      this.isComponentModalActive = true;
    },
  },
};
</script>
<style>
.home__title {
  font-size: 36px;
}
.home__container {
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>
