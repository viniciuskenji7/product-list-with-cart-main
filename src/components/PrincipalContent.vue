<script lang="ts">
import { defineComponent } from 'vue';
import MenuFoods from './MenuFoods.vue';
import YourCart from './YourCart.vue';
import type IMenu from '@/interfaces/IMenu';
import obterMenu from '@/controllers/obterMenu';
import { ModalTarget } from '@kolirt/vue-modal';

export default defineComponent({
  name: 'PrincipalContent',
  components: {
    MenuFoods,
    YourCart,
    ModalTarget
  },
  data() {
    return {
      pratosInCart: [] as IMenu[],
      pratosRemovidosIds: [] as number[], // Mantém como array
      menu: [] as IMenu[],
      menuFiltrado: [] as IMenu[],
      selected: false
    }
  },
  created() {
    this.menu = obterMenu();
    this.menuFiltrado = this.menu;
  },
  methods: {
    addToCart(pratos: IMenu) {
      this.pratosInCart.push(pratos);

      // Remove o ID da lista de removidos quando adiciona
      const index = this.pratosRemovidosIds.indexOf(pratos.id);
      if (index !== -1) {
        this.pratosRemovidosIds.splice(index, 1);
      }
    },
    removeToCart(prato: IMenu) {
      const index = this.pratosInCart.findIndex(p => p.id === prato.id);

      if (index !== -1) {
        this.pratosInCart.splice(index, 1);

        // Adiciona o ID à lista de removidos
        if (!this.pratosRemovidosIds.includes(prato.id)) {
          this.pratosRemovidosIds.push(prato.id);
        }

        // Reseta a quantidade
        this.resetQuantity(prato.id);
      }
    },
    removeToAllCarts() {
      // Adiciona todos os IDs à lista de removidos
      this.pratosInCart.forEach(item => {
        if (!this.pratosRemovidosIds.includes(item.id)) {
          this.pratosRemovidosIds.push(item.id);
        }
      });

      // Limpa o carrinho
      this.pratosInCart = [];
    },
    resetQuantity(pratoId: number) {
      const prato = this.menu.find(p => p.id === pratoId);
      if (prato) {
        prato.quantity = 1;
      }
    }
  }
})
</script>

<template>
  <main>
    <MenuFoods :pratos-removidos-ids="pratosRemovidosIds" :menu="menuFiltrado" @reset-quantity="resetQuantity"
      @add-to-cart="addToCart" @remove-to-cart="removeToCart" />
    <YourCart :pratos-in-cart="pratosInCart" @remove-to-cart="removeToCart" @remove-to-all-carts="removeToAllCarts" />
    <ModalTarget />
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: space-evenly;
  align-items: start;
  padding: 10rem;
}

@media (max-width: 900px) {
  main {
    flex-direction: column;
    align-items: center;
    gap: 5rem;
  }
}

@media (max-width: 500px) {
  main {
    flex-direction: column;
    align-items: center;
    gap: 5rem;
    padding: 5rem;
  }
}
</style>
