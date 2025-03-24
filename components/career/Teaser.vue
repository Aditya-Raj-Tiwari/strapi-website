<template>
  <div class="teaser">
    <div class="teaser-content">
      <div class="teaser-block">
        <div class="teaser-know-how"></div>
      </div>
      <img loading="lazy" class="teaser-image"
        src="https://sm.ign.com/t/ign_de/photo/default/zelda-howlong-blog-1702007187505_73s5.2560.jpg" alt="cat" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.teaser {
  height: 280px;
  position: relative;
  z-index: 2;

  &-content {
    position: relative;
  }

  &-block {
    background-color: $brown;
    height: 200px;
    width: 70%;
    position: absolute;
    top: 0;
    left: -1rem;
    z-index: 0;
  }

  &-image {
    position: absolute;
    top: 5rem;
    right: 0;
    width: 90%;
    height: 200px;
    -o-object-fit: contain;
    object-fit: cover;
  }

  &-know-how {
    background-image: url(../../assets/images/Karriere_webimpact.png);
    width: 100%;
    min-height: 200px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: -30%;
  }
}

@media screen and (min-width: 768px) {
  .teaser {
    height: 400px;
    &-image {
      top: -2rem;
      width: 70%;
      height: 400px;
    }

    &-block {
      height: 380px;
      width: 50%;
      top: -6rem;
      left: -6rem;
    }

    &-image {
      left: 20%;
    }

    &-know-how {
      min-height: 400px;
      left: 130%;
      top: -55%;
    }
  }
}
</style>
