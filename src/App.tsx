// src/App.tsx
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { GambaUi } from 'gamba-react-ui-v2'
import { useTransactionError } from 'gamba-react-v2'
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Modal } from './components/Modal'
import { ENABLE_TROLLBOX } from './constants'
import { useToast } from './hooks/useToast'
import { useUserStore } from './hooks/useUserStore'
import Dashboard from './sections/Dashboard/Dashboard'
import Game from './sections/Game/Game'
import Header from './sections/Header'
import RecentPlays from './sections/RecentPlays/RecentPlays'
import Toasts from './sections/Toasts'
import { MainWrapper } from './styles'
import TrollBox from './components/TrollBox'

function ScrollToTop() {
  const { pathname } = useLocation()
  React.useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

function ErrorHandler() {
  const walletModal = useWalletModal()
  const toast = useToast()
  const [error, setError] = React.useState<Error>()

  useTransactionError(
    (error) => {
      if (error.message === 'NOT_CONNECTED') {
        walletModal.setVisible(true)
        return
      }
      toast({ title: '❌ Transaction error', description: error.error?.errorMessage ?? error.message })
    },
  )

  return (
    <>
      {error && (
        <Modal onClose={() => setError(undefined)}>
          <h1>შეცდომა</h1>
          <p>{error.message}</p>
        </Modal>
      )}
    </>
  )
}

export default function App() {
  const newcomer = useUserStore((state) => state.newcomer)
  const setUser = useUserStore((state) => state.setUser)

  // დეპოზიტი და გამოტანა modal-ების state
  const [depositOpen, setDepositOpen] = React.useState(false)
  const [withdrawOpen, setWithdrawOpen] = React.useState(false)

  // form state (რეგისტრაციისთვის)
  const [form, setForm] = React.useState({
    username: '',
    displayName: '',
    phone: '',
    passport: '',
    password: '',
    age: '',
    dob: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (
      !form.username ||
      !form.displayName ||
      !form.phone ||
      !form.passport ||
      !form.password ||
      !form.age ||
      !form.dob
    ) {
      alert('გთხოვთ, შეავსოთ ყველა ველი')
      return
    }

    const ageNum = parseInt(form.age, 10)

    setUser({
      username: form.username,
      displayName: form.displayName,
      phone: form.phone,
      passport: form.passport,
      password: form.password,
      age: ageNum,
      dob: form.dob,
      balance: 200, // ახალი მომხმარებელს ავტომატურად ემატება 200 ლარი
    })
    setDepositOpen(false)
  }

  return (
    <>
      {/* რეგისტრაცია */}
      {newcomer && (
        <Modal>
          <h1>რეგისტრაცია</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '280px' }}>
            <input
              type="text"
              name="username"
              placeholder="მომხმარებლის სახელი"
              value={form.username}
              onChange={handleChange}
            />
            <input
              type="text"
              name="displayName"
              placeholder="სახელი და გვარი"
              value={form.displayName}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="ტელეფონის ნომერი"
              value={form.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="passport"
              placeholder="პასპორტის ნომერი"
              value={form.passport}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="პაროლი (11 ციფრი)"
              value={form.password}
              onChange={handleChange}
              maxLength={11}
            />
            <input
              type="number"
              name="age"
              placeholder="ასაკი"
              value={form.age}
              onChange={handleChange}
            />
            <input
              type="date"
              name="dob"
              placeholder="დაბადების თარიღი"
              value={form.dob}
              onChange={handleChange}
            />

            <GambaUi.Button main onClick={handleSubmit}>
              რეგისტრაცია
            </GambaUi.Button>
          </div>
        </Modal>
      )}

      {/* დეპოზიტის Modal */}
      {depositOpen && (
        <Modal onClose={() => setDepositOpen(false)}>
          <h1>დეპოზიტი</h1>
          <p>აქ შეგიძლიათ დაამატოთ თანხა თქვენს ბალანსზე.</p>
          <input type="number" placeholder="თანხა (ლარი)" />
          <GambaUi.Button main onClick={() => alert('დეპოზიტი შესრულებულია')}>
            დადასტურება
          </GambaUi.Button>
        </Modal>
      )}

      {/* გამოტანის Modal */}
      {withdrawOpen && (
        <Modal onClose={() => setWithdrawOpen(false)}>
          <h1>გამოტანა</h1>
          <p>აქ შეგიძლიათ გამოტანოთ თანხა.</p>
          <input type="number" placeholder="თანხა (ლარი)" />
          <GambaUi.Button main onClick={() => alert('გამოტანა შესრულებულია')}>
            დადასტურება
          </GambaUi.Button>
        </Modal>
      )}

      <ScrollToTop />
      <ErrorHandler />
      <Header openDeposit={() => setDepositOpen(true)} openWithdraw={() => setWithdrawOpen(true)} />
      <Toasts />
      <MainWrapper>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/:gameId" element={<Game />} />
        </Routes>
        <h2 style={{ textAlign: 'center' }}>ბოლო თამაშები</h2>
        <RecentPlays />
      </MainWrapper>
      {ENABLE_TROLLBOX && <TrollBox />}
    </>
  )
}
