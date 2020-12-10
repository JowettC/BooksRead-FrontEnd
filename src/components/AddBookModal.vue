<template>
  <section class="section">
    <b-button
      type="is-primary"
      size="is-medium"
      @click="isComponentModalActive = true"
      expanded
      class="add__button"
    >
      Add
    </b-button>
    <b-modal
      v-model="isComponentModalActive"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal
    >
      <template #default="props">
        <add-books-form @success="$emit('reload-data')" @close="props.close"/>
      </template>
    </b-modal>
  </section>
</template>

<script>
import AddBooksForm from "@/components/AddBooksForm";
export default {
  name: "add-workshop-modal",
  components: {
    AddBooksForm,
  },
  data() {
    return {
      isComponentModalActive: false,
    };
  },
};
</script>
<style scoped>
.add__button{
    max-width:1000px;
    margin:auto;
}
</style>