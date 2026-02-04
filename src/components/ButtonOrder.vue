<script lang="ts">
import { defineComponent } from 'vue';



export default defineComponent({
  name: 'ButtonOrder',
  props: {
    textButton: {
      type: String,
      required: true
    }
  }

})
</script>


<template>
  <button type="button" class="order-confirm-button">
    {{ textButton }}
  </button>
</template>


<style scoped>
.order-confirm-button {
  width: 100%;
  padding: 15px;
  color: var(--rose-extra-light);
  font-size: 1.3rem;
  font-weight: 600;
  background-color: var(--red);
  border: none;
  border-radius: 30px;
  cursor: pointer;
}

.order-confirm-button:hover {
  background-color: var(--red-hover);
}
</style>
