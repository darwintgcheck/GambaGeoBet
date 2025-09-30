import React, { useState } from "react"
import styled from "styled-components"

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`

const ModalBox = styled.div`
  background: #111;
  border: 2px solid gold;
  padding: 30px;
  border-radius: 15px;
  width: 350px;
  text-align: center;
  color: white;
  font-family: "Arial", sans-serif;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  background: black;
  border: 1px solid gold;
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  text-align: center;
  &:focus {
    outline: none;
    box-shadow: 0 0 10px gold;
  }
`

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 12px;
  background: gold;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: #ffcc00;
  }
`

const SwitchText = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: #ccc;
  cursor: pointer;
  &:hover {
    color: gold;
  }
`

export default function AuthModal({ onLogin }: { onLogin: (username: string) => void }) {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  // qeydiyyat üçün əlavə sahələr
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [phone, setPhone] = useState("")
  const [passport, setPassport] = useState("")
  const [age, setAge] = useState("")
  const [birth, setBirth] = useState("")

  // Register funksiyası
  const handleRegister = () => {
    if (!username || !password) {
      setMessage("ყველა ველი შეავსეთ!")
      return
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]")

    // mövcud istifadəçi var?
    if (users.find((u: any) => u.username === username)) {
      setMessage("ეს მომხმარებელი უკვე არსებობს!")
      return
    }

    const newUser = {
      username,
      password,
      name,
      surname,
      phone,
      passport,
      age,
      birth,
      balance: 200, // qeydiyyat bonusu
    }

    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("currentUser", JSON.stringify(newUser))
    onLogin(username)
  }

  // Login funksiyası
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const found = users.find((u: any) => u.username === username && u.password === password)

    if (found) {
      localStorage.setItem("currentUser", JSON.stringify(found))
      onLogin(username)
    } else {
      setMessage("მომხმარებელი ან პაროლი არასწორია")
    }
  }

  return (
    <ModalBackground>
      <ModalBox>
        <h2>{isLogin ? "ავტორიზაცია" : "რეგისტრაცია"}</h2>

        <Input
          placeholder="მომხმარებელი"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="პაროლი"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isLogin && (
          <>
            <Input placeholder="სახელი" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="გვარი" value={surname} onChange={(e) => setSurname(e.target.value)} />
            <Input placeholder="ტელეფონი" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Input placeholder="პასპორტის კოდი" value={passport} onChange={(e) => setPassport(e.target.value)} />
            <Input placeholder="ასაკი" value={age} onChange={(e) => setAge(e.target.value)} />
            <Input placeholder="დაბადების თარიღი (dd/mm/yyyy)" value={birth} onChange={(e) => setBirth(e.target.value)} />
          </>
        )}

        {isLogin ? (
          <Button onClick={handleLogin}>შესვლა</Button>
        ) : (
          <Button onClick={handleRegister}>რეგისტრაცია</Button>
        )}

        {message && <p style={{ color: "tomato", marginTop: "10px" }}>{message}</p>}

        <SwitchText onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "არ გაქვთ ანგარიში? რეგისტრაცია" : "უკვე გაქვთ ანგარიში? შესვლა"}
        </SwitchText>
      </ModalBox>
    </ModalBackground>
  )
}
