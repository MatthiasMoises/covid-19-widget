<template>
  <v-footer id="footer" color="primary">
    <v-row no-gutters justify="center" align="center">
      <v-col cols="12" sm="4">
        <About />
      </v-col>
      <v-col cols="12" sm="4">
        <a :href="brandLink" :title="assetSet" target="_blank">
          <!-- <img v-if="assetSet" class="brand-image" :src="require('@/assets/img/' + this.assetSet + '/' + this.assetSet + '.png')" :title="brandTitle" /> -->
        </a>
      </v-col>
      <v-col cols="12" sm="4">
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import { mapGetters } from 'vuex'

import About from './../dialogs/About'

export default {
  name: 'Footer',
  components: {
    About
  },
  computed: {
    ...mapGetters({
      assetSet: 'configuration/getAssetSet'
    }),
    brandTitle () {
      return this.assetSet
    },
    brandLink () {
      return `https://www.${this.assetSet}/`
    }
  }
}
</script>

<style scoped lang="scss">

#footer {
  text-align: center;
  color: #fff;
  width: 100%;
  height: 100%;

  .brand-image {
    width: 175px;
    height: auto;
  }
}

</style>
