
export const storage = {
    access_token: 'access_token',
    token_type: 'token_type',

  /**
   * @description 存储localstorage
   * @param {存储的keyName} name
   * @param {存储的值} value
   */
  setStore: (name, value) => {
      if (!name) return;
      if (typeof value !== 'string') {
        value = JSON.stringify(value)
      }
      window.sessionStorage.setItem(name, value)
  },

  /**
   * @description 读取localstorage
   * @param {存储的keyName} name
   */
  getStore: (name) => {
    if (!name) return;
    return window.sessionStorage.getItem(name)
  },

  /**
   * @description 删除localstorage
   * @param {需要删除的keyName} name
   */
  removeStroe: (name) => {
    if (!name) return;
    window.sessionStorage.removeItem(name)
  }
}
