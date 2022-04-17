import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  // stateに追加したプロパティは全てのコンポーネントからアクセス可能
  state: {
    RoomEnterNo: -1
  },
  getters: {
    GetRoomEnterNo(state){
      return state.RoomEnterNo;
    },
  },
  mutations: {
    SetRoomEnterNo(state) {
      // 0 - 4294967295間のランダムな整数をログインNoに設定（異なるクライアント間で重複する可能性はあるがユーザ数を考慮すると超低確率なので気にしない）
      state.RoomEnterNo = Math.floor(Math.random() * 4294967295)
    },
    ClearRoomEnterNo(state) {
      state.RoomEnterNo = -1
    },
  },
  // actionでは非同期処理を実現できる
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
