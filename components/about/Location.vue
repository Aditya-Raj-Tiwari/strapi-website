<template>
  <div class="about-location">
    <h2 class="about-location__heading heading-border--right">Standort</h2>
    <div class="about-location__grid">
      <div class="about-location__map">
        <l-map
          :useGlobalLeaflet="false"
          :zoom="zoom"
          ref="map"
          :center="center"
        >
          <l-tile-layer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            layer-type="base"
            subdomains="abcd"
            attribution="<a href=https://www.openstreetmap.org/copyright>OpenStreetMap</a> contributors &copy; <a href=https://carto.com/attributions>CARTO</a>"
          ></l-tile-layer>
        </l-map>
      </div>
      <div class="about-location__postcard">
        <div class="about-location__postcard-content">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          illum perferendis quod accusantium incidunt optio adipisci vero
          dolores impedit rerum delectus minus, debitis facilis laborum, quidem
          voluptatum tempora rem nostrum?
        </div>
        <div class="about-location__postcard-address">
          webimpact GmbH <br />
          Weststr. 27 <br />
          57392 Schmallenberg <br />
          +49 (0) 2974 77 999 99
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

let zoom = ref(14);
let center = ref([51.14905, 8.28401]);
</script>

<style lang="scss" scoped>
.about-location {
  padding-top: 4rem;

  &__heading {
    text-align: right;
    max-width: 950px;
    padding-bottom: 3rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: 100%;
    justify-content: center;
  }

  &__map {
    height: 300px;
    width: 100%;
    box-shadow: 0 6px 12px rgba(205, 222, 232, 1);
    border: 1px solid #cddee8;
  }

  &__postcard {
    position: relative;
    width: 720px;
    transform: scale(0.5);
    top: 3rem;
    justify-self: center;

    &-content {
      position: absolute;
      top: 138px;
      left: 66px;
      z-index: 3;
      width: 270px;
    }

    &-address {
      position: absolute;
      z-index: 3;
      left: 402px;
      width: 200px;
      top: 175px;
      line-height: 3rem;
    }

    img {
      position: relative;
      z-index: 2;
      height: 450px;
      width: 720px;
    }
  }
}

@media screen and (min-width: 400px) {
  .about-location {
    &__postcard {
      transform: scale(0.6);
    }
  }
}

@media screen and (min-width: 768px) {
  .about-location {
    padding-top: 6rem;

    &__heading {
      padding-bottom: 5rem;
    }

    &__postcard {
      transform: scale(0.8);
    }
  }
}

@media screen and (min-width: 1024px) {
  .about-location {
    padding-top: 8rem;
    &__grid {
      grid-template-columns: 1fr 720px;
    }

    &__map {
      height: 400px;
      width: 95%;
      margin-top: -1rem;
    }

    &__postcard {
      position: relative;
      top: -3rem;
      transform: scale(1);
    }
  }
}
</style>
