<template>
  <div class="about-team mb-32">
    <div class="about-team__grid">
      <AboutTeamMember v-for="(member, i) in teamMembers" :key="i" :member="member" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  teamMembers: {
    type: Array as PropType<Array<{ name: string; position: string; description: string; image: string; }>>,
    required: true,
  },
});


</script>

<style lang="scss" scoped>
.about-team {
  &__heading {
    max-width: 800px;
    text-align: right;
    padding: 6rem 0 0;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 3rem;
    grid-row-gap: 2rem;
  }
}

@media screen and (min-width: 768px) {
  .about-team {

    &__grid {
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 3rem;
      grid-row-gap: 5rem;
    }
  }
}
</style>
