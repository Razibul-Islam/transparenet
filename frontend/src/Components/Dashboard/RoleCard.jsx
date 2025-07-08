// eslint-disable-next-line no-unused-vars
export const RoleCard = ({ title, icon: Icon, color, count, description }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 mt-2">{count}</p>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      <Icon className="w-12 h-12 text-gray-400" />
    </div>
  </div>
);
