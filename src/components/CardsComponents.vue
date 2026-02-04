<script lang="ts">
import type IMenu from '@/interfaces/IMenu';
import { defineComponent, type PropType } from 'vue';
import ButtonCart from './ButtonCart.vue';

export default defineComponent({
  name: 'CardsComponents',
  components: {
    ButtonCart,
  },
  props: {
    prato: { type: Object as PropType<IMenu>, required: true },
    pratosRemovidosIds: {
      type: Array as PropType<number[]>,
      default: () => []
    },
  },
  data() {
    return {
      selected: false,
    }
  },

  computed: {
    classObject() {
      return {
        selected: this.selected
      }
    }
  },

  watch: {
    pratosRemovidosIds: {
      handler(newIds: number[]) {
        // Verifica se este prato específico foi removido
        if (this.selected && this.prato?.id && newIds.includes(this.prato.id)) {
          this.resetButton();
        }
      },
      immediate: true, // Executa imediatamente na criação
      deep: true
    }
  },

  methods: {
    handleClick() {
      this.selected = !this.selected;

      if (this.selected) {
        this.$emit('addToCart', this.prato);
      } else {
        this.$emit('removeToCart', this.prato);
      }
    },

    plusCart() {
      this.prato.quantity++;
    },

    minusCart() {
      if (this.prato.quantity > 1) {
        this.prato.quantity--;
      } else {
        // Se quantidade chegar a 0, remove do carrinho
        this.handleClick();
      }
    },

    resetButton() {
      this.selected = false;
    }
  },

  emits: ['addToCart', 'removeToCart', 'resetQuantity'],
})
</script>


<template>
  <div class="card-container">
    <div class="card-image-box">
      <picture>
        <source :class="classObject" class="card-image-mobile" :srcset="prato.image.mobile"
          media="(max-width: 500px)" />
        <source :class="classObject" class="card-image-mobile" :srcset="prato.image.tablet"
          media="(max-width: 900px)" />
        <img :class="classObject" class="card-image" :src="`${prato.image.desktop}`" alt="#" @click="handleClick">
      </picture>
      <ButtonCart :selected="selected" :prato="prato" @add-to-cart="handleClick" @plus-cart="plusCart"
        @minus-cart="minusCart" />
    </div>
    <div class="card-body">
      <p class="description">
        {{ prato.description }}
      </p>
      <h3 class="title">{{ prato.name }}</h3>
      <h4 class="price">${{ prato.price.toFixed(2) }}</h4>
    </div>
  </div>
</template>


<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  height: 22rem;
  width: 16rem;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card-image-box {
  position: relative;
  display: flex;
  flex-direction: column;
}

.card-image {
  width: 15rem;
  border-radius: 10px;
  cursor: pointer;
}

.card-image:hover {
  border: 1px solid var(--red);
}

.card-image.selected {
  border: 3px solid var(--red);
}

@media (max-width: 500px) {
  .card-container {
    width: 100%;
    justify-content: space-evenly;
    gap: 2rem;
  }

  .card-image {
    width: 20rem;
  }

  .card-image-mobile.selected {
    border: none;
  }

}
</style>
