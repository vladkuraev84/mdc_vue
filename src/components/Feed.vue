<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Smth bad happened</div>
    <div v-if="feed">
      <div class="article-preview"
        v-for="(article, index) in feed.articles" :key="index"
      >
        <div class="article-meta">
          <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}">
            <img :src="article.author.image" alt="" />
          </router-link>
          <div class="info">
            <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}" class="author">
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">
            ADD TO FAVORITE
          </div>
        </div>
        <router-link :to="{name: 'article', params: {slug: article.slug}}" class="preview-link">
          <span class="title" style="display:block; color: #000000; font-size: 24px;font-weight: 900;">{{article.title}}</span>
          <span style="display:inline-block;width: 100%;">{{ article.description }}</span>
          <span>Read more...</span>
          TAG LIST
        </router-link>
      </div>
      <McvPagination
          :total="total"
          :limit="limit"
          :current-page="currentPage"
          :url="url"
      />
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
import {actionTypes} from "@/store/modules/feed";
import McvPagination from '@/components/Pagination'

export default {
  name: 'McvFeed',
  props: {
    apiUrlFeed: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      total: 500,
      limit: 10,
      currentPage: 5,
      url: '/'
    }
  },
  components: {McvPagination},
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error
    })
  },
  mounted() {
    console.log('init feed')
    this.$store.dispatch(actionTypes.getFeed, {apiUrl: this.apiUrlFeed})
  }
}
</script>