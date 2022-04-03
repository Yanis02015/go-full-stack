<template>
  <div class="hello">
    <h1>Boutique FullStack</h1>
    <div class="div" v-if="user">
      <div v-for="item in items" :key="item._id" class="container">
        <router-link :to="`/telephone/${item._id}`">
          <div>
            <img :src="item.url" alt="image du produit" />
            <h5>{{ item.modele }}</h5>
            <span>{{ item.prix }} {{ item.unite }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "HelloWorld",
  data() {
    return {
      items: null,
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    get() {
      console.log("get is running");
      console.log(this.token);
      fetch("http://192.168.1.112:3000/api/telephone", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: this.user + " " + this.token,
        },
      })
        .then((stream) => stream.json())
        .then((data) => (this.items = data))
        .catch((error) => console.error(error));
    },
  },
  computed: {
    ...mapState(["user", "token"]),
  },
};
</script>

<style scoped>
.div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
img {
  width: 200px;
}
.container {
  margin: 20px;
  padding: 5px;
  width: 200px;
  background: #f0f0f0;
}

.container:hover {
  background: #dddddd;
}
</style>
