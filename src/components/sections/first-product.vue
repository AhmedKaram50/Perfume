<template>
    <div class="first-product d-flex justify-content-center container">
      <div class="product-img">
        <img :src="require(`../../assets/${imageSrc}.png`)">
      </div>
      <div class="info">
        <span>{{ span }}</span>
        <h2>{{ title }}</h2>
        <p>{{ paragraph }}</p>
        <button class="main-btn">Buy Now</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'first-product',
  props: {
    span: {default: "span is here"},
    title: {default: "title is here"},
    paragraph: {default: "paragraph is here"},
    imageSrc: {default: ""},
  }
}
</script>

<style lang="scss" scoped>
.first-product{
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 80px 70px;
  margin-bottom: 40px;
  color: var(--second-color);
  align-items: center;
  gap: 50px;
  .info{
    text-align: left;
    flex: 2;
  }
  .product-img{
    flex: 2;
    img{
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  span{
    font-size: 22px;
    font-family: var(--main-font);
    position: relative;
    width: fit-content;
    &::before{
      content: '';
      position: absolute;
      top: 60%;
      right: -60px;
      width: 50px;
      height: 1px;
      background: var(--main-color)
    }
  }
  h2{
    color: var(--main-color);
    font-weight: bold;
    margin: 10px 0 25px 0;
    font-size: 50px;
    font-family: var(--main-font);
    width: 100%;
    line-height: 1.25
  }
  p{
    font-family: var(--main-font);
    font-size: 17px;
    margin: 0 0 30px 0;
    font-weight: 300;
  }
}

.first-product:nth-child(even) .product-img{
  order: 1
}
.first-product:nth-child(even) .info{
  order: 2
}
.first-product:nth-child(odd) .product-img{
  order: 2
}
.first-product:nth-child(odd) .info{
  order: 1
}

@media (max-width: 576px) {
  .first-product{
    flex-direction: column-reverse;
    padding: 40px 20px;
    .info{
      margin-bottom: 30px;
      order: 2 !important;
    }
    .product-img{
      order: 1 !important;
    }
  }
}
</style>