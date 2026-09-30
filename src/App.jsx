import { useState, useEffect } from 'react'
import StatCard from './components/StatCard'
import InvoiceCard from './components/InvoiceCard'
import InvoiceForm from './components/InvoiceForm'
import { daysOverdue } from './utils'

function App() {
  const [invoices, setInvoices] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/invoices')
      .then((res) => res.json())
      .then((data) =>
        setInvoices(data.map((inv) => ({ ...inv, id: inv._id })))
      )
      .catch((err) => console.log('Fetch error:', err))
  }, [])

  const unpaid = invoices.filter((inv) => !inv.paid)
  const totalPending = unpaid.reduce((sum, inv) => sum + inv.amount, 0)
  const overdueCount = unpaid.filter((inv) => daysOverdue(inv.due) > 0).length
  const activeCount = unpaid.length

  function addInvoice(newInvoice) {
    fetch('http://localhost:5000/api/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInvoice),
    })
      .then(async (res) => {
        const saved = await res.json()
        if (!res.ok) {
          console.log('Backend error:', saved.message)
          return
        }
        setInvoices([...invoices, { ...saved, id: saved._id }])
      })
      .catch((err) => console.log('Add error:', err))
  }

    function markPaid(id) {
    fetch(`http://localhost:5000/api/invoices/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paid: true }),
    })
      .then(async (res) => {
        const updated = await res.json()
        if (!res.ok) {
          console.log('Backend error:', updated.message)
          return
        }
        setInvoices(
          invoices.map((inv) => (inv.id === id ? { ...inv, paid: true } : inv))
        )
      })
      .catch((err) => console.log('Paid error:', err))
  }

  return (
    <div className="min-h-screen bg-stone-100 p-8">
      <h1 className="text-3xl font-bold text-teal-900 mb-6">PayFollow</h1>

      <InvoiceForm onAdd={addInvoice} />

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total pending" value={`₹${totalPending.toLocaleString('en-IN')}`} />
        <StatCard label="Overdue invoices" value={overdueCount} />
        <StatCard label="Active invoices" value={activeCount} />
      </div>

      <div className="mt-6 space-y-3">
        {invoices.map((inv) => (
          <InvoiceCard
            key={inv.id}
            id={inv.id}
            client={inv.client}
            amount={inv.amount}
            due={inv.due}
            phone={inv.phone}
            paid={inv.paid}
            onPaid={markPaid}
          />
        ))}
      </div>
    </div>
  )
}

export default App