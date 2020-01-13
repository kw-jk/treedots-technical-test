<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-btn
        href="/"
        text
      >
        <span class="mr-2">Question 1</span>
      </v-btn>
      <v-btn
        href="/question2"
        text
      >
        <span class="mr-2">Question 2</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
