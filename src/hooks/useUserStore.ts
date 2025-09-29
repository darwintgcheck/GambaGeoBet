import { StoreApi, create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export interface UserStore {
  user: {
    username: string
    password: string
    name: string
    surname: string
    phone: string
    passport: string
    age: string
    dob: string
    balance: number
  } | null

  gamesPlayed: Array<string>
  lastSelectedPool: { token: string; authority?: string } | null

  markGameAsPlayed: (gameId: string, played: boolean) => void
  setUser: (user: UserStore["user"]) => void
  addBalance: (amount: number) => void
  withdrawBalance: (amount: number) => boolean
  logout: () => void
  set: StoreApi<UserStore>["setState"]
}

export const useUserStore = create(
  persist<UserStore>(
    (set, get) => ({
      user: JSON.parse(localStorage.getItem("currentUser") || "null"),
      lastSelectedPool: null,
      gamesPlayed: [],

      markGameAsPlayed: (gameId, played) => {
        const gamesPlayed = new Set(get().gamesPlayed)
        if (played) {
          gamesPlayed.add(gameId)
        } else {
          gamesPlayed.delete(gameId)
        }
        set({ gamesPlayed: Array.from(gamesPlayed) })
      },

      setUser: (user) => {
        if (!user) return
        localStorage.setItem("currentUser", JSON.stringify(user))
        set({ user })
      },

      addBalance: (amount) => {
        const user = get().user
        if (user) {
          const updated = { ...user, balance: user.balance + amount }
          localStorage.setItem("currentUser", JSON.stringify(updated))
          set({ user: updated })
        }
      },

      withdrawBalance: (amount) => {
        const user = get().user
        if (user && user.balance >= amount) {
          const updated = { ...user, balance: user.balance - amount }
          localStorage.setItem("currentUser", JSON.stringify(updated))
          set({ user: updated })
          return true
        }
        return false
      },

      logout: () => {
        localStorage.removeItem("currentUser")
        set({ user: null })
      },

      set,
    }),
    {
      name: "user",
      storage: createJSONStorage(() => window.localStorage),
    }
  )
)
