<template>
  <my-table
    title="Categories Information"
    :headings="[
      'Category Name',
      'Products Count',
      '_Id',
      'Created In',
      'Created',
    ]"
    addLink="addCategory"
  >
    <tr v-for="(row, index) in categories" :key="index">
      <td>{{ index + 1 }}</td>
      <td>
        <a href="#">{{ row.name }}</a>
      </td>
      <td>-</td>
      <td>{{ row._id }}</td>
      <td>
        <span class="category">{{
          row.createdAt.split("T")[0].split("-").reverse().join(" / ")
        }}</span>
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
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item>
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
  name: "users",
  components: {
    myTable,
  },
  data() {
    return {
      color: "#f00",
    };
  },
  methods: {
    ...mapActions(["getCategoriesFromApi"]),
  },
  computed: {
    ...mapGetters(["categories"]),
  },
  created() {
    this.getCategoriesFromApi();
  },
  mounted() {
    console.log(this.categories);
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
