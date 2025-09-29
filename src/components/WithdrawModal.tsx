import React, { useState } from "react"
import { Modal } from "./Modal"
import { useNavigate } from "react-router-dom"

export default function WithdrawModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"warning" | "bank" | "iban" | "done">("warning")
  const [selectedBank, setSelectedBank] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleBankSelect = (bank: string) => {
    setSelectedBank(bank)
    setStep("iban")
  }

  return (
    <Modal onClose={onClose}>
      <div style={{ color: "black" }}>
        {step === "warning" && (
          <div style={{ textAlign: "center" }}>
            <h3>⚠️ ყურადღება</h3>
            <p style={{ marginTop: "10px" }}>
              👉 მინიმუმ <b>50 ლარის დეპოზიტი</b> უნდა შეიტანოთ,
              წინააღმდეგ შემთხვევაში თქვენი გატანის მოთხოვნა არ შესრულდება.
            </p>
            <button
              style={{ marginTop: "15px", width: "100%" }}
              onClick={() => setStep("bank")}
            >
              OK
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

            <p style={{ marginTop: "10px", color: "red", fontWeight: "bold" }}>
              ⚠️ გთხოვთ მინიმუმ 50 ლარის გადარიცხვა აღნიშნულ ანგარიშზე. <br />
              თუ დეპოზიტს არ შეიტანთ და დააჭერთ „გადახდა შესრულდა“ ღილაკს, 
              თქვენი გატანის მოთხოვნა არ შესრულდება.
            </p>

            <button
              style={{ marginTop: "10px", width: "100%" }}
              onClick={() => setStep("done")}
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
