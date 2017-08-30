<div class="autocomplete">
    <input
        class="autocomplete_input"
        @input="onInput($event.target.value)"
        @blur="onBlur"
        :value="value"
        :placeholder="placeholder"
    >
      <preloader v-if="loading" class="autocomplete_preloader" />
    </input>
    <ul
      class="suggestions-list"
      v-if="showSuggestions"
    >
        <li
          class="suggestions-list_item"
          v-for="(suggestion, index) of suggestions"
          :key="index"
          @click="selectSuggest(suggestion)"
        >{{ suggestion }}</li>
    </ul>
</div>
