import { useState } from 'react'

function InvoiceForm({ onAdd }) {
  const [client, setClient] = useState('')
  const [amount, setAmount] = useState('')
  const [due, setDue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onAdd({ id: Date.now(), client, amount: Number(amount), due })
    setClient('')
    setAmount('')
    setDue('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-5 shadow mb-6 flex gap-3 flex-wrap">
      <input
        value={client}
        onChange={(e) => setClient(e.target.value)}
        placeholder="Client name"
        required
        className="border rounded-lg px-3 py-2 flex-1 min-w-40"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (₹)"
        required
        className="border rounded-lg px-3 py-2 w-40"
      />
      <input
        type="date"
        value={due}
        onChange={(e) => setDue(e.target.value)}
        required
        className="border rounded-lg px-3 py-2"
      />
      <button type="submit" className="bg-teal-900 text-white px-4 py-2 rounded-lg">
        Add invoice
      </button>
    </form>
  )
}

export default InvoiceForm