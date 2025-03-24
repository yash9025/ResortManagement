const StatCard = ({ title, value, icon, color }) => {
  const bgColor = `bg-${color}-100`
  const textColor = `text-${color}-800`
  const iconColor = `text-${color}-500`

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex items-center">
        <div className={`rounded-full p-3 ${bgColor}`}>
          <span className={`${iconColor}`}>{icon}</span>
        </div>
        <div className="ml-4">
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  )
}

export default StatCard

