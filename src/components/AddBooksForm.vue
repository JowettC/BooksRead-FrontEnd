<template>
  <form @submit.prevent="onSubmit">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add Books</p>
        <button type="button" class="delete" @click="$parent.close()" />
      </header>
      <section class="modal-card-body">
        <b-field label="Book Title">
          <b-input v-model="book_name" required></b-input>
        </b-field>
        <b-field label="Book Author">
          <b-input v-model="book_author" required></b-input>
        </b-field>
        <!-- <b-field label="Select Date">
          <b-datetimepicker
            v-model="dateTime"
            append-to-body
            locale="en-SG"
            :timepicker="{ incrementMinutes: 5 }"
          ></b-datetimepicker> -->
      </section>

      <footer class="modal-card-foot">
        <b-button
          type="is-success"
          native-type="submit"
          expanded
          :disabled="!isDataFilled"
        >
          Add
        </b-button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      book_name: null,
      book_author: null,
      dateTime: null,
    };
  },
  computed: {
    isDataFilled() {
      return (
        this.book_name !== null &&
        this.book_author !== null
      );
    },
  },
  methods: {
    success() {
      this.$buefy.toast.open({
        message: "Book Added!",
        type: "is-success",
      });
    },
    async onSubmit() {
      console.log(this.book_name)
      const res = await this.$http
        .post("api/books/create", {
          json: {
            bookName: this.book_name,
            bookAuthor: this.book_author
          },
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .json();
      if (res.error) {
        console.log(res.message);
      } else {
        this.success();
        this.$emit("success");
        this.$emit("close");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>