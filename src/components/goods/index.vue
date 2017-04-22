<template>
<div class="goods">
  <div class="menu-wrapper" ref="menuWrapper">
    <ul>
      <li v-for="(item,$index) in goods" class="menu-item" @click="selectMenu($index,$event)" :class="{'current':currentIndex===$index}">
        <span class="text border-1px border-bottom"><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
      </li>
    </ul>
  </div>
  <div class="foods-wrapper" ref="foodsWrapper">
    <ul>
      <li v-for="item in goods" class="food-list food-list-hook">
        <h1 class="title">{{item.name}}</h1>
        <ul>
          <li v-for="food in item.foods" class="food-item border-1px border-bottom">
            <div class="icon">
              <img :src="food.icon" alt="" class="" width="57" height="57">
            </div>
            <div class="content">
              <h2 class="name">{{food.name}}</h2>
              <p class="desc">{{food.description}}</p>
              <div class="extra">
                <span class="count">月售{{food.sellCount}}</span>
                <span>好评率{{food.rating}}</span>
              </div>
              <div class="price">
                <span class="now">￥{{food.price}}</span>
                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              </div>
              <div class="cartcontrol-warpper">
                <cartcontrol :food="food" v-on:cardadd="_drop"></cartcontrol>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
</div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import shopcart from '@/components/shopcart'
import cartcontrol from '@/components/cartcontrol'
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    }
  },
  components: {
    shopcart,
    cartcontrol
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods() {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count > 0) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invocie', 'special']
    this.$http.get('/api/goods').then((resoponse) => {
      resoponse = resoponse.body
      console.log(resoponse)
      if (resoponse.errno === ERR_OK) {
        this.goods = resoponse.data
        // 在下次 DOM 更新循环结束之后执行延迟回调
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }
    })
  },
  methods: {
    _drop(target) {
      // 体验优化 异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target)
      })
    },
    selectMenu(index, event) {
      if (!event._constructed) {
        return false
      }
      console.log(index)
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let foodItem = foodList[index]
      this.foodsScroll.scrollToElement(foodItem)
    },
    _initScroll() {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })

      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        // 探针
        probeType: 3,
        click: true
      })

      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">@import './../../common/scss/common/mixin';
.goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
        flex: 0 0 80px;
        width: 80px;
        background: #f3f5f7;
        .menu-item {
            display: table;
            height: 54px;
            width: 56px;
            padding: 0 12px;
            line-height: 14px;
            &.current {
                position: relative;
                z-index: 10;
                margin-top: -1px;
                background: #fff;
                font-weight: 700;
                .text {
                    &:before {
                        display: none;
                    }
                }
            }
            .icon {
                display: inline-block;
                vertical-align: top;
                width: 12px;
                height: 12px;
                margin-right: 2px;
                background-size: 12px 12px;
                background-repeat: no-repeat;
                &.decrease {
                    @include bg-image( 'decrease_3');
                }
                &.discount {
                    @include bg-image( 'discount_3');
                }
                &.guarantee {
                    @include bg-image( 'guarantee_3');
                }
                &.invocie {
                    @include bg-image( 'invoice_3');
                }
                &.special {
                    @include bg-image( 'special_3');
                }
            }
            .text {
                display: table-cell;
                width: 56px;
                font-size: 12px;
                vertical-align: middle;
            }
        }
    }
    .foods-wrapper {
        flex: 1;
        .title {
            padding-left: 14px;
            height: 26px;
            line-height: 26px;
            border-left: 2px solid #d9dde1;
            font-size: 12px;
            color: rgb(147, 153, 159);
            background: #f3f5f7;
        }
        .food-item {
            display: flex;
            margin: 18px;
            padding-bottom: 18px;
            &:last-child {
                margin-bottom: 0;
            }
            .icon {
                flex: 0 0 57px;
                margin-right: 10px;
            }
            .content {
                flex: 1;
                .name {
                    margin: 2px 0 8px;
                    height: 14px;
                    line-height: 14px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .desc,
                .extra {
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
                .desc {
                    line-height: 14px;
                    margin-bottom: 8px;
                }
                .extra {

                    .count {
                        margin-right: 12px;
                    }
                }
                .price {
                    font-weight: 700;
                    line-height: 24px;
                    .now {
                        margin-right: 8px;
                        font-size: 4px;
                        color: rgb(240, 20, 20);
                    }
                    .old {
                        text-decoration: line-through;
                        color: rgb(147, 153, 159);
                        font-size: 10px;
                    }
                }
                .cartcontrol-warpper {
                    position: absolute;
                    right: 0;
                    bottom: 12px;
                }
            }
        }
    }
}
</style>
