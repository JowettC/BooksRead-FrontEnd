<script>
import { Bar,mixins  } from "vue-chartjs";

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  
  mounted () {
    this.renderChart(this.chartData, {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        responsive: true,
        maintainAspectRatio: false,
      },)
  }
  // mounted() {
  //   this.renderChart(
  //     // chartData
  //     {
  //       labels: this.chartData.dataLabel,
  //       datasets: [
  //         {
  //           label: "Data One",
  //           backgroundColor: "#f87979",
  //           data: this.chartData.dataSet
  //         }
  //       ]
  //     },

  //     { responsive: true, maintainAspectRatio: false }
  //   );
  // }
};
</script>
