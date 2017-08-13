<div>
    <input
        @input='onInput'
        :value="value"
    />
    <ul>
        <li
          class="typeahead__suggestion"
          v-for="suggestion of suggestions"
          @click="selectSuggest(suggestion)"
        >{{ suggestion }}</li>
    </ul>
</div>