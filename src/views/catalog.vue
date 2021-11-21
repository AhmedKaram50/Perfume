<template>
  <div class="category-page">
    <div class="header">
      <h2>Products</h2>
    </div>
    <div id="category">
      <div class="navbar section">
        <div class="navbar__aside desktop-only">
          <SfHeading :level="3" title="All Products" class="navbar__title" />
        </div>
        <div class="navbar__main">
          <div class="navbar__counter">
            <span class="navbar__label desktop-only">Products found: </span>
            <span class="desktop-only">{{ products.length }}</span>
            <span class="navbar__label smartphone-only">{{
              products.length
            }}</span>
          </div>
          <div class="navbar__view">
            <span class="navbar__view-label desktop-only">View</span>
            <SfIcon
              class="navbar__view-icon"
              :color="'#43464E'"
              icon="tiles"
              size="12px"
              role="button"
              aria-label="Change to grid view"
              :aria-pressed="isGridView"
              @click="isGridView = true"
            />
            <SfIcon
              class="navbar__view-icon"
              :color="'#43464E'"
              icon="list"
              size="12px"
              role="button"
              aria-label="Change to list view"
              :aria-pressed="!isGridView"
              @click="isGridView = false"
            />
          </div>
        </div>
      </div>
      <div class="main section">
        <div class="sidebar desktop-only">
          <SfAccordion :show-chevron="true">
            <SfAccordionItem header="Categories">
              <SfList class="list">
                <SfListItem
                  v-for="(item, j) in categories"
                  :key="j"
                  class="list__item"
                >
                  <SfMenuItem
                    :label="item.name"
                    count="0"
                    @click="categoryClick"
                  />
                </SfListItem>
              </SfList>
            </SfAccordionItem>
            <SfAccordionItem header="Sort By">
              <SfList class="list">
                <SfListItem class="list__item">
                  <SfMenuItem label="Latest" @click="clickSort('latest')" />
                </SfListItem>
                <SfListItem class="list__item">
                  <SfMenuItem
                    label="Price from low to high"
                    @click="clickSort('lowFirst')"
                  />
                </SfListItem>
                <SfListItem class="list__item">
                  <SfMenuItem
                    label="Price from high to low"
                    @click="clickSort('highFirst')"
                  />
                </SfListItem>
              </SfList>
            </SfAccordionItem>
          </SfAccordion>
        </div>
        <div class="products">
          <transition-group
            v-if="isGridView"
            appear
            name="products__slide"
            tag="div"
            class="products__grid"
          >
            <SfProductCard
              v-for="(product, i) in products"
              :key="product.name"
              :style="{ '--index': i }"
              :title="product.name"
              badgeLabel="50% off"
              :wishlistIcon="false"
              :image="require(`../assets/${typeof product.productImage == 'string' ? product.productImage : product.productImage[0]}`)"
              image-height="200px"
              image-width="100%"
              :regular-price="product.price + currency"
              :show-add-to-cart-button="true"
              class="products__product-card"
              @click:add-to-cart="OnAddToCart(product)"
              @click="goToProduct(product)"
            />
          </transition-group>
          <transition-group
            v-else
            appear
            name="products__slide"
            tag="div"
            class="products__list"
          >
            <SfProductCardHorizontal
              v-for="(product, i) in products"
              :key="product.name"
              :style="{ '--index': i }"
              :title="product.name"
              badgeLabel="50% off"
              :wishlistIcon="false"
              :image="require(`../assets/${typeof product.productImage == 'string' ? product.productImage : product.productImage[0]}`)"
              :regular-price="product.price + currency"
              :show-add-to-cart-button="true"
              class="products__product-card"
              @click:add-to-cart="OnAddToCart(product)"
            >
              <template #configuration>
                <SfProperty
                  class="desktop-only"
                  name="Size"
                  value="XS"
                  style="margin: 0 0 1rem 0"
                />
                <SfProperty class="desktop-only" name="Color" value="white" />
              </template>
              <template #actions>
                <SfButton
                  class="sf-button--text desktop-only"
                  style="margin: 0 0 1rem auto; display: block"
                  @click="$emit('click:add-to-wishlist')"
                >
                  Save for later
                </SfButton>
                <SfButton
                  class="sf-button--text desktop-only"
                  style="margin: 0 0 0 auto; display: block"
                  @click="$emit('click:add-to-compare')"
                >
                  Add to compare
                </SfButton>
              </template>
            </SfProductCardHorizontal>
          </transition-group>
          <SfPagination
            class="products__pagination"
            :current="currentPage"
            :total="pageCount"
            :visible="5"
            @click="
              (page) => {
                currentPage = page;
                console.log('aaa');
              }
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  SfHeading,
  SfButton,
  SfList,
  SfIcon,
  SfMenuItem,
  SfProductCard,
  SfProductCardHorizontal,
  SfPagination,
  SfAccordion,
  SfProperty,
} from "@storefront-ui/vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import router from "../router";

