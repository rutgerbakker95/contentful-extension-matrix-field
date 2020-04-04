<template>
  <div>
    <div
      v-for="(row, rowIndex) in rows"
      :key="rowIndex"
    >
      <!-- Output -->
      <!-- <pre>{{ row }}</pre> -->

      <!-- Video Component -->
      <card
        v-if="row.fieldType === 'video'"
        title="Video component"
        :card-index="rowIndex"
        @onremove="deleteRow(rowIndex)"
        @onmove="moveRow"
      >
        <div class="c-input">
          <label
            class="c-input__label"
            :for="`field-${rowIndex}`"
          >
            Embed URL or ID
          </label>
          <input
            :id="`field-${rowIndex}`"
            class="c-input__field"
            type="text"
            :value="row.embedUrl"
            :name="`field-${rowIndex}`"
            @input="updateInputValue($event, rowIndex, 'embedUrl')"
          >
        </div>
      </card>

      <!-- Image Component -->
      <card
        v-if="row.fieldType === 'image'"
        :card-index="rowIndex"
        title="Image component"
        @onremove="deleteRow(rowIndex)"
        @onmove="moveRow"
      >
        <div class="c-input">
          <label class="c-input__label">
            Image
          </label>
          <button
            class="c-link"
            type="button"
          >
            <icon-plus class="c-link__icon" />
            Create new asset and link
          </button>
          <button
            class="c-link"
            type="type"
            name="button"
          >
            <icon-link class="c-link__icon" />
            Link existing asset
          </button>
        </div>
        <div class="c-input">
          <p class="c-input__label">
            Align in layout container
          </p>
          <label
            class="c-radio"
            :for="`field-${rowIndex}-true`"
          >
            <input
              :id="`field-${rowIndex}-true`"
              type="radio"
              name="container"
              :value="true"
              @input="updateInputValue($event, rowIndex, 'container')"
            >
            Yes
          </label>
          <label
            class="c-radio"
            :for="`field-${rowIndex}-false`"
          >
            <input
              :id="`field-${rowIndex}-false`"
              type="radio"
              name="container"
              :value="false"
              @input="updateInputValue($event, rowIndex, 'container')"
            >
            No
          </label>
        </div>
      </card>

      <!-- Title -->
      <card
        v-if="row.fieldType === 'title'"
        :card-index="rowIndex"
        title="Title"
        @onremove="deleteRow(rowIndex)"
        @onmove="moveRow"
      >
        <div class="c-input">
          <label
            class="c-input__label"
            :for="`field-${rowIndex}`"
          >
            Title
          </label>
          <input
            :id="`field-${rowIndex}`"
            class="c-input__field"
            type="text"
            :value="row.title"
            :name="`field-${rowIndex}`"
            @input="updateInputValue($event, rowIndex, 'title')"
          >
        </div>
      </card>
    </div>

    <!-- Select field types group -->
    <div class="button-group">
      <button
        v-if="params.video"
        type="button"
        @click="addRow({ fields: {}, embedUrl: '', fieldType: 'video' })"
      >
        + add video
      </button>
      <button
        v-if="params.title"
        type="button"
        @click="addRow({ title: '', fieldType: 'title' })"
      >
        + add title
      </button>
      <button
        v-if="params.image"
        type="button"
        @click="addRow({ fields: {}, fieldType: 'image', container: false })"
      >
        + add image
      </button>
    </div>
  </div>
</template>

<script>
import { init as initContentfulExtension } from 'contentful-ui-extensions-sdk';

// Components
import Card from '@/components/Card.vue';
import IconLink from '@/components/IconLink.svg.vue';
import IconPlus from '@/components/IconPlus.svg.vue';

export default {
  components: { Card, IconLink, IconPlus },

  data() {
    return {
      sdk: null,
      rows: [],
      params: {},
    };
  },

  mounted() {
    initContentfulExtension((extension) => {
      this.sdk = extension;
      this.sdk.window.startAutoResizer();
      this.params = this.sdk.parameters.instance;

      if (this.sdk.field.getValue().entries) {
        this.rows = this.sdk.field.getValue().entries;
      }
    });
  },

  methods: {
    /**
     * Method for updating the fields to SDK.
     */
    updateFields() {
      this.sdk.field.setValue({
        entries: this.rows,
      });
    },

    /**
     * Push row field to array
     * @param {String} field - name of field pushed to the SDK.
     */
    addRow(field) {
      this.rows.push(field);
      this.updateFields();
    },

    /**
     * Delete row field from array
     * @param {Number} index - index number of current row.
     */
    deleteRow(index) {
      this.$delete(this.rows, index);
      this.updateFields();
    },

    /**
     * Move row to current direction
     * @param {Object} value - { direction, index }
     */
    moveRow(value) {
      let newIndex;

      const { direction, index } = value;

      // Check direction and set new index value
      newIndex = direction === 'down' ? index + 1 : index - 1;

      // Move card to end of the array if value is lower then zero 0
      if (newIndex < 0) newIndex = this.rows.length - 1;

      // Move card to the begin of the array if value is greater then total length
      if (newIndex > this.rows.length - 1) newIndex = 0;

      const row = this.rows.splice(index, 1)[0];

      this.rows.splice(newIndex, 0, row);
      this.updateFields();
    },

    /**
     * Watch and update input text fields value.
     * @event $event - input event.
     * @param {Number} index - index number of current row.
     * @param {String} field - name of field pushed to the SDK.
     */
    updateInputValue($event, index, field) {
      this.rows[index][field] = $event.target.value;
      this.updateFields();
    },

    /**
     * Select existing single asset from SDK.
     * @param {Number} index - index number of current row.
     */
    async selectExistingAsset(index) {
      const selectedAsset = await this.sdk.dialogs.selectSingleAsset();
      const defaultLocale = this.sdk.locales.default;

      if (selectedAsset !== null) {
        this.rows[index].fields = selectedAsset.fields.file[defaultLocale];
      }

      this.updateFields();
    },
  },
};
</script>

<style lang="scss">
.button-group {
  display: flex;
  position: relative;
}
</style>
