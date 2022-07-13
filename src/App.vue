<template>
  <v-app>
    <v-content>
      <div class="covid19-wrapper" tag="div">
        <v-container>
          <v-row>
            <v-col>
              <v-card raised>
                <v-card-title>
                  <Header />
                </v-card-title>
                <v-card-text>
                  <FormContainer />
                  <Spinner />
                  <Footer />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Header from './components/ui/Header'
import FormContainer from './components/FormContainer'
import Footer from './components/ui/Footer'
import Spinner from './components/ui/Spinner'

export default {
  name: 'App',
  components: {
    Header,
    FormContainer,
    Footer,
    Spinner
  },
  data () {
    return {
      determinedAssetSet: undefined
    }
  },
  computed: {
    ...mapGetters({
      darkTheme: 'configuration/getDarkTheme',
      primaryColor: 'configuration/getPrimaryColor',
      assetSet: 'configuration/getAssetSet',
      selectedLanguage: 'forms/getSelectedLanguage'
    }),
    color () {
      let windowColor = window.color

      if (windowColor) {
        if (!windowColor.includes('#')) {
          windowColor = '#' + windowColor
        }
        return windowColor
      }
      return this.primaryColor
    }
  },
  created () {
    this.$vuetify.theme.dark = this.darkTheme
    this.$root.$i18n.locale = this.selectedLanguage

    this.setAssetSet(this.determinedAssetSet || this.assetSet)
  },
  mounted () {
    this.setPrimaryColor(this.color)
    this.$vuetify.theme.themes.light.primary = this.color
  },
  methods: {
    ...mapActions({
      setDarkTheme: 'configuration/setDarkTheme',
      setPrimaryColor: 'configuration/setPrimaryColor',
      setAssetSet: 'configuration/setAssetSet'
    })
  }
}
</script>

<style lang="scss">

#app {
  font-family: "Roboto", sans-serif;
  max-width: 1000px;
  width: 100%;
  min-height: 450px;
  height: 100%;
  margin: 0 auto;
  line-height: 1.5;

  .theme--light.v-card > .v-card__text, .theme--light.v-card .v-card__subtitle {
    color: rgba(0, 0, 0, 0.6);
  }

  .v-card__subtitle, .v-card__text {
    line-height: 1.375rem;
    letter-spacing: 0.0071428571em;
  }

  .v-application--wrap {
    min-height: 450px;

    .container {
      width: 100%;
      padding: 12px;
      margin-right: auto;
      margin-left: auto;

      h2, h3 {
        font-family: "Roboto", sans-serif;
        display: block;
        margin: 0 0 20px 0;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
        line-height: 1.375rem;
      }

      h2 {
        font-size: 1.5em;
        color: rgba(0, 0, 0, 0.6);
      }

      h3 {
        font-size: 1.17em;
        color: rgba(0, 0, 0, 0.6);
      }

      a {
        color: #FFFFFF;
      }

      .v-label {
        font-weight: normal;
        margin-bottom: 0;
      }
    }
  }
}

</style>