export default {
  name: "Category",
  components: {
    SfHeading,
    SfButton,
    SfIcon,
    SfList,
    SfProductCard,
    SfProductCardHorizontal,
    SfPagination,
    SfMenuItem,
    SfAccordion,
    SfProperty,
  },
  data() {
    return {
      productImageAsFile: "",
      productImageAsUrl: "",
      currentPage: 1,
      currency: " E£",
      sortBy: "Latest",
      isFilterSidebarOpen: false,
      isGridView: true,
      category: "Clothing",
      displayOnPage: "2",
      categoryFilter: this.$route.query.category,
      isProductLoaded: false
    };
  },
  methods: {
    OnAddToCart(product) {
      this.addProductToCart(product);
    },
    categoryClick(e) {
      this.categoryFilter = e.target.parentElement.querySelector(
        ".sf-menu-item__label"
      ).textContent;
      this.getProductsFromApi(this.categoryFilter);
      router.push({
        path: "catalog",
        query: { category: this.categoryFilter },
      });
      console.log(this.$route.query.category);
    },
    clickSort(sortType) {
      if (sortType === "lowFirst")
        this.products.sort((prev, product) =>
          prev.price < product.price ? -1 : 1
        );
      else if (sortType === "highFirst")
        this.products.sort((prev, product) =>
          prev.price > product.price ? -1 : 1
        );
      else this.getProductsFromApi(this.categoryFilter);
    },
    ChangePage() {
      this.changePage({ start: 1, end: 4 });
    },
    goToProduct(productName) {
      const current = this.products.filter((product) => product.name == productName.name)[0];
      this.setCurrentProduct(current)
      this.$router.push({path: `catalog/${productName.name}`,})
    },
    ...mapActions([
      "addProductToCart",
      "getProductsFromApi",
      "addNewProduct",
      "getCategoriesFromApi",
      "addNewCategory",
      "changePage",
    ]),
    ...mapMutations(["setCurrentProduct"]),
  },
  computed: {
    pageCount() {
      return Math.ceil(
        this.AllProducts.length / this.productsPageInfo.productsInOnePageCount
      );
    },
    ...mapGetters([
      "products",
      "categories",
      "AllProducts",
      "productsPageInfo",
    ]),
  },
  created() {
    this.getProductsFromApi(this.categoryFilter);
    this.getCategoriesFromApi();
  },
  
};
</script>

<style lang="scss" scoped>
/* Me */
.header {
  height: 210px;
  background: url("../assets/land.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
  h2 {
    font-size: 50px;
    font-weight: 500;
    color: #fff;
    z-index: 3;
    position: relative;
  }
}

.navbar__counter {
  margin: 0 !important;
  margin-right: auto !important;
}

.sf-product-card .sf-product-card__price .sf-price__regular {
  color: #fc846b !important;
  font-weight: bold;
  font-size: 22px;
  margin-top: 5px;
}

.sf-price {
  &__regular {
    display: none;
  }
}

.products .products__grid .sf-product-card .sf-product-card__price {
  display: none !important;
}

#category .navbar__sort {
  margin: 0 !important;
}

@media (min-width: 1024px) {
  #category .products__grid {
    gap: 3%;
  }
  #category .products__product-card {
    flex: 1 1 22%;
    margin-bottom: 3%;
  }
}
/* Me */

