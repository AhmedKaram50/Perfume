<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ["options"],
  data() {
    return {
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
              1000, 2000, 10000, 8000, 7000, 2000, 1000, 9000, 5000, 4000,
              10000, 1000,
            ],
            backgroundColor: [
              "#ffa9b5",
              "#82c3f7",
              "#82c3f7",
              "#8dd2da",
              "#c4abff",
              "#ffc78c",
              "#ffa9b5",
              "#82c3f7",
              "#82c3f7",
              "#8dd2da",
              "#c4abff",
              "#ffa9b5",
            ],
            borderColor: "#444",
            borderSkipped: "start",
            borderWidth: "2",
          },
        ],
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>

<style lang="scss" scoped></style>
