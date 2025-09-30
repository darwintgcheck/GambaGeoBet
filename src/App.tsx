// src/App.tsx
import React from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { Modal } from "./components/Modal"
import { ENABLE_TROLLBOX } from "./constants"
import Dashboard from "./sections/Dashboard/Dashboard"
import Game from "./sections/Game/Game"
import Header from "./sections/Header"
import RecentPlays from "./sections/RecentPlays/RecentPlays"
import Toasts from "./sections/Toasts"
import { MainWrapper } from "./styles"
import TrollBox from "./components/TrollBox"
import AuthModal from "./components/AuthModal"

function ScrollToTop() {
  const { pathname } = useLocation()
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const [currentUser, setCurrentUser] = React.useState<any>(
    JSON.parse(localStorage.getItem("currentUser") || "null")
  )

  // დეპოზიტი და გამოტანა modals
  const [depositOpen, setDepositOpen] = React.useState(false)
  const [withdrawOpen, setWithdrawOpen] = React.useState(false)

  return (
    <>
      {/* ავტორიზაციის ფანჯარა */}
      {!currentUser && (
        <AuthModal
          onLogin={() => {
            const user = JSON.parse(localStorage.getItem("currentUser") || "null")
            setCurrentUser(user)
          }}
        />
      )}

      {/* დეპოზიტის Modal */}
      {depositOpen && (
        <Modal onClose={() => setDepositOpen(false)}>
          <h1>დეპოზიტი</h1>
          <p>დაამატეთ თანხა თქვენს ბალანსზე.</p>
          <input type="number" placeholder="თანხა (₾)" />
          <button
            onClick={() => {
              alert("დეპოზიტი შესრულებულია")
              setDepositOpen(false)
            }}
          >
            დადასტურება
          </button>
        </Modal>
      )}

      {/* გამოტანის Modal */}
      {withdrawOpen && (
        <Modal onClose={() => setWithdrawOpen(false)}>
          <h1>გამოტანა</h1>
          <p>გამოიტანეთ თანხა ბალანსიდან.</p>
          <input type="number" placeholder="თანხა (₾)" />
          <button
            onClick={() => {
              alert("გამოტანა შესრულებულია")
              setWithdrawOpen(false)
            }}
          >
            დადასტურება
          </button>
        </Modal>
      )}

      <ScrollToTop />
      <Header
        openDeposit={() => setDepositOpen(true)}
        openWithdraw={() => setWithdrawOpen(true)}
      />
      <Toasts />

      <MainWrapper>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/:gameId" element={<Game />} />
        </Routes>

        <h2 style={{ textAlign: "center" }}>ბოლო თამაშები</h2>
        <RecentPlays />
      </MainWrapper>

      {ENABLE_TROLLBOX && <TrollBox />}
    </>
  )
}
