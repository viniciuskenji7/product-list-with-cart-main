<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import CardsComponents from './CardsComponents.vue';
import type IMenu from '@/interfaces/IMenu';

export default defineComponent({
  name: 'MenuFoods',
  props: {
    menu: { type: Object as PropType<IMenu[]> },
    pratosRemovidosIds: {
      type: Array as PropType<number[]>,
      default: () => []
    }
  },
  emits: ['addToCart', 'removeToCart', 'resetQuantity'],
  components: {
    CardsComponents
  },
})
</script>

<template>
  <section>
    <h1 class="title">Desserts</h1>
    <ul class="menu">
      <li v-for="prato in menu" :key="prato.id">
        <CardsComponents :pratos-removidos-ids="pratosRemovidosIds" @reset-quantity="$emit('resetQuantity', $event)"
          @add-to-cart="$emit('addToCart', $event)" @remove-to-cart="$emit('removeToCart', $event)" :prato="prato" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
h1 {
  margin-bottom: 30px;
}

.menu {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: start;
  gap: 2rem;
  width: 55rem;
  list-style-type: none;
}

@media (max-width: 1280px) {
  .menu {
    width: 35rem;
  }
}

@media (max-width: 500px) {
  .menu {
    flex-direction: column;
  }

  h1 {
    padding: 0 120px;
  }

}
</style>
