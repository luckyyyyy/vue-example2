<template>
    <div class="progress-box">
        <p class="current-value">{{current_value}}</p>
        <div class="arc-box">
            <div class="top half-box">
                <div class="full-circle top-circle" :style="{transform: 'rotate(' + (135 + ((current_value / max_value) * 180)) +'deg)'}">
                    
                </div>
            </div>  
            <div class="bottom half-box">
                <div class="full-circle bottom-circle">
                    
                </div>
            </div>  
            <img src="../../src/assets/account/pointer.png" :style="{transform: 'translate(-80%, -50%) rotate(' + ((current_value / max_value) * 180) + 'deg)'}">      
        </div>
        <p class="min-max"><span>{{min_value}}</span><span>{{max_value}}</span></p>
    </div>
</template>

<script>

export default {
	ready () {
    },
    props: {
        min_value: 0,
        max_value: 0,
        current_value: 0
    },
    events: {

    },
    data() {
        return {
        }
    }, 
    methods: {

    },
    watch: {
    }
}
</script>
<style lang='less' scoped>

.progress-box {
    width: 140px;
    height: 140px;
    .current-value {
        margin: 0px;
        text-align: center;
        font-size: 30px;
        color: #666;
    }
    .min-max {
        display: flex;
        justify-content: space-between;
        margin-top: -65px;
        width: 140px;
        color: #999999;
    }
    .arc-box {
        width: 140px;
        height: 140px;
        position: relative;
        margin-left: auto;
        margin-right: auto;
        img {
            height: 12px; 
            width: 35px;
            transition: transform 2s linear;
            position: absolute;
            left: 50%; 
            top: 50%;
            transform-origin: 82% 50%;
            transform: rotate(0deg);
        }
        .half-box {
            position: absolute;
            height: 70px;
            width: 140px;
            overflow: hidden;
        }
        .top{
            top: 0;
        }
        .bottom {
            bottom: 0;
        }
        .full-circle {
            width: 90px;
            height: 90px;
            border:25px solid #1190bf;
            border-radius: 50%;
            position: absolute;
        }
        .top-circle {
            transition: transform 2s linear;
            position: relative;
            top: 0;
            border-left:  25px solid #dcdee3;
            border-bottom:  25px solid #dcdee3;            
            transform: rotate(135deg);
            -webkit-animation: rotate_top 2s linear;
            animation-fill-mode:forwards;
            background-clip: padding-box;
            /*padding: 10px;*/
            /*border: 4px solid transparent;*/
            
        }
        .bottom-circle {
            bottom: 0;
            border-top:  25px solid rgba(0,0,0,0);
            border-right:  25px solid rgba(0,0,0,0);
            transform: rotate(135deg);
        }
        @-webkit-keyframes rotate_top {
      /*      0% {
                transform: rotate(135deg);
            }
            50%,100% {
                transform: rotate(315deg);
            }*/
        }
    }
}


</style>
