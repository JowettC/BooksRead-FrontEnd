<template>
  <div>
    <b-dropdown aria-role="list" v-model="reportChoice">
      <button class="button is-primary" slot="trigger">
        <span
          >Select Report - <b>{{ reportChoice }}</b></span
        >
      </button>

      <b-dropdown-item aria-role="listitem" value="Monthly"
        >Monthly</b-dropdown-item
      >
      <b-dropdown-item aria-role="listitem" value="Yearly"
        >Yearly</b-dropdown-item
      >
      <b-dropdown-item aria-role="listitem" value="ProgressYearly"
        >Overall Progress - Yearly</b-dropdown-item
      >
      <b-dropdown-item aria-role="listitem" value="ProgressMonthly"
        >Overall Progress - Monthly</b-dropdown-item
      >
    </b-dropdown>
    <monthly-report
      v-if="reportChoice == 'Monthly'"
      class="chart"
      :chartData="getMonthlyData"
    />
    <yearly-report
      v-if="reportChoice == 'Yearly'"
      class="chart"
      :chartData="getYearlyData.chartData"
    />
    <monthly-progress-report
      class="chart"
      :chartData="getMonthlyProgress"
      v-if="reportChoice == 'ProgressMonthly'"
    />
    <yearly-progress-report
      class="chart"
      :chartData="getYearlyProgress"
      v-if="reportChoice == 'ProgressYearly'"
    />
  </div>
</template>
<script>
import YearlyReport from "@/components/charts/YearlyReport.vue";
import MonthlyReport from "@/components/charts/MonthlyReport.vue";
import MonthlyProgressReport from "@/components/charts/MonthlyProgressReport.vue";
import YearlyProgressReport from "@/components/charts/YearlyProgressReport.vue";
import * as dayjs from "dayjs";

export default {
  data() {
    return {
      reportChoice: "Monthly",
      monthlyReport: [],
      yearlyReport: "",
      TwelveMonths: [],
    };
  },
  name: "Progress",
  components: {
    YearlyReport,
    MonthlyReport,
    MonthlyProgressReport,
    YearlyProgressReport,
  },
  mounted() {
    this.GetMonthly();
    this.getYearly();
    this.getLast12Months();
  },
  computed: {
    getMonthlyData() {
      const dataSet = [];
      var i;
      if (this.monthlyReport.length > 0) {
        for (i = 0; i < 12; i++) {
          if (this.monthlyReport[i] != null) {
            if (this.monthlyReport[i].month >= 10) {
              const compareDate =
                this.monthlyReport[i].year + "-" + this.monthlyReport[i].month;
              if (this.TwelveMonths.indexOf(compareDate) >= 0) {
                dataSet.push(this.monthlyReport[i].books_read);
              } else {
                dataSet.push(0);
              }
            } else {
              const compareDate =
                this.monthlyReport[i].year + "-0" + this.monthlyReport[i].month;
              if (this.TwelveMonths.indexOf(compareDate) >= 0) {
                dataSet.push(this.monthlyReport[i].books_read);
              } else {
                dataSet.push(0);
              }
            }
          } else {
            dataSet.push(0);
          }
        }
        const chartData = {
          labels: this.TwelveMonths,
          datasets: [
            {
              label: "Books Read",
              backgroundColor: "#7957D5",
              data: dataSet,
            },
          ],
        };
        return chartData;
      }
      return null;
    },
    getYearlyData() {
      const dataLabel = [];
      const dataSet = [];
      for (let val of this.yearlyReport) {
        dataLabel.push(val.year);
        dataSet.push(val.books_read);
      }
      const chartData = {
        labels: dataLabel,
        datasets: [
          {
            label: "Books Read",
            backgroundColor: "#7957D5",
            data: dataSet,
          },
        ],
      };

      return { chartData };
    },
    getYearlyProgress() {
      const dataLabel = [];
      const dataSet = [];
      var total = 0;
      for (let val of this.yearlyReport) {
        dataLabel.push(val.year);
        total += val.books_read;
        dataSet.push(total);
      }
      const chartData = {
        labels: dataLabel,
        datasets: [
          {
            label: "Books Read",
            data: dataSet,
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)",
          },
        ],
      };
      return chartData;
    },
    getMonthlyProgress() {
      const dataSet = [];
      var total = 0;
      var i;
      if (this.monthlyReport.length > 0) {
        for (i = 0; i < 12; i++) {
          if (this.monthlyReport[i] != null) {
            if (this.monthlyReport[i].month >= 10) {
              const compareDate =
                this.monthlyReport[i].year + "-" + this.monthlyReport[i].month;
              if (this.TwelveMonths.indexOf(compareDate) >= 0) {
                total += this.monthlyReport[i].books_read;
                dataSet.push(total);
              } else {
                dataSet.push(total);
              }
            } else {
              const compareDate =
                this.monthlyReport[i].year + "-0" + this.monthlyReport[i].month;
              if (this.TwelveMonths.indexOf(compareDate) >= 0) {
                total += this.monthlyReport[i].books_read;
                dataSet.push(total);
              } else {
                dataSet.push(total);
              }
            }
          }
        }

        const chartData = {
          labels: this.TwelveMonths,
          datasets: [
            {
              label: "Books Read",
              data: dataSet,
              backgroundColor: "transparent",
              borderColor: "rgba(1, 116, 188, 0.50)",
              pointBackgroundColor: "rgba(171, 71, 188, 1)",
            },
          ],
        };
        return chartData;
      }
      return null;
    },
  },
  methods: {
    getLast12Months() {
      const res = [];
      var i;
      for (i = 0; i < 12; i++) {
        res.push(
          dayjs()
            .add(-i, "month")
            .format("YYYY-MM")
        );
      }
      this.TwelveMonths = res;
    },
    async GetMonthly() {
      const res = await this.$http
        .get("api/books/monthly", {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .json();
      if (res.error) {
        console.log(res.error);
      } else {
        this.monthlyReport = res;
      }
    },
    async getYearly() {
      const res = await this.$http
        .get("api/books/yearly", {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .json();
      if (res.error) {
        console.log(res.error);
      } else {
        this.yearlyReport = res;
      }
    },
  },
};
</script>
<style>
.chart {
  max-width: 1000px;
  margin: auto;
  max-height: 500px;
}
</style>
