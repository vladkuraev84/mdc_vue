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
          :total="feed.articlesCount"
          :limit="limit"
          :current-page="currentPage"
          :url="baseUrl"
      />
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
import {actionTypes} from "@/store/modules/feed";
import McvPagination from '@/components/Pagination';
import {limit} from '@/helpers/vars';
import {stringify, parseUrl} from 'query-string';

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
      /*total: 500,*/
      limit,
      /*currentPage: 5,*/
      url: '/'
    }
  },
  components: {McvPagination},
  computed: { // декларативно иммутабельная штука (объект), лучше чаще её использовать -- легче поддерживать и дебажить, потому тут мы описываем что происходит во всем приложении, а не то как это происходит, в отличии от watch
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error
    }),
    currentPage() {
      console.log('current page')
      return Number(this.$route.query.page || '1')
    },
    baseUrl() {
      console.log('rout path')
      return this.$route.path
    },
    offset() {
      console.log('offset')
      return this.currentPage * limit - limit
    }
  },
  watch: {
    currentPage() { // в watch - currentPage это локальная переменная, это наш колбэк, когда наша переменная поменяется. Здесь всегда императивный код
      console.log('watch methods')
      this.fetchFeed()
    }
  },
  mounted() {
    console.log('mounted')
    this.fetchFeed()
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrlFeed);
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      // console.log(apiUrlWithParams)
      this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams})
    }
  }
}
</script>