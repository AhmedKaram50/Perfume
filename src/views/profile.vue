<template>
  <div class="profile">
    <div class="profile-cover">
      <div class="profile-holder">
        <div class="profile-pic">
          <img
            :src="userInformation.profileImageUrl"
            alt="user"
            id="profilePic"
          />
          <input
            type="file"
            id="chooseImage"
            accept="image/*"
            @change="changeProfilePic"
            hidden
          />
        </div>
        <span v-on:click="chooseImage()"
          ><fa-icon :icon="['fas', 'pen']"
        /></span>
      </div>
    </div>
    <div class="user-name">
      <h4>{{ fullName }}</h4>
      <span v-on:click="logOut()"
        ><fa-icon :icon="['fas', 'sign-out-alt']" /> Log out</span
      >
    </div>
    <div class="register">
      <div class="register-form">
        <form>
          <div class="inputs-holder">
            <div class="input-holder">
              <input
                type="text"
                name="First Name"
                v-model="userInformation.firstName"
              />
              <label for="First Name">First Name</label>
            </div>
            <div class="input-holder">
              <input
                type="text"
                name="Last Name"
                v-model="userInformation.lastName"
              />
              <label for="Last Name">Last Name</label>
            </div>
            <div class="input-holder long">
              <input
                type="email"
                name="Email"
                v-model="userInformation.email"
                disabled
              />
              <label for="Email">Email</label>
            </div>
            <div class="input-holder">
              <input
                type="text"
                name="Phone Number"
                v-model="userInformation.phoneNumber"
              />
              <label for="Phone Number">Phone Number</label>
            </div>
            <div class="input-holder">
              <input
                type="text"
                name="Country"
                v-model="userInformation.country"
              />
              <label for="Country">Country</label>
            </div>
            <div class="input-holder">
              <input type="text" name="City" v-model="userInformation.city" />
              <label for="City">City</label>
            </div>
            <div class="input-holder">
              <input
                type="text"
                name="zipCode"
                v-model="userInformation.zipCode"
              />
              <label for="zipCode">zipCode</label>
            </div>
            <div class="input-holder long">
              <input
                type="password"
                name="Password"
                v-model="password"
                disabled
              />
              <label for="Password">Password</label>
              <a href="#">Reset Password</a>
            </div>
          </div>
        </form>
        <button class="main-btn" @click="saveChanges()">Save Changes</button>
      </div>
    </div>
    <loading v-show="loading" />
  </div>
</template>

<script>
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import loading from "../components/loading.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "profile",
  components: {
    loading,
  },
  data: function () {
    return {
      password: "aaaaaaaaaa",
      imageSrc: "",
      loading: false,
      imageAsFile: "",
      imageAsName: "",
      isProfilePicHasChanged: false
    };
  },
  methods: {
    async saveChanges() {
      if (this.isProfilePicHasChanged) {
        this.uploadProfilePhoto()
        console.log("upladed photo done")
      }
      this.updateUserInformation();
    },
    async logOut() {
      const auth = getAuth();
      await signOut(auth);
      window.location.reload();
    },
    chooseImage() {
      document.getElementById("chooseImage").click();
    },
    imageHandler(event) {
      this.imageData = event.target.files[0];
      this.imageName = this.imageData.name;
    },
    async uploadProfilePhoto() {
      const storage = getStorage();
      const imageRef = ref(storage, `avatar/${this.imageAsName}`);

      await uploadBytes(imageRef, this.imageAsFile)
        .then((snapshot) => {
          console.log(snapshot);
        })
        .catch((error) => {
          console.log(error);
        });

      this.downloadProfilePic();
    },
    async downloadProfilePic() {
      const storage = getStorage();
      const db = getFirestore();
      const docRef = doc(db, "users", this.userId);
      await getDownloadURL(ref(storage, `avatar/${this.imageAsName}`))
        .then((url) => {
          this.userInformation.profileImageUrl = url;
        })
        .catch((error) => {
          console.log(error);
        });
      await updateDoc(docRef, {
        profileImageUrl: this.userInformation.profileImageUrl,
      });
    },
    changeProfilePic(e) {
      const imageFile = e.target.files[0];
      const image = document.getElementById("profilePic");
      if (imageFile) {
        this.imageAsFile = imageFile;
        this.imageAsName = imageFile.name;
        const fileReader = new FileReader();
        fileReader.addEventListener("load", function () {
          image.setAttribute("src", fileReader.result);
        });
        fileReader.readAsDataURL(imageFile);
      }
      this.isProfilePicHasChanged = true
    },
    ...mapActions(["getCurrentUserData", "updateUserInformation"]),
  },
  computed: {
    fullName() {
      return `${this.userInformation.firstName} ${this.userInformation.lastName}`;
    },
    ...mapGetters(["userInformation", "userId"]),
  },
  mounted() {
    this.getCurrentUserData();
  },
};
</script>

<style lang="scss" scoped>
.profile {
  padding: 0 0;
  .profile-cover {
    background: url("../assets/land.jpg") center;
    background-size: cover;
    height: 210px;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0 0 0 / 50%);
    }
  }
  .user-name {
    h4 {
      margin-top: 80px;
      color: var(--second-color);
      font-weight: bold;
      font-family: var(--main-font);
      transform: translateX(-15px);
    }
    span {
      text-align: left;
      margin-right: 25px;
      cursor: pointer;
      color: var(--second-color);
      font-size: 14px;
      font-weight: bold;
      svg {
        font-size: 22px;
        margin-top: 10px;
        transform: translateY(2px);
      }
    }
  }
  .profile-holder {
    width: 140px;
    height: 140px;
    margin: 0 auto;
    span {
      background-color: var(--main-color);
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      display: block;
      color: #fff;
      margin-left: auto;
      transform: translate(-21px, 235px);
      cursor: pointer;
      svg {
        font-size: 12px !important;
      }
    }
  }
  .profile-pic {
    width: 140px;
    height: 140px;
    margin: 0 auto;
    border-radius: 50%;
    transform: translateX(-8%);
    position: absolute;
    bottom: -70px;
    left: calc(50% - 80px);
    border: 5px solid rgb(210 210 210);
    background-color: #fff;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .register-form {
    margin: 0 auto !important;
    padding: 10px 0 80px 0;
    .inputs-holder .input-holder {
      label {
        margin: 30px 0 8px 0 !important;
      }
      input {
        height: 45px;
        color: #a9a9a9;
        border: 2px solid rgb(90 90 90 / 20%);
        transition: all 0.3s ease-in-out;
        &:focus {
          color: var(--main-color);
          border: 2px solid rgb(252 132 107 / 20%);
        }
      }
      a {
        order: 3;
        margin-top: 9px;
        font-size: 13px;
        text-decoration: none;
      }
    }
    .inputs-holder .input-holder.long {
      width: 100% !important;
    }
    button {
      margin-top: 30px;
      border-radius: 10px !important;
    }
  }
}
</style>
