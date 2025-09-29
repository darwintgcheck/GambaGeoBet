// src/hooks/useUserStore.ts
import { StoreApi, create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface UserStore {
  newcomer: boolean
  userModal: boolean
  gamesPlayed: Array<string>
  lastSelectedPool: { token: string; authority?: string } | null

  username?: string
  displayName?: string
  phone?: string
  passport?: string
  age?: number
  birthday?: string
  balance: number

  markGameAsPlayed: (gameId: string, played: boolean) => void
  setUser: (data: {
    username: string
    displayName: string
    phone: string
    passport: string
    age: number
    birthday: string
  }) => void
  addBalance: (amount: number) => void
  withdrawBalance: (amount: number) => boolean
  logout: () => void
  set: StoreApi<UserStore>['setState']
}

export const useUserStore = create(
  persist<UserStore>(
    (set, get) => ({
      newcomer: true,
      userModal: false,
      lastSelectedPool: null,
      gamesPlayed: [],
      balance: 0, // ilkin olaraq 0, qeydiyyatda 200 olacaq

      markGameAsPlayed: (gameId, played) => {
        const gamesPlayed = new Set(get().gamesPlayed)
        if (played) {
          gamesPlayed.add(gameId)
        } else {
          gamesPlayed.delete(gameId)
        }
        set({ gamesPlayed: Array.from(gamesPlayed) })
      },

      setUser: (data) => {
        set({
          username: data.username,
          displayName: data.displayName,
          phone: data.phone,
          passport: data.passport,
          age: data.age,
          birthday: data.birthday,
          newcomer: false,
          balance: 200, // 🎁 qeydiyyatda avtomatik 200 ₾
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

      logout: () => {
        set({
          username: undefined,
          displayName: undefined,
          phone: undefined,
          passport: undefined,
          age: undefined,
          birthday: undefined,
          balance: 0,
          newcomer: true,
        })
      },

      set,
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => window.localStorage),
    },
  ),
)
