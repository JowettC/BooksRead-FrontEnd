<template>
<div class ="books__table">
  <b-table :data="bookData" detailed detail-key="title">
    <b-table-column field="book_name" label="Title" v-slot="props">
      {{ props.row.book_name }}
    </b-table-column>
    <b-table-column field="book_author" label="Author" v-slot="props">
      {{ props.row.book_author }}
    </b-table-column>
    <b-table-column field="date_created" label="DateCreated" v-slot="props">
      {{ props.row.date_created }}
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
          @click="$emit('edit-ws', props.row)"
        />
      </div>
    </b-table-column>
    <template slot="detail" slot-scope="props">
      <div class="content">
        <h3>Description</h3>
        <p>
          {{ props.row.description }}
        </p>
      </div>
    </template>
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
    deleteDialog(workshop) {
      this.$buefy.dialog.confirm({
        title: "Deleting Workshop",
        message:
          "Are you sure you want to <b>delete " + workshop.title + "</b>?",
        confirmText: "Confirm",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => this.$emit("deleteWs", workshop.workshopId),
      });
    },
    editDialog(workshop) {
      this.$emit("editWS", workshop);
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