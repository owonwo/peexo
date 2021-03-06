<template>
  <div class="vue-calendar__container">
    <div v-if="showYearSelector" class="container__year">
      <span
        v-for="i in 5"
        :key="i"
        class="year__chooser"
        @click="changeYear(i)"
      >{{ i + activeYear - 3 }}</span>
    </div>
    <div
      class="container__months"
      :class="{'hide-weekend': hideWeekend, 'hide-sunday': hideSunday}"
    >
      <CalendarCard
        class="container__month"
        v-for="n in 3"
        :key="`month-${getMonth(n)}`"
        :year="activeYear"
        :month="getMonth(n)"
        :activeDates="month[getMonth(n)]"
        :activeClass="activeClass"
        @toggleDate="toggleDate"
        :lang="lang"
        :prefixClass="prefixClass"
      />
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import CalendarCard from "./CalendarCard.vue";

window.dayjs = dayjs;

export default {
  name: "year-calendar",
  props: {
    showYearSelector: {
      type: Boolean,
      default: false
    },
    activeDates: {
      type: Array,
      default: () => [],
      validator: dateArray => {
        let isGood = true;
        let curDate = null;
        dateArray.forEach(date => {
          if (typeof date === "string") {
            curDate = date;
          } else if (typeof date === "object" && date.hasOwnProperty("date")) {
            curDate = date.date;
          }
          // 以下程式碼參考「How to validate date with format mm/dd/yyyy in JavaScript?」in Stackoverflow
          // 由於 「^\d{4}\-\d{1,2}\-\d{1,2}$」會被ESLint 判為錯誤，所以暫時關閉 EsLint 對下一行的驗證 by丁丁
          // eslint-disable-next-line no-useless-escape
          if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(curDate)) {
            isGood = false;
          }
          // Parse the date parts to integers
          var parts = curDate.split("-");
          var day = parseInt(parts[2], 10);
          var month = parseInt(parts[1], 10);
          var year = parseInt(parts[0], 10);
          if (year < 1000 || year > 3000 || month === 0 || month > 12)
            isGood = false;
          let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
            monthLength[1] = 29;
          if (!(day > 0 && day <= monthLength[month - 1])) isGood = false;
        });
        return isGood;
      }
    },
    // value 為從外層傳進來的 v-model="year"
    value: {
      type: [String, Number],
      default: dayjs().year()
    },
    lang: {
      type: String,
      default: "en"
    },
    activeClass: {
      type: String,
      default: () => ""
    },
    prefixClass: {
      type: String,
      default: () => "calendar--active"
    },
    hideWeekend: {
      type: Boolean,
      default: false
    },
    hideSunday: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isUsingString: true
    };
  },
  components: {
    CalendarCard
  },
  computed: {
    month() {
      const month = {};
      this.activeDates.forEach(date => {
        let oDate;
        if (typeof date === "string") {
          oDate = {
            date: date,
            className: this.activeClass
          };
        } else {
          // 若 activeDate 裡的物件少了 className 屬性，就自動填入空字串。否則會變成undefined
          oDate = {
            date: date.date,
            className: date.className || ""
          };
        }
        if (dayjs(oDate.date).year() !== this.value) return; // 讓2020年1月的資料，不會放到 2019年的1月資料裡
        let m = (dayjs(oDate.date).month() + 1).toString();
        if (!month[m]) month[m] = [];
        month[m].push(oDate);
      });
      return month;
    },
    activeYear: {
      get() {
        return parseInt(this.value); // this.value 為從外層傳進來的 v-model="year"
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    getMonth(n) {
      const month = dayjs().month() + n
      if (month > 12) {
        return 1;
      }
      return month;
    },
    changeYear(idx) {
      this.activeYear = idx + this.activeYear - 3;
    },
    toggleDate(dateObj) {
      const activeDate = dayjs()
        .set("year", this.value)
        .set("month", dateObj.month - 1)
        .set("date", dateObj.date)
        .format("YYYY-MM-DD");
      this.$emit("toggleDate", {
        date: activeDate,
        selected: dateObj.selected,
        className: dateObj.className
      });
      let dateIndex;
      let newDates;
      if (this.isUsingString) {
        dateIndex = this.activeDates.indexOf(activeDate);
        newDates = this.modifiedActiveDates(dateIndex, activeDate);
      } else {
        let oDate = {
          date: activeDate,
          className: dateObj.className // 原為 this.defaultClassName ，修正bug(丁丁)
        };
        dateIndex = this.activeDates.indexOf(
          this.activeDates.find(i => i.date === activeDate)
        );
        newDates = this.modifiedActiveDates(dateIndex, oDate);
      }
      this.$emit("update:activeDates", newDates);
    },
    modifiedActiveDates(dateIndex, activeDate) {
      let newDates = [...this.activeDates];
      if (dateIndex === -1) {
        newDates.push(activeDate);
      } else {
        newDates.splice(dateIndex, 1);
      }
      return newDates;
    }
  },
  created() {
    this.isUsingString =
      this.activeDates.length && typeof this.activeDates[0] === "string";
  }
};
</script>

<style lang="scss" scoped>
.vue-calendar__container {
  border-radius: 2px;
  min-width: 0;
  position: relative;
  text-decoration: none;

  .container__year {
    user-select: none;
    height: 65px;
    background-color: #fff;
    font-size: 24px;
    flex: 100%;
    text-align: center;
    display: flex;

    .year__chooser {
      height: 100%;
      flex: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(0, 0, 0, 0.9);

      &:hover {
        background-color: rgba(102, 102, 102, 0.1);
      }

      &:nth-child(4n-3) {
        color: rgba(0, 0, 0, 0.3);
      }

      &:nth-child(2n) {
        color: rgba(0, 0, 0, 0.6);
      }

      &:nth-child(3) {
        box-shadow: inset 0px -3px #4792bd;
      }
    }
  }

  .container__months {
    flex-wrap: wrap;
    display: flex;
    padding: 15px;
    justify-content: center;
  }

  .container__month {
    padding: 8px;
  }

  .p-0 {
    padding: 0px;
  }
}

@media (max-width: 1300px) {
  .vue-calendar__container .container__month {
    flex: 25%;
  }
}

@media (max-width: 992px) {
  .vue-calendar__container .container__month {
    flex: 33.3%;
  }
}

@media (max-width: 768px) {
  .vue-calendar__container .container__month {
    flex: 50%;
  }
}

@media (max-width: 450px) {
  .vue-calendar__container .container__month {
    flex: 100%;
  }
}
</style>

<style lang="scss">
.container__months {
  &.hide-sunday .calendar__day {
    &:nth-of-type(7n) {
      display: none;
    }

    flex: 16.66%;
  }

  &.hide-weekend .calendar__day {
    &:nth-of-type(7n),
    &:nth-of-type(7n-1) {
      display: none;
    }

    flex: 19%;
  }
}
</style>
