<template>
  <section class="form-holder">
    <div class="container">
      <form class="row g-3">
        <h4>Add Category</h4>
        <div class="col-md-12">
          <label for="inputPassword4" class="form-label">Category Name</label>
          <input
            type="text"
            class="form-control"
            id="inputEmail4"
            v-model="categoryName"
          />
        </div>
        <div class="col-12">
          <button
            type="submit"
            class="btn btn-primary"
            @click.prevent="validation()"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AddCategory",
  data() {
    return {
      categoryName: "",
    };
  },
  computed: {
    ...mapGetters(["categories"]),
  },
  methods: {
    submitProduct() {
      this.addNewCategory(this.categoryName);
    },
    validation() {
      if (this.categoryName !== "") {
        this.submitProduct();
        this.$router.replace({ path: "/catalog/" });
      } else {
        alert("Some Required Data Is missing");
      }
    },
    ...mapActions(["addNewCategory"]),
  },
  mounted() {
    console.log(this.categories);
  },
};
</script>

<style lang="scss" scoped>
/* ===================== Start Forms Styling ===================== */
@import "../../sass/config";

.form-holder {
  display: flex;
  justify-content: center;
  align-items: center;
  // min-height: calc(100vh - 120px);
  text-align: left;
  background-color: $body-color;
  h4 {
    color: $main-color;
    font-weight: bold;
    margin-bottom: 40px;
  }
  form {
    box-shadow: $main-shadow;
    background-color: #fff;
    padding: 30px;
    margin: 80px 0;
    border-radius: 4px;
    h4 {
      color: #042954;
      font-weight: bold;
      margin-bottom: 40px;
    }
    input.form-control {
      height: 45px;
    }
    select.form-select {
      height: 45px;
    }
    > div > label {
      margin-top: 20px;
      color: #444;
    }
    a.add {
      float: left;
      line-height: 3.3;
      text-decoration: none;
    }
    .ckeck-holder {
      margin-left: 20px;
      label {
        margin-right: 5px;
        color: #444;
      }
    }
    button {
      margin-top: 35px;
      background-color: $main-color;
      border: $main-color;
      // width: 100%;
      height: 45px;
      &:hover {
        background-color: $main-color;
      }
    }
    .levels {
      margin-top: 35px;
      label {
        margin: 10px 6px 0 0;
        font-size: 15px;
        color: #444;
        border-color: #ced4da;
        &:hover {
          color: #fff;
          background-color: $main-color;
          border-color: #ced4da;
        }
      }
    }
  }
}
.btn-secondary {
  background-color: #ff6b6b;
  border-color: #ff6b6b;
  &:hover {
    background-color: #ff6b6b;
    border-color: #ff6b6b;
  }
}

.btn-check:checked + .btn-outline-primary {
  background-color: $main-color;
  color: #fff;
}
/* ===================== End Forms Styling ===================== */
</style>
