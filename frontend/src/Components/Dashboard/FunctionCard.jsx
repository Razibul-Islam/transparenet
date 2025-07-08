export const FunctionCard = ({
  title,
  description,
  requiredRoles,
  onExecute,
  disabled = false,
  currentRole,
}) => {
  const hasPermission = requiredRoles.some((role) => role === currentRole);

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 border ${
        hasPermission ? "border-green-200 bg-green-50" : "border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600 mt-2">{description}</p>
          <div className="mt-3">
            <span className="text-xs text-gray-500">Required roles:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {requiredRoles.map((role) => (
                <span
                  key={role}
                  className={`px-2 py-1 text-xs rounded-full ${
                    role === currentRole
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={onExecute}
          disabled={!hasPermission || disabled}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            hasPermission && !disabled
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {hasPermission ? "Execute" : "No Access"}
        </button>
      </div>
    </div>
  );
};
