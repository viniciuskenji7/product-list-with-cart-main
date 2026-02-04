<script setup lang="ts">
import { closeModal, SimpleModal } from '@kolirt/vue-modal'
import { Check } from 'lucide-vue-next';
import FoodSelected from './FoodSelected.vue';
import type { PropType } from 'vue';
import type IMenu from '@/interfaces/IMenu';
import OrderTotal from './OrderTotal.vue';
import ButtonOrder from './ButtonOrder.vue';

const props = defineProps({
  pratosSelected: { type: Object as PropType<IMenu[]>, required: true }
});
</script>


<template>
  <SimpleModal :show-close="false" class="modal-container" size="sm">
    <div class="order-confirmed-box">
      <Check class="check" />
      <div class="order-title">
        <h1 class="title">Order Confirmed</h1>
        <p class="description">
          We hope you enjoy your food!
        </p>
      </div>
    </div>

    <div class="selected-foods-container">
      <ul class="selected-foods">
        <li v-for="(prato, index) in props.pratosSelected" :key="index" class="selected-foods-final">
          <FoodSelected variant="modal" :pratos-in-cart="prato" />
        </li>
        <li class="order-total">
          <OrderTotal variant="modal" text-button="Start New Order" :pratos="props.pratosSelected" />
        </li>

      </ul>
    </div>
    <ButtonOrder text-button="Start New Order" @click="closeModal" />

  </SimpleModal>
</template>

<style scoped>
.modal-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.selected-foods-container {
  padding-bottom: 40px;
}

.selected-foods {
  padding: 20px;
  background-color: var(--rose-extra-light);
  border-radius: 10px;
}

.order-confirmed-box {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
  padding-bottom: 40px;
}

.check {
  border: 1px solid var(--green);
  color: var(--green);
  border-radius: 50%;
  height: 40px;
  width: 40px;
  padding: 3px;
}

@media (max-width: 500px) {
  .modal-container {
    margin-top: 100px;
    justify-content: space-between;
  }
}
</style>
