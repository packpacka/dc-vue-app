<div  class="map-page">
  <div class="map-page_header">
    <router-link :to="{ name: 'home'}" class="map-page_header-link">Выбрать другое место</router-link>
  </div>
  <map-component
    :lat="lat"
    :lng="lng"
    :title="title"
  />
</div>

