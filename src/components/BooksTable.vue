<template>
<div class ="books__table">
  <b-table :data="bookData"  detail-key="title">
    <b-table-column field="book_name" label="Title" v-slot="props">
      {{ props.row.title }}
    </b-table-column>
    <b-table-column field="book_author" label="Author" v-slot="props">
      {{ props.row.author }}
    </b-table-column>
    <b-table-column field="date_created" label="DateCreated" v-slot="props">
      {{ props.row.date }}
    </b-table-column>
    <b-table-column field="actions" label="Actions" v-slot="props">
      <div class="buttons">
        <b-button
          type="is-danger"
          size="is-small"
          icon-right="trash"
          @click="deleteDialog(props.row)"
        />
        <b-button
          type="is-warning"
          size="is-small"
          icon-right="edit"
          @click="editDialog(props.row)"
        />
      </div>
    </b-table-column>
    
  </b-table>
  </div>
</template>

<script>
export default {
  props: {
    bookData: {
      type: Array,
      required: true,
      default: () => {
        return new Array();
      },
    },
  },
  methods: {
    deleteDialog(book) {
      this.$buefy.dialog.confirm({
        title: "Deleting Book",
        message:
          "Are you sure you want to delete <b>" + book.title + "</b>?",
        confirmText: "Delete",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => this.$emit("delete-book", book._id),
      });
    },
    editDialog(book) {
        this.$emit("edit-book", book)
    },
  },
};
</script>

<style scoped>
.books__table{
    margin:auto;
    max-width:1000px;
    text-align:left;
}
</style>