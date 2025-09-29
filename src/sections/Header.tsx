// src/sections/Header.tsx
import {
  GambaUi,
  TokenValue,
  useCurrentPool,
  useGambaPlatformContext,
  useUserBalance,
} from 'gamba-react-ui-v2'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Modal } from '../components/Modal'
import LeaderboardsModal from '../sections/LeaderBoard/LeaderboardsModal'
import { PLATFORM_JACKPOT_FEE, PLATFORM_CREATOR_ADDRESS } from '../constants'
import { useMediaQuery } from '../hooks/useMediaQuery'
import TokenSelect from './TokenSelect'
import { UserButton } from './UserButton'
import { ENABLE_LEADERBOARD } from '../constants'

const Bonus = styled.button`
  all: unset;
  cursor: pointer;
  color: #ffe42d;
  border-radius: 10px;
  padding: 2px 10px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  transition: background-color 0.2s;
  &:hover {
    background: white;
  }
`

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  background: #000000cc;
  backdrop-filter: blur(20px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`

const Logo = styled(NavLink)`
  height: 35px;
  margin: 0 15px;
  & > img {
    height: 120%;
  }
`

export default function Header({ openDeposit, openWithdraw }: { openDeposit?: () => void, openWithdraw?: () => void }) {
  const pool = useCurrentPool()
  const context = useGambaPlatformContext()
  const balance = useUserBalance()
  const isDesktop = useMediaQuery('lg') 
  const [showLeaderboard, setShowLeaderboard] = React.useState(false)
  const [bonusHelp, setBonusHelp] = React.useState(false)
  const [jackpotHelp, setJackpotHelp] = React.useState(false)

  return (
    <>
      {bonusHelp && (
        <Modal onClose={() => setBonusHelp(false)}>
          <h1>Bonus ✨</h1>
          <p>
            თქვენ გაქვთ <b>
              <TokenValue amount={balance.bonusBalance} />
            </b>{' '}
            უფასო თამაშის ბალანსი.
          </p>
        </Modal>
      )}

      {jackpotHelp && (
        <Modal onClose={() => setJackpotHelp(false)}>
          <h1>Jackpot 💰</h1>
          <p style={{ fontWeight: 'bold' }}>
            ჯეკპოტშია <TokenValue amount={pool.jackpotBalance} />
          </p>
          <p>ჯეკპოტი იზრდება თითოეული ფსონისას. გამარჯვების შემდეგ თავიდან იწყება.</p>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {context.defaultJackpotFee === 0 ? 'გამორთულია' : 'ჩართულია'}
            <GambaUi.Switch
              checked={context.defaultJackpotFee > 0}
              onChange={(checked) =>
                context.setDefaultJackpotFee(checked ? PLATFORM_JACKPOT_FEE : 0)
              }
            />
          </label>
        </Modal>
      )}

      {ENABLE_LEADERBOARD && showLeaderboard && (
        <LeaderboardsModal
          creator={PLATFORM_CREATOR_ADDRESS.toBase58()}
          onClose={() => setShowLeaderboard(false)}
        />
      )}

      <StyledHeader>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Logo to="/">
            <img alt="Gamba logo" src="/logo.svg" />
          </Logo>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {pool.jackpotBalance > 0 && (
            <Bonus onClick={() => setJackpotHelp(true)}>
              💰 <TokenValue amount={pool.jackpotBalance} />
            </Bonus>
          )}

          {balance.bonusBalance > 0 && (
            <Bonus onClick={() => setBonusHelp(true)}>
              ✨ <TokenValue amount={balance.bonusBalance} />
            </Bonus>
          )}

          {/* Leaderboard shows only on desktop */}
          {isDesktop && (
            <GambaUi.Button onClick={() => setShowLeaderboard(true)}>
              ლიდერბორდი
            </GambaUi.Button>
          )}

          {/* ჩვენი დამატებული ღილაკები */}
          <GambaUi.Button onClick={openDeposit}>დეპოზიტი</GambaUi.Button>
          <GambaUi.Button onClick={openWithdraw}>გამოტანა</GambaUi.Button>

          
          <UserButton />
        </div>
      </StyledHeader>
    </>
  )
}
