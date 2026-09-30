function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow">
      <p className="text-3xl font-semibold text-teal-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  )
}

export default StatCard