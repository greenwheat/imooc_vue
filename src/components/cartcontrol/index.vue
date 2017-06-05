<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
                <i class="inner icon-remove_circle_outline"></i>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'

export default {
    props: {
        food: {
            type: Object
        }
    },
    created() {
        // console.log('cartcontrol', this.food)
    },
    methods: {
        addCart(event) {
            console.log('click')
            if (!event._constructed) {
                return false
            }
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1)
            } else {
                this.food.count++
            }

            this.$emit('cardadd', event.target)
        },
        decreaseCart(event) {
            console.log('click')
            if (!event._constructed) {
                return false
            }
            this.food.count--
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.cartcontrol {
    font-size: 0;
    .cart-decrease {
        display: inline-block;
        padding: 6px;

        .inner {
            display: inline-block;
            line-height: 24px;
            font-size: 24px;
            color: rgb(0, 160, 220);
        }

        &.move-enter,
        &.move-leave-active {
            opacity: 0;
            transform: translate3d(24px, 0, 0);

            .inner {
                transform: rotate(180deg);
            }
        }

        &.move-enter-active,
        &.move-leave-active {
            transition: all 0.4s linear;

            .inner {
                transition: all 0.4s linear;
            }
        }
    }
    .cart-count {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        padding-top: 6px;
        line-height: 24px;
        text-align: center;
        font-size: 10px;
        color: #93999f;
    }
    .cart-add {
        display: inline-block;
        padding: 6px;
        line-height: 24px;
        font-size: 24px;
        color: #00a0dc;
    }
}
</style>
