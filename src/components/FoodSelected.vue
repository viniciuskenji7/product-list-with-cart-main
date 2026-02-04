<script lang="ts">
import type IMenu from '@/interfaces/IMenu';
import { X } from 'lucide-vue-next';
import { defineComponent, type PropType } from 'vue';


export default defineComponent({
  name: 'FoodSelected',
  emits: ['removeToCart', 'priceTotal'],
  components: {
    X,
  },
  props: {
    pratosInCart: { type: Object as PropType<IMenu>, required: true },
    variant: { type: String as PropType<'default' | 'modal'>, default: 'default' }
  },
  computed: {
    priceFinal() {
      return this.pratosInCart.quantity * this.pratosInCart.price;
    },
    quantityLive() {
      return this.pratosInCart.quantity;
    }
  },
  methods: {
    removeToCart() {
      this.$emit('removeToCart', this.pratosInCart.id)

    },

  }
})

</script>


<template>
  <div v-if="variant === 'default'" class="food-container" :class="`food-${variant}`">
    <div class="food-box">
      <h4 class="title">{{ pratosInCart.name }}</h4>
      <div class="food-info-price">
        <p class="price">{{ pratosInCart.quantity }}x</p>
        <p class="description">@${{ pratosInCart.price.toFixed(2) }}</p>
        <p class="description-price">${{ priceFinal.toFixed(2) }}</p>
      </div>
    </div>
    <button @click="removeToCart" type="button" class="button-remove-food">
      <X class="remove-food" />
    </button>
  </div>
  <!-- Modal -->
  <div v-if="variant === 'modal'" class="food-container" :class="`food-${variant}`">
    <div class="food-info">
      <img class="thumbnail-image" :src="pratosInCart.image.thumbnail" alt="Thumbnail Food">
      <div class="food-box">
        <h4 class="title food-name">{{ pratosInCart.name }}</h4>
        <div class="food-info-price">
          <p class="price">{{ pratosInCart.quantity }}x</p>
          <p class="description">@${{ pratosInCart.price.toFixed(2) }}</p>
        </div>
      </div>
    </div>
    <div class="price-final">
      <h4 class="title">${{ priceFinal.toFixed(2) }}</h4>
    </div>
  </div>

</template>


<style scoped>
.food-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  padding-bottom: 20px;
  margin-top: 20px;
  border-bottom: 1px solid var(--rose-extra-medium);

}

.thumbnail-image {
  width: 70px;
}

.food-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.food-box {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: .5rem;
}

.food-info-price {
  display: flex;
  justify-content: start;
  gap: 1rem;
}

.button-remove-food {
  text-align: center;
  height: 100%;
  background: none;
  border: none;
  cursor: pointer;
}

.remove-food {
  /* padding: 2px; */
  color: var(--rose-medium);
  border: 1px solid var(--rose-medium);
  border-radius: 50%;
  transition: .5s;
}

.remove-food:hover {
  color: var(--rose-dark);
  border: 1px solid var(--rose-dark);
}

.food-info,
.food-box {
  min-width: 0;
}

@media (max-width: 500px) {


  .food-name {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .price-final {
    flex-shrink: 0;
  }
}
</style>
