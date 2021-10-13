<template>
  <div class="features d-flex">
    <div class="info">
      <div class="heading">
        <span>Advanced Features</span>
        <h2>Ultmate Heaven Smell and Stability</h2>
      </div>
      <ul>
        <li>
          <fa-icon :icon="['fas', 'magic']" />
          <p>Stable Smell for ever</p>
        </li>
        <li>
          <fa-icon :icon="['fas', 'wine-bottle']" />
          <p>Big buttles to long use</p>
        </li>
        <li>
          <fa-icon :icon="['fas', 'shower']" />
          <p>Heaven smell making girls run at you</p>
        </li>
        <li>
          <fa-icon :icon="['fas', 'coins']" />
          <p>Cheap Price</p>
        </li>
        <li>
          <fa-icon :icon="['fas', 'prescription-bottle']" />
          <p>Refull Avalable</p>
        </li>
        <li>
          <fa-icon :icon="['fas', 'heartbeat']" />
          <p>Easy To Use and Beatiful</p>
        </li>
      </ul>
      <button class="main-btn">
        <router-link to="/blo">Buy Now</router-link>
      </button>
    </div>
    <div class="features-image">
      <img src="../../assets/perfume6.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'features'
}
</script>

<style lang="scss" scoped>
.features{
  padding: 110px 0;
  background-color: var(--main-color);
  font-family: var(--main-font);
  color: #fff;
  text-align: left;
  align-items: center;
  .info{
    flex: 2;
    order: 2;
    padding-left: 30px;
    .heading{
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
          background: #fff
        }
      }
      h2{
        color: #373737;
        font-weight: bold;
        margin: 20px 0 50px 0;
        font-size: 35px;
        font-family: var(--main-font);
        width: 100%;
        line-height: 1.25
      }
    }
    ul{
      list-style: none;
      text-align: left;
      padding: 0;
      li{
        display: flex;
        align-items: center;
        margin: 30px 0;
        font-size: 27px;
        p{
          margin: 0 10px;
          font-weight: 600
        }
        svg{
          margin-right: 15px;
        }
      }
    }
    button.main-btn{
      margin-top: 15px;
      &:hover{
        background-color: #fff;
        color: var(--second-color);
      }
    }
  }
  .features-image{
    flex: 2;
    order: 1;
    text-align: center;
    img{
      width: 55%;
      height: 100%;
      object-fit: cover;
    }
  }
}
@media (max-width: 576px) {
  .features{
    flex-direction: column-reverse;
    padding-inline: 25px;
    // padding: 40px 20px;
    .info{
      margin-bottom: 30px;
      order: 2 !important;
      padding: 0;
      p{
        font-size: 18px !important;
      }
    }
    .features-image{
      order: 1 !important;
      margin-top: 30px;
    }
  }
}
</style>