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

  balance: number // მხოლოდ ლარში

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
  set: StoreApi<UserStore>['setState']
}

export const useUserStore = create(
  persist<UserStore>(
    (set, get) => ({
      newcomer: true,
      userModal: false,
      lastSelectedPool: null,
      gamesPlayed: [],
      balance: 200,

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
          balance: 200, // 🎁 რეგისტრაციისას 200 ₾ საწყისი ბალანსი
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
