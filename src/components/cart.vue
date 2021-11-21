<template>
  <div id="cart">
    <SfSidebar
      :visible="isCartSidebarOpen"
      title="My Cart"
      class="sf-sidebar--right sf-sidebar--icon"
      @close="closeCart()"
    >
      <template #content-top>
        <SfProperty
          class="sf-property--large cart-summary desktop-only"
          name="Total items"
          :value="totalItems"
        />
      </template>
      <transition name="sf-fade" mode="out-in">
        <div v-if="totalItems" key="my-cart" class="my-cart">
          <div class="collected-product-list">
            <transition-group name="sf-fade" tag="div">
              <SfCollectedProduct
                v-for="product in cartProducts"
                :key="product.name"
                v-model="product.quantity"
                :image="require(`../assets/${typeof product.productImage == 'string' ? product.productImage : product.productImage[0]}`)"
                :title="product.name"
                :regular-price="product.price"
                imageHeight="130"
                imageWidth="130"
                class="collected-product"
                @click:remove="removeHandler(product)"
              >
                <template #configuration>
                  <div class="collected-product__properties">
                    <!-- <SfProperty
                      v-for="(property, key) in product.configuration"
                      :key="key"
                      :name="property.name"
                      :value="property.value"
                    /> -->
                  </div>
                </template>
                <template #actions>
                  <div class="desktop-only collected-product__actions"></div>
                </template>
              </SfCollectedProduct>
            </transition-group>
          </div>
        </div>
        <div v-else key="empty-cart" class="empty-cart">
          <div class="empty-cart__banner">
            <SfImage
              alt="Empty bag"
              class="empty-cart__image"
              :src="require('../assets/logistic.svg')"
            />
            <SfHeading
              title="Your cart is empty"
              :level="2"
              class="empty-cart__heading"
            />
          </div>
        </div>
      </transition>
      <template #content-bottom>
        <transition name="sf-fade">
          <div v-if="totalItems">
            <SfProperty
              name="Total price"
              class="
                sf-property--full-width sf-property--large
                my-cart__total-price
              "
            >
              <template #value>
                <SfPrice :regular="totalPrice" />
              </template>
            </SfProperty>
            <SfButton class="sf-button--full-width color-secondary"
              >Go to checkout</SfButton
            >
          </div>
          <div v-else>
            <SfButton class="sf-button--full-width color-primary"
              >Go back shopping</SfButton
            >
          </div>
        </transition>
      </template>
    </SfSidebar>
  </div>
</template>
<script>
import {
  SfSidebar,
  SfButton,
  SfHeading,
  SfProperty,
  SfPrice,
  SfImage,
  SfCollectedProduct,
} from "@storefront-ui/vue";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Cart",
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfImage,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
  },
  data() {
    return {};
  },
  computed: {
    totalItems() {
      return this.cartProducts.reduce(
        (totalItems, product) => totalItems + parseInt(product.quantity),
        0
      );
    },
    totalPrice() {
      const totalPrice = this.cartProducts.reduce((totalPrice, product) => totalPrice + parseInt(product.price), 0);
      const totalQuantity = this.cartProducts.reduce((qnty, product) => qnty + parseInt(product.quantity), 0);
      return `${totalPrice * totalQuantity}LE`
    },
    ...mapGetters(["isCartSidebarOpen", "cartProducts"]),
  },
  methods: {
    removeHandler(product) {
      this.removeProductFromCart(product)
    },
    closeCart() {
      this.ChangeCartStatus(false);
    },
    ...mapMutations(["ChangeCartStatus"]),
    ...mapActions(["removeProductFromCart"]),
  },
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
.sf-button.color-secondary {
  background-color: var(--main-color);
  font-family: var(--main-font) !important;
  &:active {
    background-color: var(--main-color);
    --button-background: none;
    text-decoration: none;
  }
}

.sf-heading__title.h2{
  color: var(--second-color)
}

#cart .sf-property__name,
.sf-price__regular,
.sf-property__value {
  font-family: var(--main-font) !important;
  color: var(--second-color)
}

#cart {
  font-family: var(--main-font) !important;
  --heading-title-font-family: var(--main-font) !important;
  @include for-desktop {
    & > * {
      --sidebar-bottom-padding: var(--spacer-base);
      --sidebar-content-padding: var(--spacer-base);
    }
  }
  position: relative;
  z-index: 586;
}
.cart-summary {
  margin-top: var(--spacer-xl);
}

.my-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  &__total-items {
    margin: 0;
  }
  &__total-price {
    --price-font-size: var(--font-size--xl);
    --price-font-weight: var(--font-weight--medium);
    margin: 0 0 var(--spacer-base) 0;
  }
}
.empty-cart {
  --heading-description-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-color: var(--c-primary);
  --heading-title-font-weight: var(--font-weight--semibold);
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  &__banner {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }
  &__heading {
    padding: 0 var(--spacer-base);
  }
  &__image {
    --image-width: 13.1875rem;
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      --image-width: 23.3125rem;
      margin: 0 0 var(--spacer-2xl) 0;
    }
  }
  @include for-desktop {
    --heading-title-font-size: var(--font-size--xl);
    --heading-title-margin: 0 0 var(--spacer-sm) 0;
  }
}
.collected-product-list {
  flex: 1;
}
.collected-product {
  margin: 0 0 var(--spacer-sm) 0;
  &__properties {
    margin: var(--spacer-xs) 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 2;
    &:first-child {
      margin-bottom: 8px;
    }
  }
  &__actions {
    transition: opacity 150ms ease-in-out;
  }
  &__save,
  &__compare {
    --button-padding: 0;
    &:focus {
      --cp-save-opacity: 1;
      --cp-compare-opacity: 1;
    }
  }
  &__save {
    opacity: var(--cp-save-opacity, 0);
  }
  &__compare {
    opacity: var(--cp-compare-opacity, 0);
  }
  &:hover {
    --cp-save-opacity: 1;
    --cp-compare-opacity: 1;
    @include for-desktop {
      .collected-product__properties {
        display: none;
      }
    }
  }
}
</style>
