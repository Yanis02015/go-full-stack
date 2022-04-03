<template>
  <div>
    <div class="div" v-if="visible">
      <img :src="item.url" alt="url" />
      <h5>{{ item.modele }}</h5>
      <div>
        <span>{{ item.prix }} {{ item.unite }}</span>
      </div>
    </div>

    <!-- -->
    <div class="update-delete">
      <button
        @click="updateVisibility = true"
        class="update"
        style="background: green;"
      >
        Modifier
      </button>
      <button
        @click="deleteVisibility = true"
        class="delete"
        style="background: red;"
      >
        Supprimer
      </button>
    </div>

    <!-- Update dialog -->
    <div v-if="updateVisibility">
      <input
        v-model="itemToUpdate.modele"
        type="text"
        placeholder="ex: Samung Galaxy S10+"
      />
      <input v-model="itemToUpdate.url" type="text" placeholder="https://..." />
      <input
        v-model="itemToUpdate.prix"
        type="number"
        placeholder="Prix en euro"
      />
      <button @click="updateItem">Valider les modification</button>
      <button @click="cancelUpdate">Annuler</button>
    </div>

    <!-- Update dialog -->
    <div v-if="deleteVisibility">
      <button @click="deleteItem">Supprimer</button>
      <button @click="deleteVisibility = false">Annuler</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Telephone",
  data() {
    return {
      visible: false,
      updateVisibility: false,
      deleteVisibility: false,
      item: {
        _id: this.$route.params.id,
        url: "",
        modele: "",
        prix: null,
        unite: "euro",
      },
      itemToUpdate: {
        _id: this.$route.params.id,
        url: "",
        modele: "",
        prix: null,
        unite: "euro",
      },
    };
  },
  mounted() {
    this.getTelephoneById();
  },
  methods: {
    getTelephoneById() {
      fetch(this.apiUrl, {
        method: "GET",
        headers: {
          authorization: this.user + " " + this.token,
        },
      })
        .then((stream) => stream.json())
        .then((data) => (this.item = data))
        .then(() => (this.visible = true))
        .catch((error) => console.error(error));
    },
    updateItem() {
      this.item = this.itemToUpdate;
      this.updateVisibility = false;
      fetch(this.apiUrl, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: this.user + " " + this.token,
        },
        body: JSON.stringify(this.item),
      });
    },
    deleteItem() {
      fetch(this.apiUrl, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: this.user + " " + this.token,
        },
      }).then(() => this.$router.replace('/'));
    },
    cancelUpdate() {
      this.itemToUpdate = this.item;
      this.updateVisibility = false;
    },
  },
  computed: {
    ...mapState(["user", "token"]),
    apiUrl() {
      let url = "http://192.168.1.112:3000/api/telephone/" + this.item._id;
      console.log(url);
      return url;
    },
  },
  unmounted() {
    this.visible = false;
    this.updateVisibility = false;
    this.deleteVisibility = false;
  },
};
</script>

<style scoped>
img {
  width: 400px;
}

.update-delete {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
