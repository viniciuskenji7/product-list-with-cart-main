<script lang="ts">
import type IMenu from '@/interfaces/IMenu';
import { Minus, Plus } from 'lucide-vue-next';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  name: 'ButtonCart',
  emits: ['addToCart', 'plusCart', 'minusCart'],
  props: {
    prato: { type: Object as PropType<IMenu>, required: true },
    selected: { type: Boolean, default: false }
  },
  components: {
    Minus,
    Plus
  },
  methods: {
    addToCart() {
      this.$emit('addToCart', this.prato);
    },
    plusCart() {
      this.$emit('plusCart', this.prato.quantity);
    },
    minusCart() {
      this.$emit('minusCart', this.prato.quantity);
    }
  }
})
</script>


<template>
  <button v-if="!selected" type="button" class="button-card" @click="addToCart">
    <img src="/assets/images/icon/icon-add-to-cart.svg" alt="add to cart">
    Add to Cart
  </button>
  <div v-if="selected" type="button" class="button-card-qnt">
    <button @click="minusCart" type="button" class="button-icon">
      <Minus class="icon" />
    </button>
    <span>{{ prato.quantity }}</span>
    <button @click="plusCart" type="button" class="button-icon">
      <Plus class="icon" />
    </button>
  </div>
</template>


<style scoped>
.button-icon {
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.button-card {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5rem;

  position: absolute;
  top: 13rem;
  left: 2.5rem;
  z-index: 50;

  width: 170px;

  padding: 12px;
  border: 1px solid var(--rose-dark);
  background-color: white;
  border-radius: 50px;

  cursor: pointer;

  transition: 0.5s all;
}

.button-card-qnt {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: .5rem;

  position: absolute;
  top: 13rem;
  left: 2.5rem;
  z-index: 50;

  width: 170px;

  padding: 12px;
  border: none;
  background-color: var(--red);
  color: var(--rose-extra-light);
  border-radius: 50px;

  transition: 0.5s all;
}

.icon {
  border: 1px solid var(--rose-extra-light);
  border-radius: 50%;
  transition: .5s;
}

.icon:hover {
  background-color: var(--rose-extra-light);
  color: var(--red);
}

.button-card:hover {
  border: 1px solid var(--red);
  color: var(--red);
}

@media (max-width: 500px) {

  .button-card,
  .button-card-qnt {
    top: 12rem;
    left: 5rem;

    width: 175px;
  }
}
</style>
