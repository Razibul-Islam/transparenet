export const StatusTracking = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Status Tracking
      </h3>
      <div className="space-y-4">
        {[
          "Manufacturing",
          "Quality Control",
          "Packaging",
          "Shipped",
          "In Transit",
          "Delivered",
        ].map((status, index) => (
          <div
            key={status}
            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index < 3
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">{status}</p>
              <p className="text-sm text-gray-600">Status description</p>
            </div>
            <div className="text-sm text-gray-500">
              {index < 3 ? "✓ Completed" : "Pending"}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
