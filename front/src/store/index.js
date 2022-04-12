import { createStore } from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

const getDefaultState = () => {
  return { 
    id: 0,
    name: "サンプルルーム",
    capacity: 0,
    users: 0,
  }
}

export default createStore({
  // stateに追加したプロパティは全てのコンポーネントからアクセス可能
  state: {
    rooms: []
  },
  getters: {
    GetRoomList(state){
      return state.rooms;
    },
    GetRoomInfoByID: (state) => (room_id) => {
      // 場合によると思うが、state.roomsに関してはfilter結果はArray型でリターンされる
      // 欲しいデータは先頭要素なので[0]を指定
      return state.rooms.filter(room => room.id == room_id)[0]
    }
  },
  mutations: {
    StoreInit(state) {
      state.rooms = []
      state.rooms.push(getDefaultState())
    },
    AddRoom(state, payload){
      state.rooms.push(payload)
    },
    IncrementRoomUser(state, room_id){
      state.rooms.filter(function(room){
        if(room.id == room_id){
          room.users += 1
        }
      })
    },
    DecrementRoomUser(state, room_id){
      state.rooms.filter(function(room){
        if(room.id == room_id){
          room.users -= 1
          // 入室人数が0になったら部屋を削除
          if(room.users == 0){
            // フィルタで入室人数0以外の部屋が配列でリターンされるので、それを上書きで実現
            state.rooms = state.rooms.filter((room) => room.id != room_id)
          }
        }
      })
    },
    StoredSubject(state, payload) {
      let room = state.rooms.filter((room) => room.id == payload.id)[0]
      room.subject = payload.subject
      console.log(room)
    }
  },
  // actionでは非同期処理を実現できる
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
