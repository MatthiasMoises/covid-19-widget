<template>
  <v-progress-circular
    v-if="loading"
    class="loading"
    :size="100"
    :width="7"
    color="primary"
    indeterminate
  ></v-progress-circular>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Spinner',
  computed: {
    ...mapGetters({
      loading: 'forms/getLoading'
    })
  }
}
</script>

<style scoped lang="scss">

.loading {
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: visible;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.loading:before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
}

</style>
