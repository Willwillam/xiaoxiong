<template>
  <div class="birthday-container">
    <audio ref="bgMusic" loop>
      <source src="https://res.wx.qq.com/voice/getvoice?mediaid=MzI4OTAyODUxNF8yMjQ3NDg0NjY2" type="audio/mpeg">
    </audio>
    <div class="music-control" @click="toggleMusic">
      <el-icon :class="{ 'playing': isPlaying }">
        <component :is="isPlaying ? 'Mute' : 'VideoPlay'" />
      </el-icon>
    </div>
    <div class="stars"></div>
    <div class="twinkling"></div>
    <div class="shooting-stars">
      <div class="shooting-star"></div>
      <div class="shooting-star"></div>
      <div class="shooting-star"></div>
      <div class="shooting-star"></div>
      <div class="shooting-star"></div>
    </div>
    <div class="content">
      <div class="cake">
        <div class="plate"></div>
        <div class="layer layer-bottom"></div>
        <div class="layer layer-middle"></div>
        <div class="layer layer-top"></div>
        <div class="icing"></div>
        <div class="drip drip1"></div>
        <div class="drip drip2"></div>
        <div class="drip drip3"></div>
        <div class="bear">
          <div class="bear-face">
            <div class="ears">
              <div class="ear left"></div>
              <div class="ear right"></div>
            </div>
            <div class="eyes">
              <div class="eye left"></div>
              <div class="eye right"></div>
            </div>
            <div class="nose"></div>
            <div class="mouth"></div>
          </div>
        </div>
        <div class="candle">
          <div class="flame"></div>
        </div>
      </div>
      <div class="message">
        <span ref="typeTarget"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Typed from 'typed.js'
import { useTitle } from '@vueuse/core'
import { createStarsImage, createTwinklingImage } from '@/utils/createStars'
import { Mute, VideoPlay } from '@element-plus/icons-vue'

useTitle('生日快乐！')

const typeTarget = ref()
const starsUrl = ref('')
const twinklingUrl = ref('')
const bgMusic = ref<HTMLAudioElement>()
const isPlaying = ref(false)

const toggleMusic = () => {
  if (!bgMusic.value) return
  
  if (bgMusic.value.paused) {
    bgMusic.value.play()
    isPlaying.value = true
  } else {
    bgMusic.value.pause()
    isPlaying.value = false
  }
}

watch([starsUrl, twinklingUrl], ([stars, twinkling]) => {
  const starsElement = document.querySelector('.stars') as HTMLElement
  const twinklingElement = document.querySelector('.twinkling') as HTMLElement
  
  if (starsElement) {
    starsElement.style.backgroundImage = `url(${stars})`
    starsElement.style.backgroundRepeat = 'repeat'
    starsElement.style.backgroundPosition = 'top center'
  }
  
  if (twinklingElement) {
    twinklingElement.style.backgroundImage = `url(${twinkling})`
    twinklingElement.style.backgroundRepeat = 'repeat'
    twinklingElement.style.backgroundPosition = 'top center'
  }
})

onMounted(() => {
  starsUrl.value = createStarsImage()
  twinklingUrl.value = createTwinklingImage()
  
  // 为每个流星设置随机角度
  const shootingStars = document.querySelectorAll('.shooting-star')
  shootingStars.forEach(star => {
    // 生成 -20 到 25 度之间的随机角度
    const angle = -20 + Math.random() * 45
    // 生成 0.8 到 1.2 之间的随机速度
    const speed = 0.8 + Math.random() * 0.4
    ;(star as HTMLElement).style.setProperty('--angle', `${angle}deg`)
    ;(star as HTMLElement).style.setProperty('--speed', speed.toString())
  })
  
  new Typed(typeTarget.value, {
    strings: [
      '亲爱的小熊...',
      '生日快乐！',
      '愿你永远开心，永远美丽！',
      '希望你所有的愿望都能实现！',
      '生日快乐！生日快乐！生日快乐！'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: true
  })
  
  if (bgMusic.value) {
    bgMusic.value.play()
  }
})
</script>

<style lang="less" scoped>
.birthday-container {
  position: relative;
  height: 100%;
  background: #000;
  overflow: hidden;

  .stars {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    z-index: 0;
    animation: move-stars 200s linear infinite;
  }

  .twinkling {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    z-index: 1;
    animation: move-twinkle 200s linear infinite;
  }

  .content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
  }

  .message {
    margin-top: 2rem;
    font-size: 2rem;
    text-align: center;
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073;
  }

  .music-control {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .el-icon {
      font-size: 20px;
      color: #fff;
      transition: all 0.3s;

      &.playing {
        animation: rotate 3s linear infinite;
      }
    }
  }

  .shooting-stars {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    
    .shooting-star {
      position: absolute;
      left: -100px;
      width: 100px;
      height: 2px;
      background: linear-gradient(90deg, rgba(255,255,255,0) 0%, #fff 50%, rgba(255,255,255,0) 100%);
      opacity: 0;
      
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%);
        filter: blur(2px);
      }
      
      &:nth-child(1) {
        top: 20%;
        animation: shooting-star 6s 1000ms infinite, tail-fade 3s 1000ms infinite;
      }
      
      &:nth-child(2) {
        top: 35%;
        animation: shooting-star 6s 2000ms infinite, tail-fade 3s 2000ms infinite;
      }
      
      &:nth-child(3) {
        top: 50%;
        animation: shooting-star 6s 3000ms infinite, tail-fade 3s 3000ms infinite;
      }
      
      &:nth-child(4) {
        top: 65%;
        animation: shooting-star 6s 4000ms infinite, tail-fade 3s 4000ms infinite;
      }
      
      &:nth-child(5) {
        top: 80%;
        animation: shooting-star 6s 5000ms infinite, tail-fade 3s 5000ms infinite;
      }
    }
  }
}

