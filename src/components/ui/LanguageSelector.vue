<template>
  <v-select
    v-model="selected"
    :items="languages"
    item-text="value"
    item-value="key"
    class="language-selector"
    label="Sprache"
    dense
    solo
    prepend-inner-icon="public"
    attach
    @change="changeLanguage($event)"
  ></v-select>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LanguageSelector',
  data () {
    return {
      selected: { key: 'de', value: this.$parent.$t('language-selector.german') },
      languages: [
        { key: 'de', value: this.$parent.$t('language-selector.german') },
        { key: 'en', value: this.$parent.$t('language-selector.english') }
      ]
    }
  },
  methods: {
    ...mapActions({
      setSelectedLanguage: 'forms/setSelectedLanguage'
    }),
    changeLanguage (e) {
      this.$root.$i18n.locale = this.selected
      this.setSelectedLanguage(this.selected)
    }
  }
}
</script>

<style scoped lang="scss">

.language-selector {
  margin: 15px auto;
}

</style>
