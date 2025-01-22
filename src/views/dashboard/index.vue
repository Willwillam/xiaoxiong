<template>
  <div class="birthday-container">
    <audio ref="bgMusic" loop preload="auto">
      <source :src="happyBirthdayMusic" type="audio/mpeg">
    </audio>
    <div class="music-button" @click="toggleMusic">
      <el-icon :class="{ 'playing': isPlaying }">
        <component :is="isPlaying ? 'VideoPause' : 'VideoPlay'" />
      </el-icon>
      <span class="button-text">{{ isPlaying ? '暂停' : '播放' }}音乐</span>
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
    <div class="fireworks">
      <div class="firework"></div>
      <div class="firework"></div>
      <div class="firework"></div>
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
            <div class="strawberry">
              <div class="berry"></div>
              <div class="leaves"></div>
            </div>
            <div class="ears">
              <div class="ear left"></div>
              <div class="ear right"></div>
            </div>
            <div class="eyes">
              <div class="eye left"></div>
              <div class="eye right"></div>
            </div>
            <div class="nose"></div>
            <div class="blush left"></div>
            <div class="blush right"></div>
            <div class="mouth"></div>
          </div>
        </div>
        <div class="candle">
          <div class="flame"></div>
        </div>
      </div>
      <div class="flowers">
        <img :src="flowersImage" alt="flowers" class="flower-image">
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
import { VideoPause, VideoPlay } from '@element-plus/icons-vue'

useTitle('生日快乐！')

const typeTarget = ref<HTMLElement | null>(null)
const starsUrl = ref('')
const twinklingUrl = ref('')
const bgMusic = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const happyBirthdayMusic = '/xiaoxiong/music/happy-birthday.mp3'
const flowersImage = '/xiaoxiong/images/flowers.jpeg'

const initMusic = async () => {
  if (!bgMusic.value) return
  
  try {
    // 预加载音频
    await bgMusic.value.load()
    // 设置音量
    bgMusic.value.volume = 0.5
    
    // 监听音频加载完成事件
    bgMusic.value.addEventListener('canplaythrough', () => {
      console.log('Audio loaded and ready to play')
    })
    
    // 监听音频错误事件
    bgMusic.value.addEventListener('error', (e) => {
      console.error('Audio error:', e)
    })
  } catch (error) {
    console.error('Failed to initialize audio:', error)
  }
}

