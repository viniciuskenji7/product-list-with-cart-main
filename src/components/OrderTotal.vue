<script lang="ts">
import type IMenu from '@/interfaces/IMenu';
import { openModal } from '@kolirt/vue-modal';
import { Trees } from 'lucide-vue-next';
import { defineComponent, type PropType } from 'vue';
import ModalOrder from './ModalOrder.vue';
import ButtonOrder from './ButtonOrder.vue';


export default defineComponent({
  name: 'OrderTotal',
  emits: ['cleanCart'],
  components: {
    Trees,
    ButtonOrder,
  },
  props: {
    pratos: { type: Object as PropType<IMenu[]>, required: true },
    textButton: String,
    variant: { type: String as PropType<'default' | 'modal'>, default: 'default' }
  },
  methods: {
    runModal() {
      openModal(ModalOrder, {
        pratosSelected: this.pratos
      })
        //Roda quando modal fecha via confirmModal
        .then((data) => {
          console.log('success', data);
        })
        //Roda quando modal é fechado via closeModal ou esc
        .catch(() => {
          this.$emit('cleanCart', this.pratos);
        })
    }
  },
  computed: {
    priceTotal() {
      return this.pratos.reduce((total: number, prato: IMenu): number => {
        return total + (prato.price * prato.quantity);
      }, 0)
    }
  }
})
</script>


<template>
  <div v-if="variant === 'default'" class="order-container">
    <div class="order-box">
      <h4 class="description-price">Order Total</h4>
      <h3 class="title">${{ priceTotal.toFixed(2) }}</h3>
    </div>
    <div class="order-delivery" :class="`order-${variant}`">
      <Trees class="tree" />
      <span>
        This is a <strong class="title">carbon-neutral</strong> delivery
      </span>
    </div>
    <ButtonOrder text-button="Confirm Order" @click="runModal" />
    <ButtonOrder text-button="Cancel Order" @click="$emit('cleanCart', pratos)" />
  </div>

  <div v-if="variant === 'modal'" class="order-container">
    <div class="order-box">
      <h4 class="description-price">Order Total</h4>
      <h3 class="title title-price">${{ priceTotal.toFixed(2) }}</h3>
    </div>
  </div>


</template>

<style scoped>
.order-container {
  margin-top: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1.5rem;
}

.order-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-delivery {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 20px;
  background-color: var(--rose-extra-light);
}

.tree {
  color: var(--green);
}

.title-price {
  font-size: 25px;
}

@media (max-width: 500px) {
  .order-delivery {
    gap: .5rem;
    font-size: 12px;
  }
}
</style>
