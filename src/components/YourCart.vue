<script lang="ts">
import type IMenu from '@/interfaces/IMenu';
import { defineComponent, type PropType } from 'vue';
import FoodSelected from './FoodSelected.vue';
import OrderTotal from './OrderTotal.vue';


export default defineComponent({
  name: 'YourCart',
  emits: ['removeToCart', 'removeToAllCarts'],
  components: {
    FoodSelected,
    OrderTotal
  },
  props: {
    pratosInCart: { type: Object as PropType<IMenu[]>, required: true },
  },
  computed: {
    quantityCart() {
      return this.pratosInCart.reduce((total, prato) => {
        return total + prato.quantity;
      }, 0)
    }
  }

})

</script>


<template>
  <div class="cart-container">
    <h2 class="cart-title">Your Cart({{ quantityCart }})</h2>
    <div class="cart-box">
      <div v-if="!pratosInCart.length" class="cart-box-content">
        <img src="/assets/images//icon/illustration-empty-cart.svg" alt="Empty Cart">
        <p class="description">
          Your added items will appear here
        </p>
      </div>
      <ul>
        <li v-for="prato in pratosInCart" :key="prato.id">
          <FoodSelected :key="prato.id" :pratos-in-cart="prato" @remove-to-cart="$emit('removeToCart', prato)"
            v-if="pratosInCart.length != 0" />
        </li>
        <li v-if="pratosInCart.length > 0">
          <OrderTotal @clean-cart="$emit('removeToAllCarts', pratosInCart)" text-button="Confirm Order"
            :pratos="pratosInCart" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.cart-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 3rem;

  padding: 2rem;
  width: 30%;
  height: 100%;

  background-color: white;

  border-radius: 10px;
}

.cart-box,
.cart-box-content {
  width: 100%;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cart-title {
  color: var(--red);
}

ul,
li {
  width: 100%;
}


@media (max-width: 1280px) {
  .cart-container {
    width: 40%;
  }
}

@media (max-width: 900px) {
  .cart-container {
    width: 100%;
  }
}

@media (max-width: 500px) {
  .cart-container {
    width: 20rem;
    height: 100%;
  }
}
</style>
