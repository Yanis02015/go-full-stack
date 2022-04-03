<template>
  <div>
    <div>
      <div>
        <input type="text" v-model="login.email" required />
        <input type="password" v-model="login.password" required />
        <button @click="goToLogin" style="background: red">Login</button>
      </div>
      <div>
        <input type="text" v-model="signup.email" required />
        <input type="password" v-model="signup.password" required />
        <button @click="goToSignup" style="background: green">Signup</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions} from 'vuex'
export default {
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      signup: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(['setUser', 'setToken']),
    goToLogin() {
      console.log(this.login.email);
      fetch("http://192.168.1.112:3000/api/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.login),
      })
        .then((stream) => stream.json())
        .then((data) => {
          this.setUser(data.userId);
          this.setToken(data.token);
        })
        .catch((error) => console.log("erreur : ", error));
    },

    goToSignup() {
      fetch("http://192.168.1.112:3000/api/auth/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.signup),
      })
        .then((data) => console.log(data))
        .catch((error) => console.log("erreur : ", error));
    },
  },
};
</script>

<style></style>
