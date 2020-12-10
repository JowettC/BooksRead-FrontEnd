<template>
  <form @submit.prevent="onSubmit">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Books</p>
        <button type="button" class="delete" @click="$parent.close" />
      </header>
      <section class="modal-card-body">
        <!-- <b-field label="Select Start Datetime">
          <b-datetimepicker
            v-model="dateTime"
            append-to-body
            locale="en-SG"
            :timepicker="{ incrementMinutes: 5 }"
          ></b-datetimepicker>
        </b-field> -->
        <b-field label="Book Title">
          <b-input v-model="book_name" required></b-input>
        </b-field>
        <b-field label="Book Author">
          <b-input v-model="book_author" required></b-input>
        </b-field>
      </section>

      <footer class="modal-card-foot">
        <b-button
          type="is-success"
          native-type="submit"
          expanded
          :disabled="!isDataFilled"
        >
          Edit
        </b-button>
      </footer>
    </div>
  </form>
</template>

<script>
// import * as dayjs from "dayjs";
export default {
  props: {
    bookObj: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      book_name: null,
      book_author: null,
    };
  },
  mounted() {
    this.book_name = this.bookObj.book_name;
    this.book_author = this.bookObj.book_author;
  },
  computed: {
    isDataFilled() {
      return (
        this.title !== null &&
        this.description !== null &&
        this.quantity !== null &&
        this.location !== null &&
        this.dateTime !== null &&
        this.endDateTime !== null
      );
    },
  },
  methods: {
    success() {
      this.$buefy.toast.open({
        message: "Book Edited!",
        type: "is-success",
      });
    },
    async onSubmit() {
      const res = await this.$http
        .post("api/books/edit", {
          json: {
            books_id: this.bookObj.books_id,
            bookName: this.book_name,
            bookAuthor: this.book_author,
            // datetime: dayjs(this.dateTime).format(),
            // endDateTime: dayjs(this.endDateTime).format(),
          },
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .json();
      if (res.error) {
        console.log(res.message);
      } else {
        this.success();
        this.$emit("reload-data")
        this.$parent.close();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>