export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/level/index',
    'pages/wrongWords/index',
    'pages/profile/index',
    'pages/parent/index',
    'pages/shop/index',
    'pages/wardrobe/index'
  ],
  tabBar: {
    custom: true,
    list: [
      { pagePath: 'pages/home/index', text: '首页' },
      { pagePath: 'pages/wrongWords/index', text: '错题本' },
      { pagePath: 'pages/profile/index', text: '我的' }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FFD66E',
    navigationBarTitleText: '识字大冒险',
    navigationBarTextStyle: 'black'
  }
})
