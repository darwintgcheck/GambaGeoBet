import React, { useState } from "react"
import { Modal } from "./Modal"
import { useNavigate } from "react-router-dom"

export default function DepositModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"amount" | "bank" | "iban" | "done">("amount")
  const [amount, setAmount] = useState("")
  const [selectedBank, setSelectedBank] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleDepositSubmit = () => {
    if (amount) setStep("bank")
  }

  const handleBankSelect = (bank: string) => {
    setSelectedBank(bank)
    setStep("iban")
  }

  const handlePaymentConfirm = () => {
    setStep("done")
  }

  return (
    <Modal onClose={onClose}>
      <div style={{ color: "black" }}>
        {step === "amount" && (
          <div>
            <h3>შეიყვანეთ თანხა</h3>
            <input
              type="number"
              placeholder="თანხა (₾)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "8px" }}
            />
            <button
              style={{ marginTop: "10px", width: "100%" }}
              onClick={handleDepositSubmit}
            >
              გაგრძელება
            </button>
          </div>
        )}

        {step === "bank" && (
          <div>
            <h3>აირჩიეთ ბანკი</h3>
            <button
              style={{ marginTop: "10px", width: "100%" }}
              onClick={() => handleBankSelect("bog")}
            >
              Bank of Georgia
            </button>
            <button
              style={{ marginTop: "10px", width: "100%" }}
              onClick={() => handleBankSelect("tbc")}
            >
              Credo Bank
            </button>
          </div>
        )}

        {step === "iban" && selectedBank && (
          <div>
            <h3>{selectedBank === "bog" ? "Bank of Georgia" : "Credo Bank"} IBAN</h3>
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>
              {selectedBank === "bog"
                ? "GE65BG0000000580850481 მ.კ"
                : "GE14CD0360000048596727 მ.კ"}
            </p>

            <button
              style={{ marginTop: "10px", width: "100%" }}
              onClick={handlePaymentConfirm}
            >
              გადახდა შესრულდა
            </button>
          </div>
        )}

        {step === "done" && (
          <div style={{ textAlign: "center" }}>
            <h3>✅ თქვენი დეპოზიტი მიღებულია</h3>
            <p>15 წუთში აისახება თქვენს ბალანსზე.</p>
            <button
              style={{ marginTop: "15px", width: "100%" }}
              onClick={() => {
                onClose()
                navigate("/") // əsas səhifəyə yönləndiririk
              }}
            >
              OK
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}
