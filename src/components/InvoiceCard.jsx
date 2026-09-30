import { useState } from 'react'
import { daysOverdue, getStatus, formatDate, getReminder } from '../utils'

function InvoiceCard({ id, client, amount, due, paid, onPaid }) {
  const [showReminder, setShowReminder] = useState(false)
  const [copied, setCopied] = useState(false)
  const overdue = !paid && daysOverdue(due) > 0
  const reminder = getReminder(client, amount, due)

  function copyMessage() {
    navigator.clipboard.writeText(reminder.text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const badgeColor = paid
    ? 'bg-green-100 text-green-700'
    : overdue
    ? 'bg-red-100 text-red-700'
    : 'bg-orange-100 text-orange-700'

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-teal-900">{client}</p>
          <p className="text-sm text-gray-500">Due {formatDate(due)}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-semibold">₹{amount}</p>
          <span className={`text-xs px-2 py-1 rounded-full ${badgeColor}`}>
            {paid ? 'Paid' : getStatus(due)}
          </span>
        </div>
      </div>

      {!paid && (
        <div className="mt-3 flex gap-4">
          <button
            onClick={() => setShowReminder(!showReminder)}
            className="text-sm text-teal-900 underline"
          >
            {showReminder ? 'Hide reminder' : 'Get reminder'}
          </button>
          <button
            onClick={() => onPaid(id)}
            className="text-sm text-green-700 underline"
          >
            Mark as paid
          </button>
        </div>
      )}

      {showReminder && !paid && (
        <div className="mt-3 bg-stone-50 border rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">{reminder.tone}</p>
          <p className="text-sm">{reminder.text}</p>
          <button
            onClick={copyMessage}
            className="mt-2 bg-teal-900 text-white text-sm px-3 py-1 rounded-lg"
          >
            {copied ? 'Copied!' : 'Copy message'}
          </button>
        </div>
      )}
    </div>
  )
}

export default InvoiceCard