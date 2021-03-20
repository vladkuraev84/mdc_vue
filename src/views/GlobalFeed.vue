<template>
  <div class="home-page">
    Banner
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <McvFeed :apiUrlFeed="apiUrl" />
        </div>
        <div class="col-md-3">
          <McvPopularTags />
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import McvFeed from '@/components/Feed';
import McvPopularTags from '@/components/PopularTags';
export default {
  name: 'McvGlobalFeed',
  components: {McvFeed, McvPopularTags},
  data () {
    return {
      apiUrl: '/articles'
    }
  }
}
</script>