<div>
    <h1>Где я?</h1>
    <form @submit.prevent="onSubmit">
      <autocomplete-input
          :getSuggests="getAddresses"
          :placeholder="'Название места...'"
          :minLettersForRequest="4"
          @select="onAddressSelect"
          @input="onType"
          :value="search"
      ></autocomplete-input>
      <button
        class="goToMapBtn"
        type="submit"
        :disabled="!selectedAddress"
      >
        я здесь
      </button>
    </form>
</div>
