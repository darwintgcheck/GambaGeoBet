import { StoreApi, create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export interface User {
  username: string
  password: string
  displayName: string
  phone: string
  passport: string
  age: number
  birthday: string
  balance: number
}

export interface UserStore {
  newcomer: boolean
  userModal: boolean
  gamesPlayed: Array<string>
  lastSelectedPool: { token: string; authority?: string } | null

  currentUser?: User | null
  users: User[]

  markGameAsPlayed: (gameId: string, played: boolean) => void
  register: (data: Omit<User, "balance">) => boolean
  login: (username: string, password: string) => boolean
  logout: () => void
  addBalance: (amount: number) => void
  withdrawBalance: (amount: number) => boolean
  set: StoreApi<UserStore>["setState"]
}

export const useUserStore = create(
  persist<UserStore>(
    (set, get) => ({
      newcomer: true,
      userModal: false,
      lastSelectedPool: null,
      gamesPlayed: [],
      users: [],
      currentUser: null,

      markGameAsPlayed: (gameId, played) => {
        const gamesPlayed = new Set(get().gamesPlayed)
        if (played) {
          gamesPlayed.add(gameId)
        } else {
          gamesPlayed.delete(gameId)
        }
        set({ gamesPlayed: Array.from(gamesPlayed) })
      },

      // ✅ რეგისტრაცია — yeni hesab yaradılır
      register: (data) => {
        const users = [...get().users]

        if (users.find((u) => u.username === data.username)) {
          return false // artıq არსებობს
        }

        const newUser: User = {
          ...data,
          balance: 200, // 🎁 საწყისი ბონუსი
        }

        users.push(newUser)
        set({
          users,
          currentUser: newUser,
          newcomer: false,
          userModal: false,
        })
        return true
      },

      // ✅ ლოგინი
      login: (username, password) => {
        const users = get().users
        const user = users.find(
          (u) => u.username === username && u.password === password,
        )
        if (user) {
          set({ currentUser: user, newcomer: false, userModal: false })
          return true
        }
        return false
      },

      // ✅ ლოგაუთი
      logout: () => {
        set({
          currentUser: null,
          newcomer: true,
          userModal: true,
        })
      },

      // ✅ ბალანსის დამატება
      addBalance: (amount) => {
        const { currentUser, users } = get()
        if (!currentUser) return

        const updatedUser = { ...currentUser, balance: currentUser.balance + amount }
        const updatedUsers = users.map((u) =>
          u.username === currentUser.username ? updatedUser : u,
        )

        set({ currentUser: updatedUser, users: updatedUsers })
      },

      // ✅ ბალანსის გამოტანა
      withdrawBalance: (amount) => {
        const { currentUser, users } = get()
        if (!currentUser) return false

        if (currentUser.balance >= amount) {
          const updatedUser = { ...currentUser, balance: currentUser.balance - amount }
          const updatedUsers = users.map((u) =>
            u.username === currentUser.username ? updatedUser : u,
          )

          set({ currentUser: updatedUser, users: updatedUsers })
          return true
        }
        return false
      },

      set,
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => window.localStorage),
    },
  ),
)
