<template>
  <section class="form-holder">
    <div class="container">
      <form class="row g-3">
        <h4>Add New Product</h4>
        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">Product Name</label>
          <input
            type="text"
            class="form-control"
            id="inputEmail4"
            v-model="productName"
          />
        </div>
        <div class="col-md-3">
          <label for="inputZip" class="form-label">Price</label>
          <input
            type="number"
            class="form-control"
            id="inputZip"
            v-model="price"
          />
        </div>
        <div class="col-md-3">
          <label for="inputZip" class="form-label">Quantity</label>
          <input
            type="number"
            class="form-control"
            id="inputZip"
            v-model="quantity"
          />
        </div>
        <div class="col-md-12">
          <label for="exampleFormControlTextarea1" class="form-label"
            >Description</label
          >
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            v-model="description"
          ></textarea>
        </div>
        <div class="col-md-4 levels" v-if="isCategoryLoaded">
          <h6>Related Categories</h6>
          <div
            class="hold d-inline"
            v-for="(item, index) in categories"
            :key="index"
          >
            <input
              type="checkbox"
              class="btn-check"
              :id="'btn-check-outlined_' + item._id"
              autocomplete="off"
              @change="checkingCat"
            />
            <label class="btn btn-outline-primary" :for="'btn-check-outlined_' + item._id">{{
              item.name
            }}</label>
          </div>
        </div>
        <div class="col-md-12">
          <div class="mb-3 mt-3">
            <label for="formFileMultiple" class="form-label me-5"
              >Chose Images</label
            > 
            <span class="me-3" v-for="(image, index) in productImageName" :key="index">{{image}}</span>
            <input
              class="form-control h-auto"
              type="file"
              id="formFileMultiple"
              multiple
              @change="imageAdded"
            />
          </div>
        </div>

        <div class="col-12">
          <button
            type="submit"
            class="btn btn-primary"
            @click.prevent="validation()"
          >
            Add New Product
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AddProduct",
  data() {
    return {
      productName: "",
      price: "",
      quantity: 1,
      description: "",
      relatedCategory: "",
      productImageName: [],
    };
  },
  computed: {
    ...mapGetters(["categories", "isCategoryLoaded"]),
  },
  methods: {
    imageAdded(e) {
      const imagesFiles = e.target.files;
      for (let item of imagesFiles){
         this.productImageName.push(item.name);
      }
    },
    submitProduct() {
      this.addNewProduct({
        name: this.productName,
        description: this.description,
        price: this.price,
        quantity: this.quantity,
        productImage: this.productImageName,
        categoryId: this.relatedCategory,
      });
    },
    validation() {
      if (
        this.productName !== "" &&
        this.price !== "" &&
        this.description !== "" &&
        this.productImageName.length >= 0 &&
        this.relatedCategory !== ""
      ) {
        this.submitProduct();
        this.getProductsFromApi("all");
        this.$router.replace({path: "/catalog/"})
      } else{
        alert("Some Required Data Is missing")
      }
    },
    checkingCat (e) {
      this.relatedCategory = e.target.getAttribute("id").split("_")[1];
    },
    ...mapActions(["getCategoriesFromApi", "addNewProduct", "getProductsFromApi"]),
  },
  created() {
    this.getCategoriesFromApi();
  },
  mounted() {
    console.log(this.isCategoryLoaded);
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

.btn-check:checked + .btn-outline-primary{
  background-color: $main-color;
  color: #fff;
}
/* ===================== End Forms Styling ===================== */
</style>
