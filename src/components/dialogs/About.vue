<template>
  <div class="text-center">
    <a @click="dialog = true">{{ $t('about-this-app.headline') }}</a>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{ $t('about-this-app.headline') }}
        </v-card-title>

        <v-card-text>
          <br>
          <h3>Covid Symptomcheck</h3>
          <br>
          <p>Some about text</p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            {{ $t('about-this-app.accept') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      dialog: false
    }
  }
}
</script>
