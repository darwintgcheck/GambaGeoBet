// src/components/AuthModal.tsx
import React, { useState } from 'react'
import styled from 'styled-components'
import { useUserStore } from '../store/useUserStore'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

const Modal = styled.div`
  background: #0d0d0d;
  padding: 30px;
  border-radius: 15px;
  width: 400px;
  box-shadow: 0 0 25px #ffd70088, 0 0 50px #ffcc00aa;
  border: 2px solid #ffd700;
`

const Title = styled.h2`
  text-align: center;
  color: #ffd700;
  font-family: 'Orbitron', sans-serif;
  font-size: 26px;
  margin-bottom: 20px;
`

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border-radius: 8px;
  border: 2px solid #ffd700;
  background: #1a1a1a;
  font-size: 16px;

  /* yazılan hərflər - neon ağ */
  color: #fff;
  text-shadow: 0 0 5px #ffffffaa, 0 0 10px #ffffff88;

  /* placeholder - qızılı */
  &::placeholder {
    color: #ffd700;
    opacity: 0.8;
  }
`

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(45deg, #ffd700, #ffcc00, #ff9900);
  color: #000;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 0 10px #ffd70088, 0 0 20px #ffcc00aa;

  &:hover {
    background: linear-gradient(45deg, #ffcc00, #ffd700, #ffaa00);
    box-shadow: 0 0 20px #ffd700cc, 0 0 40px #ffcc00bb;
  }
`

const SwitchText = styled.p`
  margin-top: 15px;
  text-align: center;
  color: #ccc;
  font-size: 14px;

  span {
    color: #ffd700;
    cursor: pointer;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
`

export default function AuthModal() {
  const { setUser } = useUserStore()
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({
    username: '',
    password: '',
    displayName: '',
    phone: '',
    passport: '',
    age: '',
    birthday: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (isLogin) {
      if (form.username && form.password) {
        alert(`გაიარეთ ავტორიზაცია: ${form.username}`)
      } else {
        alert('გთხოვთ შეიყვანოთ მონაცემები')
      }
    } else {
      if (
        form.username &&
        form.password &&
        form.displayName &&
        form.phone &&
        form.passport &&
        form.age &&
        form.birthday
      ) {
        setUser({
          username: form.username,
          displayName: form.displayName,
          phone: form.phone,
          passport: form.passport,
          age: parseInt(form.age),
          birthday: form.birthday,
        })
        alert('რეგისტრაცია წარმატებულია! 🎉 საჩუქრად მიიღეთ 200 ₾')
      } else {
        alert('გთხოვთ შეავსოთ ყველა ველი')
      }
    }
  }

  return (
    <Overlay>
      <Modal>
        <Title>{isLogin ? 'ავტორიზაცია' : 'რეგისტრაცია'}</Title>

        {isLogin ? (
          <>
            <Input
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
          </>
        ) : (
          <>
            <Input
              name="username"
              placeholder="მომხმარებლის სახელი"
              value={form.username}
              onChange={handleChange}
            />
            <Input
              name="displayName"
              placeholder="სახელი"
              value={form.displayName}
              onChange={handleChange}
            />
            <Input
              name="phone"
              placeholder="ტელეფონის ნომერი"
              value={form.phone}
              onChange={handleChange}
            />
            <Input
              name="passport"
              placeholder="პასპორტის კოდი"
              value={form.passport}
              onChange={handleChange}
            />
            <Input
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
            <Input
              type="password"
              name="password"
              placeholder="პაროლი"
              value={form.password}
              onChange={handleChange}
            />
          </>
        )}

        <Button onClick={handleSubmit}>
          {isLogin ? 'შესვლა' : 'რეგისტრაცია'}
        </Button>

        <SwitchText>
          {isLogin ? (
            <>
              არ გაქვთ ანგარიში?{' '}
              <span onClick={() => setIsLogin(false)}>ანგარიშის შექმნა</span>
            </>
          ) : (
            <>
              უკვე გაქვთ ანგარიში?{' '}
              <span onClick={() => setIsLogin(true)}>შესვლა</span>
            </>
          )}
        </SwitchText>
      </Modal>
    </Overlay>
  )
}
