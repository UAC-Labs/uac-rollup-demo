import React, { useState } from "react";
import { ArrowDownToLine, Repeat2, ServerCog, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    title: "1. Users Submit Transaction Intents",
    description: "Multiple users send signed intents to Coordination Nodes.",
    icon: <ArrowDownToLine className="w-6 h-6 text-blue-600" />, 
    color: "bg-blue-100 border-blue-300",
    cards: [
      { text: "Alice ➝ 10 USDC for 1 ETH", hint: "Alice is trying to buy ETH using USDC" },
      { text: "Bob ➝ 1 ETH for 10 USDC", hint: "Bob wants to sell ETH for USDC" },
      { text: "Carol ➝ 5 DAI for 5 XYZ", hint: "Carol is offering DAI to acquire XYZ token" },
      { text: "Dave ➝ 2 BTC for 100 LTC", hint: "Dave wants to swap BTC for Litecoin" },
      { text: "Emma ➝ 100 LTC for 2 BTC", hint: "Emma wants to trade Litecoin for BTC" }
    ]
  },
  {
    title: "2. Coordination Nodes Match Intents",
    description: "Intents are matched into CUPIDs and bundled together.",
    icon: <Repeat2 className="w-6 h-6 text-green-600" />, 
    color: "bg-green-100 border-green-300",
    cards: [
      { text: "Match: Alice ⇄ Bob", hint: "CUPID formed between Alice and Bob based on value equivalence" },
      { text: "Match: Dave ⇄ Emma", hint: "BTC/LTC swap matched between Dave and Emma" }
    ]
  },
  {
    title: "3. Rollup Bundle Posted to Bitcoin",
    description: "Merkle root of the rollup is embedded in Bitcoin via OP_RETURN or Taproot.",
    icon: <ServerCog className="w-6 h-6 text-yellow-600" />, 
    color: "bg-yellow-100 border-yellow-300",
    cards: [
      { text: "CUPID Bundle", hint: "Group of matched transactions packaged into a single unit" },
      { text: "→ Merkle Root", hint: "Root hash derived from the CUPID bundle" }
    ]
  },
  {
    title: "4. Final Settlement on Bitcoin",
    description: "All matched transactions are atomically finalized and locked on Bitcoin.",
    icon: <ShieldCheck className="w-6 h-6 text-purple-600" />, 
    color: "bg-purple-100 border-purple-300",
    cards: [
      { text: "✔ Alice ⇄ Bob Settled", hint: "Final settlement achieved and visible on-chain" },
      { text: "✔ Dave ⇄ Emma Settled", hint: "Atomic BTC/LTC swap finalized" }
    ]
  }
];

export default function UACRollupDemo() {
  const [authorized, setAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const correctPassword = "uacdemo2025";

if (!authorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
          <h2 className="text-lg font-semibold mb-4">Enter Access Password</h2>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded"
          />
	  <button
            onClick={() => {
              if (passwordInput === correctPassword) setAuthorized(true);
              else alert("Incorrect password");
            }}
            className="w-full px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

const currentStep = steps[stepIndex];
const nextStep = () => setStepIndex((prev) => (prev + 1) % steps.length);

return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">How UAC Coordination Rollups Work</h1>
      <div className="relative w-full max-w-4xl grid grid-cols-4 gap-4">
        {steps.map((step, i) => (
          <button
            key={step.title}
            onClick={() => setStepIndex(i)}
            className={`transition-all duration-500 p-4 rounded-xl border-2 shadow-sm flex flex-col items-center text-center w-full focus:outline-none ${
              i === stepIndex ? step.color : "bg-gray-100 border-gray-200 hover:bg-gray-200"
            }`}
          >
            <div className="mb-2">{step.icon}</div>
            <h2 className="font-semibold text-sm">{step.title}</h2>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
          className={`mt-8 w-full max-w-2xl p-6 rounded-2xl shadow-md border ${currentStep.color} flex flex-col items-center gap-4`}
        >
	  <div className="flex items-start gap-4 w-full">
            <div>{currentStep.icon}</div>
            <div>
              <h2 className="text-xl font-semibold">{currentStep.title}</h2>
              <p className="text-sm text-gray-700 mt-2">{currentStep.description}</p>
              <div className="mt-4 space-y-2">
                {currentStep.cards.filter(card => card.text).map((card, idx) => (
                  <motion.div
                    key={card.text}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ delay: 0.1 * idx, duration: 0.4 }}
                    className="relative px-4 py-2 rounded-lg bg-white border border-gray-300 shadow-sm text-sm group"
                  >
		    {card.text}
                    <div className="absolute left-full ml-2 w-48 p-2 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {card.hint}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

	  {(stepIndex === 2 || stepIndex === 3) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full mt-2 rounded-xl border-2 border-[#f7931a] bg-[#f7931a]/10 p-4"
            >
	      <div className="flex items-start gap-3">
                <img
                  src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=029"
                  alt="Bitcoin logo"
                  className="w-6 h-6 mt-1"
                />
		<div className="text-sm text-gray-800 leading-snug">
                  <h3 className="text-md font-bold text-[#f7931a] mb-2">
                    {stepIndex === 2 ? "Bitcoin Block" : "Final Settlement Block"}
                  </h3>
                  <ul className="list-disc ml-5 space-y-1">
                    {stepIndex === 2 ? (
                      <>
                        <li>Merkle Root of CUPID Bundle</li>
                        <li>Posted via OP_RETURN or Taproot</li>
                        <li>Enables Data Availability for Bundle Verification</li>
                      </>
                    ) : (
                      <>
                        <li>All matched CUPIDs executed atomically</li>
                        <li>Ownership transferred and states updated</li>
                        <li>Immutable settlement written to Bitcoin</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={nextStep}
        className="mt-6 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        Next Step
      </button>
    </div>
  );
}
