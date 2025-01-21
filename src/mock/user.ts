interface UserInfo {
  id: number
  username: string
  avatar?: string
  roles: string[]
}

export const users = [
  {
    username: 'xsq',
    password: '5201314',
    token: 'admin-token',
    userInfo: {
      id: 1,
      username: 'xsq',
      avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
      roles: ['admin']
    }
  }
]

// 模拟登录API
export const login = (username: string, password: string) => {
  return new Promise<{token: string, userInfo: UserInfo}>((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (user) => user.username === username && user.password === password
      )
      if (user) {
        resolve({
          token: user.token,
          userInfo: user.userInfo
        })
      } else {
        reject(new Error('用户名或密码错误'))
      }
    }, 300) // 模拟网络延迟
  })
} 