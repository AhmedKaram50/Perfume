<template>
  <div class="dashboard-cards">
    <div class="container">
      <h3 class="title">Statistics</h3>
      <div class="row">
        <div
          class="col-lg-4"
          v-for="card in cardsInformation"
          :key="card.title"
        >
          <div class="card p-4">
            <div class="info d-flex align-items-center">
              <div class="img">
                <img :src="require(`../../assets/icons/${card.icon}`)" alt="" />
              </div>
              <div class="text text-left">
                <h5>{{ card.title }}</h5>
                <span>{{ counts[card.nameId] }}</span>
              </div>
            </div>
            <div class="link">
              <a href="#"
                >Go to {{ card.nameId }} <fa-icon :icon="['fas', 'chevron-right']"/></a>
            </div>
          </div>
        </div>
      </div>
      <h3 class="title second">Statistics</h3>
      <div class="charts-wraper">
        <div class="chart-holder">
          <bar-chart
            :chartData="chartDataData"
            :height="chartHeight"
            :options="chartOption"
          />
        </div>
        <div class="chart-holder">
          <PieChart
            :chartData="PieData"
            :height="pieHeight"
            :options="pieOptions"
          />
        </div>
        <div class="chart-holder two-span">
          <LineChart
            :chartData="LineData"
            :height="lineHeight"
            :options="pieOptions"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BarChart from "../../components/BarChart.vue";
import PieChart from "../../components/PieChart.vue";
import LineChart from "../../components/LineChart.vue";
export default {
  name: "AdminHome",
  components: {
    BarChart,
    PieChart,
    LineChart,
  },
  data() {
    return {
      chartHeight: 200,
      pieHeight: 300,
      lineHeight: 200,
      chartDataData: {
        labels: [
          "يناير",
          "فبراير",
          "مارس",
          "إبريل",
          "مايو",
          "يونيو",
          "يوليو",
          "أغسطس",
          "سبتمبر",
          "أكتوبر",
          "نوفمبر",
          "ديسمبر",
        ],
        datasets: [
          {
            label: "الارباح بالشهور",
            data: [
              2000, 2000, 10000, 8000, 7000, 2000, 1000, 9000, 5000, 4000,
              10000, 1000,
            ],
            backgroundColor: [
              "#fc846b",
              "#40739e",
              "#fc846b",
              "#40739e",
              "#fc846b",
              "#40739e",
              "#fc846b",
              "#40739e",
              "#fc846b",
              "#40739e",
              "#fc846b",
              "#40739e",
            ],
            borderColor: "#444",
            borderSkipped: "start",
            borderWidth: "2",
          },
        ],
      },
      chartOption: {
        responsive: true,
      },
      PieData: {
        labels: ["Men", "Women", "Children", "Gender", "Si"],
        datasets: [
          {
            label: "Most Category Getting Money",
            data: [5000, 2000, 10000, 8000, 7000],
            backgroundColor: [
              "#fc846b",
              "#30336b",
              "#7ed6df",
              "#40739e",
              "#ff7979",
            ],
            borderColor: "#444",
            borderSkipped: "start",
            borderWidth: "2",
          },
        ],
      },
      LineData: {
        labels: [
          "يناير",
          "فبراير",
          "مارس",
          "إبريل",
          "مايو",
          "يونيو",
          "يوليو",
          "أغسطس",
          "سبتمبر",
          "أكتوبر",
          "نوفمبر",
          "ديسمبر",
        ],
        datasets: [
          {
            label: "الارباح بالشهور",
            data: [
              2000, 2000, 10000, 8000, 7000, 2000, 8000, 9000, 5000, 4000,
              10000, 1000,
            ],
            backgroundColor: "#fc846b",
            borderColor: "#555",
            borderSkipped: "start",
            borderWidth: "2",
          },
        ],
      },
      pieOptions: { responsive: true },
      cardsInformation: [
        {
          title: "Users Count",
          urlTitle: "go to users",
          url: "/users",
          count: 100,
          icon: "01.png",
          nameId: "users",
        },
        {
          title: "Posts Count",
          urlTitle: "go to users",
          url: "/users",
          count: 100,
          icon: "02.png",
          nameId: "posts",
        },
        {
          title: "Categories Count",
          urlTitle: "go to users",
          url: "/users",
          count: 100,
          icon: "03.png",
          nameId: "categories",
        },
        {
          title: "Today Sells Count",
          urlTitle: "go to users",
          url: "/users",
          count: 100,
          icon: "04.png",
          nameId: "categories",
        },
        {
          title: "Blogs Count",
          urlTitle: "go to users",
          url: "/users",
          count: 100,
          icon: "pos.png",
          nameId: "categories",
        },
        {
          title: "Visits Count",
          urlTitle: "go to users",
          url: "/users",
          count: 100,
          icon: "project.png",
          nameId: "categories",
        },
        {
          title: "Total Earning",
          urlTitle: "go to users",
          url: "/users",
          count: 5000,
          icon: "relationship.png",
          nameId: "categories",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["getAllCounts"]),
  },
  computed: {
    myStyle() {
      return {};
    },
    ...mapGetters(["counts", "isInformationLoaded"]),
  },
  mounted() {
    // this.renderChart(this.chartData, this.chartOptions);
    this.getAllCounts();
  },
  created() {},
};
</script>

<style lang="scss" scoped>
body {
  background-color: #f2f6f9 !important;
}

@import "../../sass/config";
.dashboard-cards {
  font-family: var(--main-font);
  padding: 30px 0;
  background-color: #f2f6f9;
  h3.title {
    text-align: left;
    font-size: 32px;
    font-weight: 500;
    margin-top: 15px;
    &.second {
      margin-top: 50px;
      margin-bottom: 50px;
    }
  }
  .card {
    $main-color: #1f1a24;
    background-color: $main-color;
    color: #fff;
    border-radius: 6px;
    margin-top: 25px;
    box-shadow: $main-shadow;
    .info {
      .img {
        width: 70px;
        height: 70px;
        margin-right: 30px;
        background-color: rgba(255, 255, 255, 0.15);
        border-radius: 8px;
        padding: 15px;
        img {
          @extend %img-props;
        }
      }
      .text {
        text-align: left;
        h5 {
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 2px;
        }
        span {
          font-weight: bold;
          font-size: 26px;
        }
      }
    }
    .link {
      margin-top: 15px;
      a {
        text-decoration: none;
        color: #fff;
        font-size: 14px;
        svg {
          font-size: 11px;
          margin-left: 10px;
        }
      }
    }
  }
}

.charts-wraper {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  .two-span {
    grid-column: 2 span;
  }
}

.chart-holder {
  // margin-top: 100px;
  margin-bottom: 5px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 10px 10px 20px #b0b8d617,
    10px 10px 15px -5px rgb(176 184 214 / 20%);
  border-radius: 8px;
}
</style>
