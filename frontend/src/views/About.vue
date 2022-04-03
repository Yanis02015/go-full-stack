<template>
  <div class="about">
    <input
      v-model="test.modele"
      type="text"
      placeholder="ex: Samung Galaxy S10+"
    />
    <input v-model="test.url" type="text" placeholder="https://..." />
    <input v-model="test.prix" type="number" placeholder="Prix en euro" />
    <button @click="formIsOk">Ajouter l'article</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      test: {
        url: "",
        modele: "",
        prix: null,
        unite: "euro",
      },
    };
  },
  methods: {
    post() {
      fetch("http://192.168.1.112:3000/api/telephone", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: this.user + " " + this.token,
        },
        body: JSON.stringify(this.test),
      });
    },
    formIsOk() {
      if (!this.test.modele) {
        alert("le nom ne peut pas être vide");
      } else if (!this.test.url) {
        alert("l'url ne peut pas etre vide");
      } else if (!this.test.prix) {
        alert("le prix ne peut pas etre vide");
      } else {
        this.post();
        this.test = {
          url: "",
          modele: "",
          prix: null,
          unite: "euro",
        };
      }
    },
  },
  computed: {
    ...mapState(["user", "token"]),
  },
};
</script>
