const store: Record<string, any> = {}

const Taro = {
  getStorageSync(key: string) {
    return store[key] ?? null
  },
  setStorageSync(key: string, value: any) {
    store[key] = value
  },
  removeStorageSync(key: string) {
    delete store[key]
  },
  showToast() {},
  navigateTo() {},
  navigateBack() {},
  switchTab() {},
  setNavigationBarTitle() {},
  request() {},
  useRouter() {
    return { params: {} }
  },
  useDidShow() {},
}

export default Taro