@import "~@storefront-ui/vue/styles";
#category {
  box-sizing: border-box;
  padding-top: 80px;
  padding-bottom: 80px;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.main {
  &.section {
    padding: var(--spacer-xs);
    @include for-desktop {
      padding: 0;
    }
  }
}
.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 1px 0 1px 0;
  }
  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__aside,
  &__main {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
  }
  &__aside {
    flex: 0 0 15%;
    padding: var(--spacer-sm) var(--spacer-sm);
    border: 1px solid var(--c-light);
    border-width: 0 1px 0 0;
  }
  &__main {
    flex: 1;
    display: flex;
    padding: 0;
    @include for-desktop {
      padding: var(--spacer-xs) var(--spacer-xl);
    }
  }
  &__title {
    --heading-title-font-weight: var(--font-weight--semibold);
    --heading-title-font-size: var(--font-size--xl);
  }
  &__filters-icon {
    margin: 0 0 0 var(--spacer-2xs);
    order: 1;
    @include for-desktop {
      margin: 0 var(--spacer-xs) 0 0;
      order: 0;
    }
  }
  &__filters-button {
    display: flex;
    align-items: center;
    --button-font-size: var(--font-size--base);
    --button-text-decoration: none;
    --button-color: var(--c-link);
    --button-font-weight: var(--font-weight--normal);
    @include for-mobile {
      --button-font-weight: var(--font-weight--medium);
      margin-right: var(--spacer-sm);
      order: 1;
    }
    svg {
      fill: var(--c-text-muted);
      transition: fill 150ms ease;
    }
    &:hover {
      svg {
        fill: var(--c-primary);
      }
    }
  }
  &__label {
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--normal);
    color: var(--c-text-muted);
    @include for-desktop {
      margin: 0 var(--spacer-2xs) 0 0;
    }
  }
  &__select {
    --component-select-width: 220px;
    --component-select-padding: 0;
    --component-select-selected-padding: 0 var(--spacer-lg) 0 var(--spacer-2xs);
    --component-select-margin: 0;
    --component-select-error-message-height: 0;
  }
  &__sort {
    display: flex;
    align-items: center;
    margin: 0 auto 0 var(--spacer-2xl);
  }
  &__counter {
    font-family: var(--font-family--secondary);
    margin: auto;
    @include for-desktop {
      margin: auto 0 auto auto;
    }
  }
  &__view {
    display: flex;
    order: -1;
    align-items: center;
    margin: 0;
    @include for-desktop {
      margin: 0 0 0 var(--spacer-2xl);
      order: 0;
    }
    &-icon {
      cursor: pointer;
      margin: 0 var(--spacer-base) 0 var(--spacer-sm);
      @include for-desktop {
        margin: 0 var(--spacer-base) 0 0;
      }
      &:last-child {
        margin: 0;
      }
    }
    &-label {
      margin: 0 var(--spacer-sm) 0 0;
      font: var(--font-weight--normal) var(--font-size--base) / 1.6
        var(--font-family--secondary);
      text-decoration: none;
      color: var(--c-link);
    }
  }
}
.sort-by {
  --component-select-dropdown-z-index: 1;
  flex: unset;
  width: 11.875rem;
}
.main {
  display: flex;
}
.sidebar {
  flex: 0 0 15%;
  padding: var(--spacer-sm);
  border: 1px solid var(--c-light);
  border-width: 0 1px 0 0;
}
.sidebar-filters {
  --sidebar-title-display: none;
  --sidebar-top-padding: 0;
  @include for-desktop {
    --sidebar-content-padding: 0 var(--spacer-xl);
    --sidebar-bottom-padding: 0 var(--spacer-xl);
  }
}
.list {
  --menu-item-font-size: var(--font-size--sm);
  &__item {
    &:not(:last-of-type) {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }
  }
}
.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;
  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__grid {
    justify-content: center;
    @include for-desktop {
      justify-content: space-between;
    }
  }
  &__product-card {
    --product-card-max-width: 11rem;
    --product-card-title-margin: var(--spacer-2xs) 0 0 0;
    --price-regular-font-line-height: 1;
    margin-bottom: var(--spacer-sm);
    ::v-deep .sf-product-card__price {
      margin: var(--spacer-2xs) 0 var(--spacer-xs);
    }
    flex: 1 1 50%;
    @include for-desktop {
      margin-bottom: 0;
      --product-card-max-width: 50%;
      --product-card-title-margin: var(--spacer-base) 0 0 0;
    }
  }
  &__product-card-horizontal {
    margin-bottom: var(--spacer-sm);
    flex: 0 0 100%;
    ::v-deep .sf-product-card-horizontal__wishlist-icon {
      .sf-icon {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
  &__slide-enter {
    opacity: 0;
    transform: scale(0.5);
  }
  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
  }
  &__pagination {
    display: flex;
    justify-content: center;
    margin: var(--spacer-base) 0;
  }
  @include for-desktop {
    margin: var(--spacer-sm) 0 0 var(--spacer-sm);
    &__pagination {
      justify-content: flex-start;
      margin: var(--spacer-xl) 0 0 0;
    }
    &__product-card-horizontal {
      margin: var(--spacer-lg) 0;
    }
    &__product-card {
      flex: 1 1 25%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
    }
  }
  &__show-on-page {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    &__label {
      font-family: var(--font-family--secondary);
      font-size: var(--font-size--sm);
    }
  }
}

.sf-pagination.products__pagination {
  --pagination-item-width: 24px;
  --button-width: 24px;
}

.products__pagination {
  justify-content: center !important;
}
</style>
