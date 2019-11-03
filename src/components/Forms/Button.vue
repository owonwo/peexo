<template>
  <button :disabled="disabled" class="wg-button" @click="$emit('click')">
    {{ $props.text }}
  </button>
</template>

<style lang="scss">
  @mixin hover-shadow($color) {
    transition: all .3s ease-out;

    &:hover, &:focus {
      box-shadow: 0 2px 6px rgba($color, .78);
    }
  }

  .wg-button {
    border: none;
    color: #0a4065;
    cursor: pointer;
    font-size: 1rem;
    line-height:  26px;
    text-align: center;
    padding: .5rem 1.5rem;
    // letter-spacing: 1px;
    text-decoration: none;
    transition: all .3s ease-out;
    background-color: transparent;
    font-family: Avenir, sans-serif;
    border-radius: var(--small-border-radius, 5px);

    &.primary {
      color: white;
      color: #ffffff;
      background-color: var(--primary-color);
      box-shadow: 0 0px 10px 0 transparent;

      &:hover, &:focus {
          box-shadow: 0 15px 29px 0 var(--shadow-color);
      }
    }
    //changes to the green variant
    &.is-success {
      color: #2e394c;
      background-color: #0AC756;

      @include hover-shadow(#08A045);
    }

    &.is-danger, &.btn-red {
      color: white;
      background-color: #E21800;

      @include hover-shadow(#E21800);
    }

    &.is-outline {
      color: inherit;
      border-radius: 4px;
      letter-spacing: 0;
      background-color: transparent;
      border:solid 1px var(--border-color);

      &:hover {
        color: #333;
        border-color: #333;
      }

      .card-dark & {
        &:hover {
          background-color: rgba(white, .58)
        }
      }
    }

    &.is-grey {
      color: white;
      background-color: grey;

      &:hover, &:focus {
        background-color: darken(grey, 10%);
      }
    }

    &.shadow-none {
      box-shadow: none;
    }

    &.is-small {
      height: 40px;
      font-size: 16px;
      padding: 0 25px;
      line-height: 40px;
      border-radius: 4px;
      font-weight: normal;
      box-sizing: border-box;
    }

    &:disabled {
      opacity: .3;
    }
  }
</style>
<script>
export default {
  // functional: true,
  name: 'Button',
  props: ['text', 'disabled'],
};
</script>
