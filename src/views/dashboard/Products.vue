<template>
  <my-table
    v-if="isProductLoaded"
    title="Products Information"
    :headings="[
      'Product Name',
      'Price',
      'Quantity',
      'Category',
      'Sells',
      'Actions',
    ]"
    addLink="/dashboard/addProduct"
  >
    <tr v-for="(row, index) in products" :key="index">
      <td>{{ index + 1 }}</td>
      <td>
        <router-link :to="{ path: `/catalog/${row.name}` }"
          >{{ row.name || "aa" }}
        </router-link>
      </td>
      <td>{{ row.price }}</td>
      <td>
        <span>{{ row.quantity }}</span>
      </td>
      <td>
        <span class="category" v-if="row.category">{{
          row.category.name
        }}</span>
        <span v-else>-</span>
      </td>
      <td>
        <span>{{ row.sells || "0" }}</span>
      </td>
      <td>
        <b-dropdown
          id="dropdown-1"
          text="Actions"
          class="m-md-2 white"
          :variant="color"
          header-variant="white"
        >
          <b-dropdown-item>
            <router-link to="EditProduct">
              <div
                class="
                  action-holder
                  edit
                  d-flex
                  justify-content-between
                  align-items-center
                "
              >
                <span>Edit</span>
                <fa-icon :icon="['fas', 'pen']" />
              </div>
            </router-link>
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item>
            <router-link to="EditProduct">
              <div
                class="
                  action-holder
                  delete
                  d-flex
                  justify-content-between
                  align-items-center
                "
              >
                <span>Delete</span>
                <fa-icon :icon="['fas', 'trash-alt']" />
              </div>
            </router-link>
          </b-dropdown-item>
        </b-dropdown>
      </td>
    </tr>
  </my-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import myTable from "../../components/Table.vue";

export default {
  name: "AdminProducts",
  data() {
    return {
      color: "#f00",
    };
  },
  components: {
    myTable,
  },
  methods: {
    ...mapActions(["getProductsFromApi"]),
  },
  computed: {
    ...mapGetters(["products", "isProductLoaded"]),
  },
  created() {
    this.getProductsFromApi("all");
  },
  mounted() {
    console.log(this.products);
  },
};
</script>

<style lang="scss" scoped>
.action-holder.edit {
  span,
  svg {
    color: #444;
  }
}
.action-holder.delete {
  span,
  svg {
    color: #e74c3c;
  }
}
</style>
