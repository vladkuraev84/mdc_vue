<template>
  <div>feed {{ apiUrlFeed }}</div>
</template>
<script>
import {actionTypes} from "@/store/modules/feed";

export default {
  name: 'McvFeed',
  props: {
    apiUrlFeed: {
      type: String,
      required: true
    }
  },
  mounted() {
    console.log('init feed')
    this.$store.dispatch(actionTypes.getFeed, {apiUrl: this.apiUrlFeed})
  }
}
</script>