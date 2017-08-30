<div>
    <h1>Где я?</h1>
    <autocomplete-input
        :getSuggests="getAddresses"
        :placeholder="'Название места...'"
        :minLettersForRequest="4"
        @select="onAddressSelect"
        @input="onType"
    ></autocomplete-input>
    <button
      class="goToMapBtn"
      :disabled="!selectedAddress"
      @click="onBtnClick"
    >
      я здесь
    </button>
</div>
