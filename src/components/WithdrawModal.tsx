// src/components/WithdrawModal.tsx
import React, { useState } from "react"
import { Modal } from "./Modal"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function WithdrawModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"warning" | "bank" | "iban" | "done">("warning")
  const [selectedBank, setSelectedBank] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleBankSelect = (bank: string) => {
    setSelectedBank(bank)
    setStep("iban")
  }

  const containerStyle: React.CSSProperties = {
    color: "#fff",
    background: "linear-gradient(145deg, #0d0d0d, #1a1a1a)",
    borderRadius: "18px",
    padding: "25px",
    textAlign: "center",
    minWidth: "320px",
    boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
  }

  const titleStyle: React.CSSProperties = {
    fontSize: "22px",
    marginBottom: "20px",
    fontWeight: "bold",
    color: "#FFD700",
    textShadow: "0 0 5px #000, 0 0 10px #FFD700",
  }

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(90deg, #FFD700, #FFB700)",
    color: "#000",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "12px",
    boxShadow: "0 4px 12px rgba(255, 215, 0, 0.3)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  }

  const bankButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: "linear-gradient(90deg, #333, #111)",
    color: "#FFD700",
  }

  return (
    <Modal onClose={onClose}>
      <motion.div
        style={containerStyle}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {step === "warning" && (
          <motion.div initial={{ y: 20 }} animate={{ y: 0 }}>
            <h3 style={titleStyle}>⚠️ ყურადღება</h3>
            <p style={{ marginTop: "10px", color: "#ddd" }}>
              👉 მინიმუმ <b style={{ color: "#FFD700" }}>50 ლარის დეპოზიტი</b> უნდა შეიტანოთ,
              წინააღმდეგ შემთხვევაში თქვენი გატანის მოთხოვნა არ შესრულდება.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={buttonStyle}
              onClick={() => setStep("bank")}
            >
              OK
            </motion.button>
          </motion.div>
        )}

        {step === "bank" && (
          <motion.div initial={{ y: 20 }} animate={{ y: 0 }}>
            <h3 style={titleStyle}>აირჩიეთ ბანკი</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={bankButtonStyle}
              onClick={() => handleBankSelect("bog")}
            >
              🟠 Bank of Georgia
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={bankButtonStyle}
              onClick={() => handleBankSelect("tbc")}
            >
              🔵 Credo Bank
            </motion.button>
          </motion.div>
        )}

        {step === "iban" && selectedBank && (
          <motion.div initial={{ y: 20 }} animate={{ y: 0 }}>
            <h3 style={titleStyle}>
              {selectedBank === "bog" ? "Bank of Georgia" : "Credo Bank"} IBAN
            </h3>
            <p style={{ marginTop: "12px", fontWeight: "bold", color: "#FFD700" }}>
              {selectedBank === "bog"
                ? "GE65BG0000000580850481 მ.კ"
                : "GE14CD0360000048596727 მ.კ"}
            </p>

            <p style={{ marginTop: "12px", color: "red", fontWeight: "bold" }}>
              ⚠️ გთხოვთ მინიმუმ 50 ლარის გადარიცხვა აღნიშნულ ანგარიშზე. <br />
              თუ დეპოზიტს არ შეიტანთ და დააჭერთ „გადახდა შესრულდა“ ღილაკს, 
              თქვენი გატანის მოთხოვნა არ შესრულდება.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={buttonStyle}
              onClick={() => setStep("done")}
            >
              ✅ გადახდა შესრულდა
            </motion.button>
          </motion.div>
        )}

        {step === "done" && (
          <motion.div initial={{ y: 20 }} animate={{ y: 0 }}>
            <h3 style={titleStyle}>✅ თქვენი მოთხოვნა მიღებულია</h3>
            <p style={{ color: "#aaa" }}>15 წუთში აისახება თქვენს ბალანსზე.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={buttonStyle}
              onClick={() => {
                onClose()
                navigate("/")
              }}
            >
              OK
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </Modal>
  )
}
