<template>
  <div class="open-positions">
    <h3 class="heading-border--left open-positions__heading">
      Aktuelle stellenangebote
    </h3>
    <img loading="lazy" class="open-positions__board" " />
  </div>
</template>

<style lang="scss" scoped>
.open-positions {
  &__heading {
    max-width: 800px;
    margin: 0 auto;
    padding-bottom: 0;
    padding-top: 9rem;
    margin-top: -5rem;
    margin-bottom: 2rem;
  }

  &__board {
    width: 100%;
    height: auto;
  }
}

@media screen and (min-width: 768px) {
  .open-positions {
    &__heading {
      margin-top: -8rem;
    }
  }
}
</style>