const toggleMusic = async () => {
  if (!bgMusic.value) return
  
  try {
    if (bgMusic.value.paused) {
      // 尝试播放音频
      const playPromise = bgMusic.value.play()
      if (playPromise !== undefined) {
        await playPromise
        isPlaying.value = true
      }
    } else {
      bgMusic.value.pause()
      isPlaying.value = false
    }
  } catch (error) {
    console.error('Failed to toggle audio:', error)
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
      '亲爱的小熊宝宝...',
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
  
  initMusic()
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

  .music-button {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    padding: 15px 30px;
    background: rgba(255, 192, 203, 0.8);
    border-radius: 25px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 15px rgba(255, 192, 203, 0.5);

    &:hover {
      background: rgba(255, 192, 203, 0.9);
      transform: translate(-50%, -50%) scale(1.05);
    }

    .el-icon {
      font-size: 24px;
      color: #fff;

      &.playing {
        animation: rotate 3s linear infinite;
      }
    }

    .button-text {
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }
  }

  &:hover .music-button {
    opacity: 1;
  }

  .music-button {
    opacity: 0.2;
    transition: opacity 0.3s ease;
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
      width: 100px;
      height: 3px;
      background: linear-gradient(90deg, rgba(255,255,255,0) 0%, #fff 50%, rgba(255,255,255,0) 100%);
      opacity: 0;
      transform-origin: left center;
      filter: blur(1px);
      
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: radial-gradient(circle, #fff 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
        filter: blur(2px);
      }
      
      &:nth-child(1) {
        top: 0;
        left: 0;
        animation: shooting-star-left 8s 0s infinite;
      }
      
      &:nth-child(2) {
        top: 5%;
        left: 0;
        animation: shooting-star-left 9s 4s infinite;
      }
      
      &:nth-child(3) {
        top: 0;
        right: 0;
        animation: shooting-star-right 8.5s 2s infinite;
      }
      
      &:nth-child(4) {
        top: 8%;
        right: 0;
        animation: shooting-star-right 7.5s 6s infinite;
      }
      
      &:nth-child(5) {
        top: 3%;
        right: 0;
        animation: shooting-star-right 9.5s 1s infinite;
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
      background: #FFB6C1;
      border-radius: 50%;
      position: relative;
      
      .strawberry {
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        
        .berry {
          width: 25px;
          height: 25px;
          background: #FF0000;
          border-radius: 50%;
          position: relative;
          
          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 30% 30%, #FFF 2%, transparent 4%);
            animation: sparkle 2s infinite;
          }
        }
        
        .leaves {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 15px;
          background: #32CD32;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
      }
      
      .ears {
        position: absolute;
        width: 100%;
        top: -15px;
        
        .ear {
          width: 20px;
          height: 20px;
          background: #FFB6C1;
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
      
      .blush {
        position: absolute;
        width: 12px;
        height: 8px;
        background: #FF69B4;
        border-radius: 50%;
        opacity: 0.6;
        
        &.left { left: 8px; top: 25px; }
        &.right { right: 8px; top: 25px; }
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

@keyframes shooting-star-left {
  0% {
    transform: rotate(45deg) translateX(0) translateY(0);
    opacity: 1;
  }
  40% {
    transform: rotate(45deg) translateX(120vw) translateY(120vh);
    opacity: 0;
  }
  100% {
    transform: rotate(45deg) translateX(120vw) translateY(120vh);
    opacity: 0;
  }
}

@keyframes shooting-star-right {
  0% {
    transform: rotate(135deg) translateX(0) translateY(0);
    opacity: 1;
  }
  40% {
    transform: rotate(135deg) translateX(120vw) translateY(-120vh);
    opacity: 0;
  }
  100% {
    transform: rotate(135deg) translateX(120vw) translateY(-120vh);
    opacity: 0;
  }
}

@keyframes sparkle {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

@keyframes sway {
  0%, 100% { transform: translate(var(--x), var(--y)) rotate(0deg); }
  50% { transform: translate(var(--x), var(--y)) rotate(5deg); }
}

@keyframes bloom {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.flowers {
  position: absolute;
  right: 20px;
  bottom: 150px;
  width: 250px;
  height: 200px;
  z-index: 1;
  
  .flower-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation: flowerFloat 3s ease-in-out infinite;
    filter: drop-shadow(0 0 15px rgba(255, 192, 203, 0.7));
    transform-origin: center bottom;
    opacity: 0.9;
  }
}

@keyframes flowerFloat {
  0%, 100% {
    transform: translateY(0) rotate(-2deg);
  }
  50% {
    transform: translateY(-5px) rotate(2deg);
  }
}

.bear {
  animation: bearBounce 2s ease-in-out infinite;
}

.eye {
  animation: blink 4s infinite;
}

.fireworks {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  max-width: 800px;
  max-height: 600px;
  z-index: 2;
  pointer-events: none;
  
  .firework {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    box-shadow: 0 0 10px 2px;
    
    &::before, &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      box-shadow: 0 0 10px 2px;
      animation: explode 2s ease-out infinite;
    }
    
    &:nth-child(1) {
      left: 30%;
      bottom: 0;
      animation: launch 4s ease-out infinite;
      box-shadow: 0 0 10px 2px #ff69b4;
      &::before, &::after { box-shadow: 0 0 10px 2px #ff69b4; }
    }
    
    &:nth-child(2) {
      left: 50%;
      bottom: 0;
      animation: launch 4s ease-out 1.5s infinite;
      box-shadow: 0 0 10px 2px #ffd700;
      &::before, &::after { box-shadow: 0 0 10px 2px #ffd700; }
    }
    
    &:nth-child(3) {
      left: 70%;
      bottom: 0;
      animation: launch 4s ease-out 3s infinite;
      box-shadow: 0 0 10px 2px #87ceeb;
      &::before, &::after { box-shadow: 0 0 10px 2px #87ceeb; }
    }
  }
}

@keyframes launch {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  10% {
    transform: translateY(-150px) scale(1);
    opacity: 1;
  }
  20% {
    transform: translateY(-250px) scale(0.8);
    opacity: 1;
  }
  30% {
    transform: translateY(-350px) scale(0.6);
    opacity: 0;
  }
  100% {
    transform: translateY(-350px) scale(0.6);
    opacity: 0;
  }
}

@keyframes explode {
  0% {
    transform: translate(0, 0) scale(1);
  }
  20% {
    transform: translate(20px, 20px) scale(1.5);
  }
  40% {
    transform: translate(40px, -40px) scale(2);
  }
  60% {
    transform: translate(-20px, 40px) scale(1.8);
  }
  80% {
    transform: translate(-40px, -20px) scale(1.6);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}
</style> 