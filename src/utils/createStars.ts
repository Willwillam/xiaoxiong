// 生成星空背景图片的工具函数
export function createStarsImage() {
  const canvas = document.createElement('canvas')
  canvas.width = 2000
  canvas.height = 2000
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  ctx.fillStyle = 'transparent'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 绘制星星
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const radius = Math.random() * 1.5
    
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fillStyle = '#fff'
    ctx.fill()
  }

  return canvas.toDataURL()
}

export function createTwinklingImage() {
  const canvas = document.createElement('canvas')
  canvas.width = 2000
  canvas.height = 2000
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  ctx.fillStyle = 'transparent'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 绘制闪烁效果
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const radius = Math.random() * 2 + 1
    
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
    gradient.addColorStop(1, 'transparent')
    
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()
  }

  return canvas.toDataURL()
} 