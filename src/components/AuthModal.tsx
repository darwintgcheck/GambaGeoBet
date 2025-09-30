import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal } from './Modal'
import { GambaUi } from 'gamba-react-ui-v2'
import { useUserStore } from '../hooks/useUserStore'

const Input = styled.input`
  padding: 10px;
  border: 2px solid #ffd700;
  border-radius: 8px;
  background: black;
  color: #ffffff;  /* Yazı tam ağ olacaq */
  font-size: 16px;
  font-weight: bold;
  outline: none;

  /* Neon effekt yalnız border-də olsun */
  box-shadow: 0 0 8px #ffd700, 0 0 16px #ffae00;

  &::placeholder {
    color: #aaaaaa;
  }
`

const SwitchText = styled.p`
  color: #ffd700;
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
`

export default function AuthModal() {
  const [isRegister, setIsRegister] = useState(false)
  const [form, setForm] = useState({
    username: '',
    password: '',
    displayName: '',
    surname: '',
    phone: '',
    passport: '',
    age: '',
    birthday: '',
  })

  const setUser = useUserStore((state) => state.setUser)
  const login = useUserStore((state) => state.login)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = () => {
    const success = login(form.username, form.password)
    if (!success) {
      alert('❌ მომხმარებელი ან პაროლი არასწორია')
    }
  }

  const handleRegister = () => {
    if (
      !form.username ||
      !form.password ||
      !form.displayName ||
      !form.surname ||
      !form.phone ||
      !form.passport ||
      !form.age ||
      !form.birthday
    ) {
      alert('⚠️ გთხოვთ, შეავსოთ ყველა ველი')
      return
    }

    setUser({
      username: form.username,
      password: form.password,
      displayName: `${form.displayName} ${form.surname}`,
      phone: form.phone,
      passport: form.passport,
      age: parseInt(form.age, 10),
      birthday: form.birthday,
    })

    alert(`🎉 რეგისტრაცია წარმატებულია, ბალანსზე დაემატა 200 ₾`)
  }

  return (
    <Modal>
      <h1 style={{ color: '#ffd700', textAlign: 'center' }}>
        {isRegister ? 'რეგისტრაცია' : 'ავტორიზაცია'}
      </h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          minWidth: '280px',
        }}
      >
        {/* მხოლოდ რეგისტრაციისას */}
        {isRegister && (
          <>
            <Input
              type="text"
              name="displayName"
              placeholder="სახელი"
              value={form.displayName}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="surname"
              placeholder="გვარი"
              value={form.surname}
              onChange={handleChange}
            />
            <Input
              type="tel"
              name="phone"
              placeholder="ტელეფონი"
              value={form.phone}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="passport"
              placeholder="პასპორტის კოდი"
              value={form.passport}
              onChange={handleChange}
            />
            <Input
              type="number"
              name="age"
              placeholder="ასაკი"
              value={form.age}
              onChange={handleChange}
            />
            <Input
              type="date"
              name="birthday"
              placeholder="დაბადების თარიღი"
              value={form.birthday}
              onChange={handleChange}
            />
          </>
        )}

        {/* login + register საერთო */}
        <Input
          type="text"
          name="username"
          placeholder="მომხმარებლის სახელი"
          value={form.username}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="პაროლი"
          value={form.password}
          onChange={handleChange}
        />

        <GambaUi.Button
          main
          onClick={isRegister ? handleRegister : handleLogin}
        >
          {isRegister ? 'რეგისტრაცია' : 'შესვლა'}
        </GambaUi.Button>

        <SwitchText onClick={() => setIsRegister(!isRegister)}>
          {isRegister
            ? 'უკვე გაქვთ ანგარიში? შედით'
            : 'ანგარიში არ გაქვთ? რეგისტრაცია'}
        </SwitchText>
      </div>
    </Modal>
  )
}
