<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          v-show="isEdit && !fiexChannels.includes(channel.id)"
          slot="icon"
          name="close"
        ></van-icon>
        <span class="text" :class="{ active: index === active }" slot="text">
          {{ channel.name }}
        </span>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑状态的显示
      fiexChannels: [0] // 固定频道，不允许删除
    }
  },
  computed: {
    // 计算出推荐频道
    recommendChannels() {
      return this.allChannels.filter(channel => {
        const mychannel = this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        return !mychannel
      })
    }
    // recommendChannels() {
    //   const channels = []
    //   this.allChannels.forEach(channel => {
    //     //  find 遍历数组，找到满足条件的元素项
    //     const ret = this.myChannels.find(myChannels => {
    //       return myChannels.id === channel.id
    //     })
    //     // 如果我的频道中不包括该频道，则收集到推荐频道中
    //     if (!ret) {
    //       channels.push(channel)
    //     }
    //   })
    //   return channels
    // }
  },
  watch: {},
  created() {
    this.loadAllChannels()
    console.log(this.myChannels)
    console.log(this.allChannels)
  },
  mounted() {},
  methods: {
    // 加载获取所有频道
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
        console.log(this.allChannels)
      } catch (err) {
        this.$toast('获取频道列表数据失败')
      }
    },
    // 点击频道推荐添加到我的频道
    onAddChannel(channel) {
      this.myChannels.push(channel)
    },
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        // 编辑状态，执行删除频道
      } else {
        // 非编辑状态，执行切换频道
        this.$emit('updata-active', index)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
    }
    .van-grid-item__text,
    .text {
      font-size: 28px;
      color: #222;
      margin-top: 0;
    }
    .active {
      color: red;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-close {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
