<template>
  <div class="c-card">
    <header class="c-card__header">
      <span class="c-card__title">
        {{ title }}
      </span>
      <button
        class="c-card__icon-btn"
        :class="{ 'is-active' : settingsOpen }"
        type="button"
        @click="toggleSettings"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 14.6 18"
        >
          <path d="M12.9 9.7c0-.2.1-.5.1-.7s0-.5-.1-.7L14.5 7c.1-.1.2-.3.1-.5L13 4c-.1-.2-.3-.2-.5-.2l-1.9.8c-.3-.4-.7-.6-1.2-.8l-.3-2c0-.2-.2-.3-.4-.3h-3c-.2 0-.3.1-.4.3l-.3 2c-.3.2-.7.4-1.1.7L2 3.8c-.2-.1-.4 0-.4.2L.1 6.5c-.1.2-.1.4 0 .5l1.6 1.2c0 .2-.1.5-.1.7s0 .5.1.7L.1 11c-.1.1-.1.3 0 .5L1.6 14c.1.2.3.2.5.2l1.9-.8c.4.3.8.5 1.3.7l.3 2c0 .2.2.3.4.3h3c.2 0 .3-.1.4-.3l.3-2c.5-.2.9-.4 1.3-.7l1.9.8c.2.1.4 0 .5-.2l1.5-2.6c.1-.2.1-.4-.1-.5l-1.9-1.2zm-5.6 1.9c-1.4 0-2.6-1.2-2.6-2.6s1.2-2.6 2.6-2.6S9.9 7.6 9.9 9s-1.2 2.6-2.6 2.6z" />
        </svg>
        <div
          class="c-card__dropdown"
          :class="{ 'is-active' : settingsOpen }"
        >
          <!-- Move up -->
          <button
            type="button"
            @click="moveCard('up')"
          >
            Move up
          </button>
          <!-- Move down -->
          <button
            type="button"
            @click="moveCard('down')"
          >
            Move down
          </button>
          <!-- Remove card -->
          <button
            class="text-negative"
            type="button"
            @click="removeCard"
          >
            Remove
          </button>
        </div>
      </button>
    </header>
    <div class="c-card__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',

  props: {
    title: {
      type: String,
      required: true,
    },
    cardIndex: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      settingsOpen: false,
    };
  },

  methods: {
    toggleSettings() {
      this.settingsOpen = !this.settingsOpen;
    },
    closeSettings() {
      this.settingsOpen = false;
    },
    removeCard() {
      this.$emit('onremove');
    },
    /**
     * @param {String} value 'up' or 'down'
     */
    moveCard(value) {
      this.$emit('onmove', { direction: value, index: this.cardIndex });
    },
  },
};
</script>

<style lang="scss" scoped>
.c-card {
  display: block;
  position: relative;
  margin-top: 10px;
  margin-bottom: 10px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 8px;
    padding-right: 20px;
    padding-bottom: 8px;
    padding-left: 20px;
    background-color: $color-element-lightest;
    border: 1px solid $color-element-mid;
  }

  &__title {
    font-weight: 500;
    color: $color-text-mid;
  }

  &__content {
    padding: 20px;
    border-right: 1px solid $color-element-mid;
    border-bottom: 1px solid $color-element-mid;
    border-left: 1px solid $color-element-mid;
  }

  &__icon-btn {
    position: relative;
    z-index: 999;
    padding-right: 5px;
    padding-left: 5px;
    color: $color-text-mid;
    background-color: $color-element-lightest;

    &:hover,
    &:focus,
    &.is-active {
      color: $color-text-dark;
    }
  }

  &__dropdown {
    position: absolute;
    top: 20px;
    right: 0;
    z-index: 999;
    min-width: 120px;
    padding-top: 8px;
    padding-bottom: 8px;
    visibility: hidden;
    background-color: $white;
    border: 1px solid $color-element-mid;
    box-shadow: 0 2px 10px rgba($color-text-dark, .1);
    opacity: 0;
    transition: all 150ms ease-in-out;

    &.is-active {
      visibility: visible;
      opacity: 1;
    }

    button {
      display: block;
      width: 100%;
      padding: 6px 10px;
      font-size: 14px;
      text-align: left;

      &:hover,
      &:focus {
        background-color: $color-element-light;
      }
    }
  }
}
</style>
