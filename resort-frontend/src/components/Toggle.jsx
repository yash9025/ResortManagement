"use client"

const Toggle = ({ enabled, onChange, label }) => {
  return (
    <div className="flex items-center">
      {label && <span className="mr-3 text-sm font-medium text-gray-700">{label}</span>}
      <button
        type="button"
        className={`${
          enabled ? "bg-blue-600" : "bg-gray-200"
        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
        onClick={() => onChange(!enabled)}
      >
        <span className="sr-only">Toggle {label}</span>
        <span
          className={`${
            enabled ? "translate-x-5" : "translate-x-0"
          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
        ></span>
      </button>
    </div>
  )
}

export default Toggle

