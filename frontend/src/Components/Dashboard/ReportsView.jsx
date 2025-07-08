export const ReportsView = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Reports & Analytics
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900">Supply Chain Overview</h4>
          <p className="text-sm text-blue-700 mt-2">
            Complete supply chain visibility
          </p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <h4 className="font-medium text-green-900">Batch Analytics</h4>
          <p className="text-sm text-green-700 mt-2">
            Batch performance metrics
          </p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-medium text-yellow-900">Incident Reports</h4>
          <p className="text-sm text-yellow-700 mt-2">
            Incident trends and analysis
          </p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <h4 className="font-medium text-purple-900">Compliance Reports</h4>
          <p className="text-sm text-purple-700 mt-2">
            Regulatory compliance status
          </p>
        </div>
      </div>
    </div>
  </div>
);
