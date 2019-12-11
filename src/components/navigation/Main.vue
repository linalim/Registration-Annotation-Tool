<template>
  <v-app-bar app fixed clipped-left text color="white" class="elevation-3">
    <v-toolbar-title class="mr-3">
      <a href="/#/">Registration Annotation</a>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn text @click="$router.push('/annotation')"> Annotation </v-btn>
      <v-btn text @click="$router.push('/inspection')"> Inspection </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
  },
  methods: {
  }
}

</script>

<style>
</style>
