<template>
  <div class="blog">
    <div class="blog-img">
      <img :src="require(`../assets/${imageName}.jpg`)" alt="">
    </div>
    <div class="blog-info">
      <h4><router-link to="#"> {{ title }} </router-link></h4>
      <div class="blog-status d-flex">
        <fa-icon :icon="['fas', 'user']" />
        <span>By {{ author }}</span> <small>|</small>
        <fa-icon :icon="['fas', 'clock']" />
        <span>{{ date }}</span>
      </div>
      <p>
        <slot></slot>
      </p>
      <button class="main-btn"><router-link to="#">Read More</router-link></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "blog",
  props: {
    title: {default: "Title Is Here"},
    author: {default: "Ahmed Karam"},
    date: {default: "August 4, 2021"},
    imageName: {default: "blog2"},
  }
}
</script>

<style lang="scss" scoped>
.blog{
  text-align: left;
  .blog-img{
    border-radius: 15px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    &::before{
      content: '';
      position: absolute;
      bottom: -60;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(180deg, rgba(252, 132, 107, 0), #fc846b);
      opacity: 0;
      border-radius: 0;
      transition: opacity 0.4s ease-in-out;
    }
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .blog-info{
    h4{
      margin: 25px 0;
      a{
        color: var(--second-color);
        text-decoration: none;
        font-weight: 600;
        transition: color 0.4s ease-in-out;
        font-size: 23px;
        &:hover{
          color: var(--main-color);
        }
      }
    }
    .blog-status{
      align-items: center;
      font-size: 15px;
      svg{
        color: var(--main-color)
      }
      small{
        margin-inline: 10px;
      }
      span{
        margin-left: 10px;
        font-weight: bold;
        color: var(--second-color);
      }
    }
    p{
      color: var(--second-color);
      margin: 20px 0;
      line-height: 1.7
    }
    button {
      margin-top: 10px;
      a{
        transition: all 0.4s ease-in-out
      }
    }
  }
  &:hover .blog-img::before{
    opacity: 0.8
  }
}
</style>