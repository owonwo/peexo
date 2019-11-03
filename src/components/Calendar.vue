<template>
  <div>
    <div class="calendar-section py-10">
      <section class="flex justify-center">
      </section>

      <div class="text-center">
        <!-- <div class="calendar-nav inline-flex">
          <div></div>
          <div></div>
          <div></div>
        </div> -->
        <year-card v-model="year"
            :activeDates.sync="activeDates"
            @toggleDate="toggleDate"
            prefixClass="peexo-booked"
            :activeClass="activeClass"
            />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.calendar--active {
  background-color: #0aa;
  color: white;

  &.red {
    background-color: #a00;
    color: white;

    &:after {
      background-image: url("../assets/baseline-remove_circle-24px.svg");
      background-size: 100% 100%;
    }
  }

  &.blue {
    background-color: #0000aa;
    color: white;
  }

  &.calendar--active {
    background-color: yellow;
    color: black;
  }
}
</style>

<script>
import dayjs from 'dayjs';
import YearCard from './YearCard.vue';
import CalendarCard from './CalendarCard.vue';

export default {
  name: 'Calendar',
  components: { CalendarCard, YearCard },
  data: () => ({
      year: 2019,
      activeClass: '',
    activeDates: [
      { date: '2019-11-13' },
      { date: '2019-11-14', className: 'red' },
      { date: '2019-11-15', className: 'blue' },
      { date: '2019-11-16', className: 'your_customized_classname' },
    ],
  }),
  methods: {
    dayjs,
    toggleDate(dateObj) {
        this.log(dateObj)
    },
  },
};
</script>

<style lang="scss">
.peexo-booked {
    background-color: #0aa;
    color: #fff;

    &.red {
        background-color: #f00;
        color: #fff;

        &:after {
        background-image: url("../assets/baseline-remove_circle-24px.svg");
        background-size: 100% 100%;
        }
    }

    &.blue {
        background-color: #00a;
        color: #fff;
    }

    &.your_customized_classname {
        background-color: #ff0;
        color: #000;
    }
    }
</style>