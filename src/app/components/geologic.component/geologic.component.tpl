<div>
    <h1>geologic</h1>
    <autocomplete-input
        :getSuggests="getAddresses"
        :onSuggestSelect="onAddressSelect"
        :placeholder="'Название места...'"
        :minLettersForRequest="4"
    ></autocomplete-input>
    <button disabled>я здесь</button>
</div>
