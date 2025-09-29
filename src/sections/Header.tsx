// src/sections/Header.tsx
import React from 'react'
import styled from 'styled-components'
import { useUserStore } from '../hooks/useUserStore'
import { GambaUi } from 'gamba-react-ui-v2'
import { NavLink } from 'react-router-dom'

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: #111;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.6);
`

const Logo = styled(NavLink)`
  font-size: 22px;
  font-weight: bold;
  color: #facc15;
  text-decoration: none;
  &:hover {
    color: #fde047;
  }
`

const RightSection = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

const BalanceBox = styled.div`
  background: #222;
  padding: 6px 14px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 15px;
`

export default function Header({
  openDeposit,
  openWithdraw,
}: {
  openDeposit: () => void
  openWithdraw: () => void
}) {
  const user = useUserStore((state) => state.username)
  const balance = useUserStore((state) => state.balance)
  const logout = useUserStore((state) => state.logout)

  return (
    <StyledHeader>
      <Logo to="/">🎰 GeoCasino</Logo>

      {user && (
        <RightSection>
          <BalanceBox> {balance} ₾</BalanceBox>
          <GambaUi.Button onClick={openDeposit}>დეპოზიტი</GambaUi.Button>
          <GambaUi.Button onClick={openWithdraw}>გატანა</GambaUi.Button>
          <GambaUi.Button onClick={() => logout()}>🚪 გამოსვლა</GambaUi.Button>
        </RightSection>
      )}
    </StyledHeader>
  )
}
