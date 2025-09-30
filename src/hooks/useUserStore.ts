import { StoreApi, create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface UserStore {
  newcomer: boolean
  userModal: boolean
  gamesPlayed: Array<string>
  lastSelectedPool: { token: string; authority?: string } | null

  username?: string
  password?: string   // 🔑 პაროლი
  displayName?: string
  phone?: string
  passport?: string
  age?: number
  birthday?: string

  balance: number // 💰 ლარში

  markGameAsPlayed: (gameId: string, played: boolean) => void
  setUser: (data: {
    username: string
    password: string
    displayName: string
    phone: string
    passport: string
    age: number
    birthday: string
  }) => void
  login: (username: string, password: string) => boolean
  logout: () => void
  addBalance: (amount: number) => void
  withdrawBalance: (amount: number) => boolean
  set: StoreApi<UserStore>['setState']
}

export const useUserStore = create(
  persist<UserStore>(
    (set, get) => ({
      newcomer: true,
      userModal: false,
      lastSelectedPool: null,
      gamesPlayed: [],
      balance: 0,

      markGameAsPlayed: (gameId, played) => {
        const gamesPlayed = new Set(get().gamesPlayed)
        if (played) {
          gamesPlayed.add(gameId)
        } else {
          gamesPlayed.delete(gameId)
        }
        set({ gamesPlayed: Array.from(gamesPlayed) })
      },

      // ✅ რეგისტრაცია
      setUser: (data) => {
        set({
          username: data.username,
          password: data.password,
          displayName: data.displayName,
          phone: data.phone,
          passport: data.passport,
          age: data.age,
          birthday: data.birthday,
          newcomer: false,
          balance: 200, // 🎁 საწყისი ბალანსი
        })
      },

      // ✅ ლოგინი
      login: (username, password) => {
        const state = get()
        if (state.username === username && state.password === password) {
          set({ newcomer: false, userModal: false })
          return true
        }
        return false
      },

      // ✅ ლოგაუთი
      logout: () => {
        set({
          username: undefined,
          password: undefined,
          displayName: undefined,
          phone: undefined,
          passport: undefined,
          age: undefined,
          birthday: undefined,
          balance: 0,
          newcomer: true,
          userModal: true,
        })
      },

      addBalance: (amount) => {
        set({ balance: get().balance + amount })
      },

      withdrawBalance: (amount) => {
        const state = get()
        if (state.balance >= amount) {
          set({ balance: state.balance - amount })
          return true
        }
        return false
      },

      set,
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => window.localStorage),
    },
  ),
)
