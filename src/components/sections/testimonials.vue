<template>
  <div class="testimonials">
    <div class="container">
      <div class="heading">
        <span>Magical Listening Experience</span>
        <h2>What Client and Customers are Saying About Us</h2>
      </div>
      <div class="carousel-holder">
        <carousel :items="1" :loop="false" :dots="true" :autoWidth="false" :nav="false" :autoplay="true" :autoplayTimeout="4000">
          <div class="testimonial-slide">
            <div class="person-say">
              <p>Vulputate mi sit amet mauris commodo quis imperdiet. Dolor purus non enim praesent elementum facilisis leo. Maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Ac felis donec et odio pellentesque diam volutpat commodo sed. Ipsum consequat nisl vel pretium lectus quam id leo.</p>
              <h4>Mariam Mohammed</h4>
              <span>Fitness Coach</span>
            </div>
            <div class="person-img">
              <img src="../../assets/person3.jpg">
            </div>
          </div>
          <div class="testimonial-slide">
            <div class="person-say">
              <p>Vulputate mi sit amet mauris commodo quis imperdiet. Dolor purus non enim praesent elementum facilisis leo. Maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Ac felis donec et odio pellentesque diam volutpat commodo sed. Ipsum consequat nisl vel pretium lectus quam id leo.</p>
              <h4>Mariam Mohammed</h4>
              <span>Fitness Coach</span>
            </div>
            <div class="person-img">
              <img src="../../assets/person2.jpg">
            </div>
          </div>
          <div class="testimonial-slide">
            <div class="person-say">
              <p>Vulputate mi sit amet mauris commodo quis imperdiet. Dolor purus non enim praesent elementum facilisis leo. Maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Ac felis donec et odio pellentesque diam volutpat commodo sed. Ipsum consequat nisl vel pretium lectus quam id leo.</p>
              <h4>Mariam Mohammed</h4>
              <span>Fitness Coach</span>
            </div>
            <div class="person-img">
              <img src="../../assets/person4.jpeg">
            </div>
          </div>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";

export default {
  name: "testimonials",
  components: {
    carousel
  }
}
</script>

<style lang="scss" scoped>
.testimonials{
  padding: 100px 0;
  font-family: var(--main-font);
  .heading{
    span{
      font-size: 22px;
      font-family: var(--main-font);
      position: relative;
      width: fit-content;
      &::before{
        content: '';
        position: absolute;
        right: calc(50% - 25px);
        top: -20px;
        width: 50px;
        height: 1px;
        background: var(--main-color);
      }
    }
    h2{
      color: var(--main-color);
      font-weight: bold;
      margin: 20px 0 120px 0;
      font-size: 35px;
      font-family: var(--main-font);
      width: 100%;
      line-height: 1.25;
    }
  }
  .carousel-holder{
    .testimonial-slide{
      display: flex;
      margin-bottom: 60px;
      align-items: center;
      .person-say{
        flex: 2;
        order: 2;
        text-align: left;
        p{
          font-size: 18px;
          line-height: 1.7;
        }
        h4{
          font-weight: bold;
          font-size: 25px;
          margin: 40px 0 40px 0;
          position: relative;
          width: fit-content;
          &::before{
            content: '';
            position: absolute;
            left: 0;
            bottom: -20px;
            width: 50px;
            height: 1px;
            background: var(--main-color);
          }
        }
        span{
          margin-top: 40px;
          font-size: 18px;
          font-weight: 400;
        }
      }
      .person-img{
        order: 1;
        text-align: center;
        position: relative;
        flex: 2;
        img{
          width: 200px;
          height: 200px;
          margin: 0 auto;
          border-radius: 50%;
          transform: translate(20px, 30px);
          object-fit: cover;
        }
        &::before{
          content: '';
          position: absolute;
          width: 210px;
          height: 210px;
          background-color: rgba(252, 132, 107, 0.2);
          border-radius: 20px;
          top: 3px;
          left: 128px;
          transform: rotate(45deg);
        }
      }
    }
  }
}
@media (max-width: 576px) {
  .testimonials{
    .testimonial-slide{
      flex-direction: column;
      padding-inline: 20px;
      .person-say{
        margin-top: 70px !important;
        text-align: center !important;
        p{
          font-size: 16px !important;
        }
        h4{
          width: 100% !important;
          &::before{
            left: calc(50% - 25px) !important;
          }
        }
      }
      .person-img::before{
        width: 180px !important;
        height: 180px !important;
        top: 40px !important;
        left: -20px !important;
      }
    }
  }
}
</style>