.cake {
  position: relative;
  width: 250px;
  height: 200px;
  margin: 0 auto;

  .plate {
    width: 270px;
    height: 110px;
    position: absolute;
    bottom: -10px;
    left: -10px;
    background-color: #ccc;
    border-radius: 50%;
    box-shadow: 0 2px 0 #b3b3b3, 0 4px 0 #b3b3b3, 0 5px 40px rgba(0, 0, 0, 0.5);
  }

  .layer {
    position: absolute;
    width: 250px;
    height: 40px;
    border-radius: 50%;
    background-color: #ff69b4;
    box-shadow: 0 2px 0px #e6e6e6, 0 4px 0px #e6e6e6;

    &.layer-top { bottom: 80px; }
    &.layer-middle { bottom: 40px; }
    &.layer-bottom { bottom: 0; }
  }

  .icing {
    position: absolute;
    top: 40px;
    left: 5px;
    background-color: #f0f0f0;
    width: 240px;
    height: 100px;
    border-radius: 50%;
  }

  .drip {
    position: absolute;
    width: 50px;
    height: 60px;
    background-color: #f0f0f0;
    border-radius: 50% 50% 20px 20px;

    &.drip1 { left: 50px; top: -30px; transform: rotate(-15deg); }
    &.drip2 { left: 100px; top: -25px; }
    &.drip3 { left: 150px; top: -30px; transform: rotate(15deg); }
  }

  .bear {
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    
    .bear-face {
      width: 60px;
      height: 50px;
      background: #8B4513;
      border-radius: 50%;
      position: relative;
      
      .ears {
        position: absolute;
        width: 100%;
        top: -15px;
        
        .ear {
          width: 20px;
          height: 20px;
          background: #8B4513;
          border-radius: 50%;
          position: absolute;
          
          &.left {
            left: 0;
          }
          
          &.right {
            right: 0;
          }
        }
      }
      
      .eyes {
        position: absolute;
        top: 15px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        
        .eye {
          width: 8px;
          height: 8px;
          background: #000;
          border-radius: 50%;
          position: relative;
          
          &::after {
            content: '';
            position: absolute;
            width: 3px;
            height: 3px;
            background: #fff;
            border-radius: 50%;
            top: 1px;
            left: 1px;
          }
        }
      }
      
      .nose {
        position: absolute;
        width: 12px;
        height: 8px;
        background: #000;
        border-radius: 50%;
        top: 25px;
        left: 50%;
        transform: translateX(-50%);
      }
      
      .mouth {
        position: absolute;
        width: 20px;
        height: 10px;
        border: 2px solid #000;
        border-radius: 0 0 20px 20px;
        border-top: 0;
        top: 32px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  .candle {
    position: absolute;
    width: 16px;
    height: 50px;
    background: linear-gradient(#e48825, #e7a538, #faf196);
    top: -50px;
    left: 50%;
    margin-left: -8px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.4);

    .flame {
      position: absolute;
      width: 16px;
      height: 40px;
      top: -35px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 50% 50% 20% 20%;
      transform-origin: 50% 90%;
      animation: flicker 0.8s ease-in-out alternate infinite;
      background: linear-gradient(#ffec89, #ffd700, #ff8c00);
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(
          ellipse at center,
          rgba(255, 255, 255, 0.8) 0%,
          rgba(255, 255, 255, 0) 80%
        );
        border-radius: inherit;
        animation: glow 2s ease-in-out infinite;
      }
      
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 8px;
        height: 8px;
        background: #fff;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        filter: blur(2px);
      }
    }
  }
}

@keyframes flicker {
  0% {
    transform: translateX(-50%) scale(1) rotate(-2deg);
    box-shadow: 
      0 0 20px #ffd700,
      0 0 40px #ff8c00,
      0 0 60px #ff4500,
      0 0 80px #ff0000;
    opacity: 0.8;
  }
  100% {
    transform: translateX(-50%) scale(1.1) rotate(2deg);
    box-shadow: 
      0 0 30px #ffd700,
      0 0 60px #ff8c00,
      0 0 80px #ff4500,
      0 0 100px #ff0000;
    opacity: 1;
  }
}

@keyframes glow {
  0%, 100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

@keyframes move-twinkle {
  from { background-position: 0 0; }
  to { background-position: -10000px 5000px; }
}

@keyframes move-stars {
  from { background-position: 0 0; }
  to { background-position: -10000px 0; }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes shooting-star {
  0% {
    transform: translateX(0) rotate(var(--angle));
    opacity: 1;
  }
  100% {
    transform: translateX(calc((100vw + 200px) * var(--speed))) rotate(var(--angle));
    opacity: 0;
  }
}

@keyframes tail-fade {
  0%, 50% {
    width: 0;
    opacity: 0;
  }
  
  10% {
    width: 100px;
    opacity: 1;
  }
  
  100% {
    width: 0;
    opacity: 0;
  }
}

@keyframes bearBounce {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-5px);
  }
}

@keyframes blink {
  0%, 90%, 100% {
    transform: scaleY(1);
  }
  95% {
    transform: scaleY(0.1);
  }
}

.bear {
  animation: bearBounce 2s ease-in-out infinite;
}

.eye {
  animation: blink 4s infinite;
}
</style> 