<template>
  <div class="home-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 频道列表 -->
    <!-- 通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签
      通过 animated 属性可以开启切换标签内容时的转场动画
      通过 swipeable 属性可以开启滑动切换标签页 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab
        v-for="channels in channels"
        :key="channels.id"
        :title="channels.name"
      >
        <!-- 文章列表 -->
        <article-list :channels="channels" />
        <!-- 频道的列表 -->
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChennelEditShow = true"
      >
        <i class="toutiao icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChennelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :my-channels="channels"
        :active="active"
        @updata-active="onUpdateActive"
      />
    </van-popup>
    <!-- /频道编辑弹出层 -->
  </div>
</template>
<script>
// 1. 导入 获取频道列表的方法
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'

import ChannelEdit from './components/channel-edit'
export default {
  name: 'homeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},

  data() {
    return {
      active: 0,
      // 4.  定义数据接收频道列表
      channels: [],
      isChennelEditShow: false // 控制编辑频道的显示与隐藏
    }
  },
  computed: {},
  watch: {},
  created() {
    // 3. 调用获取频道列表
    this.loadChannels()
    console.log(this.channels)
  },
  mounted() {},
  methods: {
    // 2. 定义加载频道列表数据的方法
    async loadChannels() {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道列表数据失败')
      }
    },
    onUpdateActive(index) {
      this.active = index
      this.isChennelEditShow = false
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  padding-top: 171px;
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }

  /deep/ .channel-tabs {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 90px;
      z-index: 1;
      right: 0;
      left: 0;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
    }
    .van-tab--active {
      color: #333333;
    }
    // .van-cell {
    //   padding: 0;
    //   // height: 70px;
    //   // line-height: 70px;
    // }
    .van-tabs__nav--line {
      padding-bottom: 23px;
    }
    .van-tabs__line {
      border-bottom: 8px;
      width: 31px;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.902);
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
