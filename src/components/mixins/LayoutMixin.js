import Vue from 'vue'

export const Container = Vue.component('Container', {
  render(h) {
    return h('section', {
      class: ['root-cont'],
    }, this.$slots.default)
  },
})

const createWrapper = className => ({
  props: {
    grid: {
      type: Boolean,
    },
    list: {
      type: Boolean,
    },
  },
  render(h) {
    return h('section', {
      class: [
        className,
        this.$props.grid && 'is-grid',
        this.$props.list && 'is-list',
      ],
    }, this.$slots.default)
  },
})

export const TouchContainer = createWrapper('touch-grid')

export const ProductContainer = createWrapper('card-container')

export default {
  components: {
    Container,
    TouchContainer,
    ProductContainer,
  },
}
