export function daysOverdue(due) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dueDate = new Date(due + 'T00:00:00')
  return Math.round((today - dueDate) / 86400000)
}

export function getStatus(due) {
  const d = daysOverdue(due)
  if (d > 0) return `${d} day${d === 1 ? '' : 's'} overdue`
  if (d === 0) return 'Due today'
  return 'Pending'
}

export function formatDate(due) {
  return new Date(due + 'T00:00:00').toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  })
}
export function getReminder(client, amount, due) {
  const d = daysOverdue(due)
  const date = formatDate(due)
  const amt = `₹${amount.toLocaleString('en-IN')}`

  if (d <= 0) {
    return {
      tone: 'Friendly heads-up',
      text: `Hi ${client}, just a quick note that my invoice of ${amt} is due on ${date}. Let me know if you need anything from my side. Thanks!`,
    }
  }
  if (d <= 7) {
    return {
      tone: 'Polite nudge',
      text: `Hi ${client}, hope you're doing well. I noticed the invoice of ${amt} (due ${date}) hasn't come through yet. Could you let me know the expected date? Thanks so much.`,
    }
  }
  if (d <= 20) {
    return {
      tone: 'Firm follow-up',
      text: `Hi ${client}, following up again on the invoice of ${amt}, now ${d} days past its ${date} due date. Could you confirm a payment date this week?`,
    }
  }
  return {
    tone: 'Final notice',
    text: `Hi ${client}, the invoice of ${amt} is now ${d} days overdue (due ${date}). I need to close this out, so please share a firm payment date by the end of this week.`,
  }
}