<template>
  <section class="section">
    <b-button
      type="is-primary"
      size="is-medium"
      @click="isComponentModalActive = true"
      expanded
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
</style>