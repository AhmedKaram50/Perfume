<template>
  <div class="register">
    <div class="register-img">
      <img src="../assets/perfume8.png" alt="">
    </div>
    <div class="register-form">
      <div class="heading">
        <h4>Register</h4>
        <h5 @click="emailFromFooter()">Manage Your Smell And Make It like From Heaven Now</h5>
        <p>
          Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac. Eu ultrices vitae auctor eu augue ut lectus arcu bibendum elementum. Eu ultrices egestas
        </p>
      </div>
      <form action="">
        <div class="inputs-holder">
          <div class="input-holder">
            <input type="text"  name="First Name" v-model="firstName">
            <label for="First Name">First Name</label>
          </div>
          <div class="input-holder">
            <input type="text"  name="Last Name" v-model="lastName">
            <label for="Last Name">Last Name</label>
          </div>
          <div class="input-holder">
            <input type="text"  name="Phone Number" v-model="phoneNumber">
            <label for="Phone Number">Phone Number</label>
          </div>
          <div class="input-holder">
            <input type="email"  name="Email" v-model="email">
            <label for="Email">Email</label>
          </div>
          <div class="input-holder">
            <input type="password"  name="Password" v-model="password">
            <label for="Password">Password</label>
          </div>
          <div class="input-holder">
            <input type="password"  name="Confirm Password" v-model="confirmPassword">
            <label for="Confirm Password">Confirm Password</label>
          </div>
        </div>
        <div class="check-boxes">
          <div class="check-holder">
            <input type="checkbox" name="check1" v-model="yes">
            <label for="check1">Yes, I want to recive Emails and News</label>
          </div>
          <div class="check-holder">
            <input type="checkbox" name="check2" v-model="agreed">
            <label for="check2">I Agree for All The Instrections</label>
          </div>
        </div>
        <div class="error-holder" v-if="error">
          {{errorMessage}}
        </div>
        <button type="submit" class="main-btn" @click.prevent="registerValidation"><a href="#">create account</a></button>
        <p>Already Have an Account<router-link :to="{name: 'login'}">Log in</router-link></p>
      </form>
    </div>
  </div>
</template>

<script>
import "../firebaseInit.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc, Timestamp} from "firebase/firestore"; 

export default {
  name: 'register',
  data: function () {
    return {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      yes: false,
      agreed: false,
      error: false,
      errorMessage: ""
    }
  },
  methods: {
    submit() {
      const auth = getAuth();
      const db = getFirestore();
      const date = new Date();
      // const dateFormat = date.toString().slice(4, 15).split(' ').join(',')
      createUserWithEmailAndPassword(auth, this.email, this.password).then(result => {
        console.log(result.user.uid);
        const docRef = setDoc(doc(db, "users", result.user.uid), {
          createdIn: Timestamp.fromDate(date),
          firstName: this.firstName,
          lastName: this.lastName,
          phoneNumber: this.phoneNumber,
          email: this.email,
          password: this.password,
          yes: this.yes,
          agreed: this.agreed,
          profileImageUrl: "https://firebasestorage.googleapis.com/v0/b/perfume-b4165.appspot.com/o/avatar%2Fuser3.png?alt=media&token=4c8faa3d-aee4-41b6-b9c9-4892a7a48fa1"
        });
        console.log("Document written with ID: ", docRef);
        this.$router.replace({name: 'login'});
      }).catch(error => {
        console.log(error)
      })
    },
    registerValidation() {
      if (
        this.firstName === "" || this.lastName === "" ||
        this.phoneNumber === "" || this.email === "" ||
        this.password === "" || this.confirmPassword === "" ||
        this.yes === false || this.agreed === false) {
          this.errorMessage = "All fields are required"
          this.error = true;
      } else if (this.password.length < 8){
        this.errorMessage = "Password is too shoort"
        this.error = true;
      }else if (this.phoneNumber.length < 12){
        this.errorMessage = "phone number is invalid"
        this.error = true;
      }else if (this.password !== this.confirmPassword) {
        this.errorMessage = "Password isn't Equal"
        this.error = true;
      } else {
        this.error = false;
        this.submit();
      }
    },
    emailFromFooter() {
      console.log()
      this.email = this.getEmail
    }
  },
  computed: {
    getEmail() {
      return this.$store.state.email
    }
  },
  created () {
    this.email = this.getEmail
  }
}
</script>

<style lang="scss">
.register{
  display: flex;
  align-items: center;
  .register-img{
    background-color: var(--main-color);
    padding: 150px 100px;
    width: 40%;
    img{
      width: 60%;
      height: 100%;
    }
  }
  .register-form{
    text-align: left;
    width: 60%;
    padding: 0 30px;
    font-family: var(--main-font);
    .heading{
      color: var(--second-color);
      h4{
        font-size: 30px;
        font-weight: bold;
        letter-spacing: 4px;
        margin-bottom: 50px;
        color: var(--main-color);
      }
      h5{
        font-weight: bold;
        margin-bottom: 25px;
      }
      p{
        color: #888888;
        line-height: 1.7;
        margin-bottom: 30px;
      }
    }
    .inputs-holder{
      display: flex;
      flex-wrap: wrap;
      .input-holder{
        display: flex;
        flex-direction: column;
        width: 46%;
        margin-right: 4%;
        input{
          order: 2;
          outline: none;
          padding: 0 15px;
          height: 40px;
          color: #696969;
          border: 2px solid rgba(90, 90, 90, 0.1);
          border-radius: 3px
        }
        label{
          display: block;
          order: 1;
          font-size: 16px;
          margin: 25px 0 8px 0;
        }
      }
    }
    .check-boxes{
      margin: 35px 0;
      .check-holder{
        margin: 10px 0;
        display: flex;
        align-items: center;
        gap: 12px;
        color: #888888;
        input{
          width: 15px;
          height: 15px;
        }
        label{

        }
      }
    }
    form{
      button{
      font-size: 16px
      }
      > p{
        padding: 30px 0;
        margin-bottom: 0 !important;
        font-size: 15px;
        color: #888888;
        a{
          margin-left: 10px;
          display: inline-block;
          transition: color 0.4s ease-in-out;
        }
      }
      .error-holder{
        width: 100%;
        margin: 30px auto;
        background-color: #dc3545;
        color: #fff;
        padding: 6px 15px;
        text-align: center;
        border-radius: 10px;
        font-weight: bold;
      }
    }
  }
}

@media (max-width: 576px) {
  .register .register-img{
    display: none
  }
  .register .register-form{
    width: 100%;
    padding-block: 40px !important;
  }
  .register .register-form .inputs-holder .input-holder{
    width: 100%;
    margin-right: 0 !important;
  }
}
</style>