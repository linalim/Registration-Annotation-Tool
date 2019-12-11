<template>
    <div class='svg_body'>
      <svg ref="svg"
           :viewBox="viewBox"
           width="100%">

        <image :xlink:href="imageUrl+this.$store.state.imageData[this.$store.state.index]" 
                height="100%" 
                width="100%" 
                v-if="this.$store.state.imageData[this.$store.state.index]"/>
      </svg>
    </div>
</template>

<script>

export default {
  computed: {
    viewBox: function () { return '0 0 ' + this.width + ' ' + this.height },
   
  },
  data () {
    return {
      width: 100,
      height: 60,
      quad: [],
      currentPoint: {},
      imageContext: null,
      // imageUrl:'/images/'
      imageUrl: 'http://localhost:3000/images/?image=',
    }
  },
  watch: {
    card: {
      handler () {
      }
    }
  },
  methods: {
    toggleBoxingMode: function () {
      if (this.isLetterMode) {
        this.$store.dispatch('annotation/setBoxingMode', 'words')
      } else {
        this.$store.dispatch('annotation/setBoxingMode', 'letters')
      }
    },
  },
}
</script>

<style>
  .svg_body {
    height: 100%;
    overflow: auto;
  }
</style>
