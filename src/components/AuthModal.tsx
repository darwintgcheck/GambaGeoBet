// src/components/AuthModal.tsx
import React, { useState } from "react"
import { Modal } from "./Modal"
import { GambaUi } from "gamba-react-ui-v2"
import { useUserStore } from "../hooks/useUserStore"

export default function AuthModal() {
  const setUser = useUserStore((state) => state.setUser)
  const [isLogin, setIsLogin] = useState(true)

  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    surname: "",
    phone: "",
    passport: "",
    age: "",
    dob: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // შესვლა
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const found = users.find(
      (u: any) =>
        u.username === form.username && u.password === form.password
    )
    if (!found) {
      alert("❌ მომხმარებლის სახელი ან პაროლი არასწორია")
      return
    }
    setUser(found)
  }

  // რეგისტრაცია
  const handleRegister = () => {
    if (
      !form.username ||
      !form.password ||
      !form.name ||
      !form.surname ||
      !form.phone ||
      !form.passport ||
      !form.age ||
      !form.dob
    ) {
      alert("⚠️ გთხოვთ, შეავსოთ ყველა ველი")
      return
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const exists = users.find((u: any) => u.username === form.username)
    if (exists) {
      alert("⚠️ ეს მომხმარებლის სახელი უკვე გამოყენებულია")
      return
    }

    const newUser = {
      username: form.username,
      password: form.password,
      name: form.name,
      surname: form.surname,
      phone: form.phone,
      passport: form.passport,
      age: form.age,
      dob: form.dob,
      balance: 200, // ბონუსი ახალ მომხმარებელზე
    }

    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))
    setUser(newUser)
  }

  return (
    <Modal>
      {isLogin ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "300px" }}>
          <h2 style={{ textAlign: "center" }}>🔑 შესვლა</h2>
          <input
            type="text"
            name="username"
            placeholder="მომხმარებლის სახელი"
            value={form.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="პაროლი"
            value={form.password}
            onChange={handleChange}
          />
          <GambaUi.Button main onClick={handleLogin}>
            შესვლა
          </GambaUi.Button>
          <p style={{ textAlign: "center" }}>
            არ გაქვთ ანგარიში?{" "}
            <span
              style={{ color: "cyan", cursor: "pointer" }}
              onClick={() => setIsLogin(false)}
            >
              რეგისტრაცია
            </span>
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "300px" }}>
          <h2 style={{ textAlign: "center" }}>📝 რეგისტრაცია</h2>
          <input type="text" name="username" placeholder="მომხმარებლის სახელი" value={form.username} onChange={handleChange} />
          <input type="text" name="name" placeholder="სახელი" value={form.name} onChange={handleChange} />
          <input type="text" name="surname" placeholder="გვარი" value={form.surname} onChange={handleChange} />
          <input type="tel" name="phone" placeholder="ტელეფონის ნომერი" value={form.phone} onChange={handleChange} />
          <input type="text" name="passport" placeholder="პასპორტის კოდი" value={form.passport} onChange={handleChange} />
          <input type="password" name="password" placeholder="პაროლი" value={form.password} onChange={handleChange} />
          <input type="number" name="age" placeholder="ასაკი" value={form.age} onChange={handleChange} />
          <input type="date" name="dob" value={form.dob} onChange={handleChange} />

          <GambaUi.Button main onClick={handleRegister}>
            რეგისტრაცია
          </GambaUi.Button>
          <p style={{ textAlign: "center" }}>
            უკვე გაქვთ ანგარიში?{" "}
            <span
              style={{ color: "cyan", cursor: "pointer" }}
              onClick={() => setIsLogin(true)}
            >
              შესვლა
            </span>
          </p>
        </div>
      )}
    </Modal>
  )
}
