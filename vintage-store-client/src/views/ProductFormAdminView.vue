<template>
  <main class="main-column">
    <h1>Cadastro de Produto</h1>
    <div class="flex-col">
      <img v-if="imgSrc" :src="imgSrc" class="image-select-display">
      <img v-else src="/assets/product_img_placeholder.png" class="image-select-display">
      <!-- This input is hidden. It is activated through the button -->
      <input type="file" @change="uploadFile" ref="fileInput" style="display: none">
    </div>
    <br>
    <Button color="light-gray" @click="selectFile">Editar</Button>
    <br>
    <TextField
      label="title"
      name="Título"
      placeholder="Título..."
      v-model="title"
      :width="30"
    ></TextField>
    <TextField
      label="description"
      name="Descrição"
      placeholder="Descrição curta..."
      v-model="description"
      :width="30"
    ></TextField>
    <TextArea
      label="longDescription"
      name="Detalhes"
      placeholder="Descrição longa..."
      v-model="longDescription"
      :width="36"
     
    ></TextArea>
    <TextField
      label="price"
      name="Preço"
      placeholder="Preço..."
      v-model="price"
      :width="4"
    ></TextField>
    <TextField
      label="nInStock"
      name="Estoque"
      placeholder="Estoque..."
      v-model="nInStock"
      :width="4"
    ></TextField>
    <br>
    <Button @click="save">Salvar</Button>
    <LoadingModal v-if="isLoading"></LoadingModal>
  </main>
</template>

<script>
import TextField from "@/components/TextField.vue";
import Button from "@/components/Button.vue";
import LoadingModal from "@/components/LoadingModal.vue";
import TextArea from "@/components/TextArea.vue"

export default {
  components: {
    TextField,
    Button,
    LoadingModal,
    TextArea,
  },
  data: () => ({
    isLoading: true,

    /* product attributes */
    title: "",
    brand: "",
    price: "",
    description: "",
    colors: [],
    defaultColor: 0,
    imgSrc: "",
    longDescription: "",
    nSold: "",
    nInStock: "",
  }),
  created() {
    // We are not editing an existing product, so there is nothing to load
    if (!this.$route.params.id) {
      this.isLoading = false;
      return;
    }

    (async () => {
      const product = await this.$store.dispatch("fetchOrGetProduct", this.$route.params.id);
      for (const key of Object.keys(product)) {
        if (typeof product[key] !== "string") this[key] = product[key].toString();
        else this[key] = product[key];
      }
      this.isLoading = false;
    })()
  },
  methods: {
    async save() {
      // TODO: data validation
      if((/^[a-zA-Z\s.,!:;?/]*$/.test(this.title))
      && (/^[a-zA-Z\s.,!:;?/]*$/.test(this.brand))
      && (/^[0-9.]*$/.test(this.price))
      && (/^[a-zA-Z\s.,!:;?/]*$/.test(this.description))
      && (/^[a-zA-Z\s.,!:;?/]*$/.test(this.longDescription))
      && (/^[0-9]*$/.test(this.nSold))
      && (/^[0-9]*$/.test(this.nInStock))){

        const productObj = {
          title: this.title,
          brand: this.brand,
          price: parseInt(this.price),
          description: this.description,
          colors: this.colors,
          defaultColor: this.defaultColor,
          imgSrc: this.imgSrc,
          longDescription: this.longDescription,
          nSold: (this.nSold && parseInt(this.nSold)) || 0,
          nInStock: parseInt(this.nInStock),
        };

        this.isLoading = true;
        // If we are editing an existing object
        let res;
        if (this.$route.params.id) {
          productObj.id = parseInt(this.$route.params.id);
          res = await this.$store.dispatch("updateProduct", productObj);
        } else {
          res = await this.$store.dispatch("createProduct", productObj);
        }
        if (res instanceof Error) {
          console.error(res);
          alert("Um erro inexperado ocorreu, tente novamente");
        }
        this.isLoading = false;
        this.$router.back();

      }
    },
    uploadFile(e) {
      if (!e.target?.files || e.target.files.length <= 0 || !e.target.files[0]) return;
    	this.imgSrc = URL.createObjectURL(e.target.files[0]);
    },
    selectFile() {
      // Open the file selection
      this.$refs.fileInput.click();
    }
  }
}
</script>

<style>
.image-select-display {
  width: 400px;
}
</style>