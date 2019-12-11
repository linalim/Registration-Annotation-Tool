<template>
  <div v-resize="resizeHeight" :style="{height: height + 'px'}">
	<div style="height: 100%; width: 55%; float: left;">
	  <annotation-image />
	</div>
	<div style="height: 100%; width: 45%; float: right;">
	  <annotation-table />
	</div>
  </div>
</template>

<script>
import AnnotationImage from '@/components/annotation/image/Main'
import AnnotationTable from '@/components/annotation/table/Main'

export default {
  components: { AnnotationImage, AnnotationTable },
  data () {
  	return {
  		height: 100
  	}
  },
  methods: {
  	resizeHeight	
  }

}

function resizeHeight () {
	let el = this.$el
	let top = 0
	do {
		top += el.offsetTop || 0;
		el = el.offsetParent;
	} while (el);

	this.height = window.innerHeight - top;
}

</script>

<style>
</style>

