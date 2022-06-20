
<template>
  <CarouselMain :slides="slides" :interval="4000" controls indicators></CarouselMain>
</template>

<script>
import CarouselMain from "./CarouselMain.vue";

export default {
  components: { CarouselMain },
  data()  {
    return {
      slides: [
        "https://www.apetogentleman.com/wp-content/uploads/2018/06/top-male-models.jpg",
        "https://static.standard.co.uk/s3fs-public/thumbnails/image/2017/03/29/17/scotch-and-soda-header.jpg?width=968",
        "https://img.freepik.com/fotos-gratis/jovem-bonito-em-roupas-de-calca-jeans-casual-da-moda-em-elegantes-tenis-brancos-sentar-no-parapeito-de-madeira-na-cidade-cara-na-moda-na-moda-em-jovens-vintage-jeans-desgaste-na-rua-moda-masculina-de-verao_338491-9033.jpg?w=2000"
      ],
    }
  }
};
</script>

<style></style>