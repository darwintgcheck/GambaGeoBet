// src/sections/TokenSelect.tsx
import React from 'react'
import { GambaUi } from 'gamba-react-ui-v2'
import styled from 'styled-components'
import { useUserStore } from '../hooks/useUserStore'

const StyledToken = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
`

export default function TokenSelect() {
  const { balance } = useUserStore()

  return (
    <div style={{ position: 'relative' }}>
      <GambaUi.Button>
        <StyledToken>
           ₾ {balance}
        </StyledToken>
      </GambaUi.Button>
    </div>
  )
}
