<template>
  <my-table
    :tableDataObj="allUsers"
    :headings="[
      'name',
      'profile pic',
      'phone',
      'email',
      'country',
      'city',
      'Zipcode',
      'Actions',
    ]"
  >
    <tr v-for="(row, index) in allUsers" :key="index">
      <td>{{ index + 1 }}</td>
      <td>
        <a href="#">{{ row.firstName }}</a>
      </td>
      <td>
        <div class="profile-pic">
          <img src="../../assets/user3.png" v-if="!row.profileImageUrl" />
          <img :src="row.profileImageUrl" v-else />
        </div>
      </td>
      <td>{{ row.phoneNumber }}</td>
      <td>
        <span>{{ row.email }}</span>
      </td>
      <td>
        <span>{{ row.country || "-" }}</span>
      </td>
      <td>
        <span :class="{ category: row.city }">{{ row.city || "-" }}</span>
      </td>
      <td>
        {{ row.zipCode || "-" }}
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
    ...mapActions(["getAllUsers"]),
  },
  computed: {
    ...mapGetters(["allUsers"]),
  },
  mounted() {
    this.getAllUsers();
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
