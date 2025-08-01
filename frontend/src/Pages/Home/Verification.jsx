import { useState } from "react";
import {
  Search,
  Package,
  FileText,
  Clock,
  User,
  Building,
  Calendar,
  AlertTriangle,
  CheckCircle,
  QrCode,
} from "lucide-react";
import { UseCompContext } from "../../../context/ComContext";
import { UseTNContext } from "../../../context/TransparenetContext";
import { QRCodeCanvas } from "qrcode.react";

export const Verification = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("results");
  const { getBatchDetails, batchDetails } = UseCompContext();
  const { isLoading } = UseTNContext();

  const statusConfig = {
    0: {
      name: "REGISTERED",
      color: "bg-red-100 text-red-800",
      icon: CheckCircle,
    },
    1: {
      name: "SHIPPED",
      color: "bg-green-100 text-green-800",
      icon: CheckCircle,
    },
    2: {
      name: "IN_TRANSIT",
      color: "bg-blue-100 text-blue-800",
      icon: CheckCircle,
    },
    3: {
      name: "DELIVERED",
      color: "bg-yellow-100 text-yellow-800",
      icon: CheckCircle,
    },
  };

  const formatDate = (timestamp) => {
    return new Date(Number(timestamp)).toLocaleDateString();
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    console.log(searchQuery);
    await getBatchDetails(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const StatusBadge = ({ status }) => {
    const config = statusConfig[Number(status)];

    if (!config) {
      return (
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
          Unknown
        </div>
      );
    }
    const Icon = config.icon;

    return (
      <div
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
      >
        <Icon size={14} />
        {config.name}
      </div>
    );
  };

  const DesignedStatusBadge = ({ status }) => {
    const config = statusConfig[Number(status)];
    if (!config) return null;

    const Icon = config.icon;
    const colorClasses = {
      0: "bg-red-100 text-red-800 border-red-200",
      1: "bg-green-100 text-green-800 border-green-200",
      2: "bg-blue-100 text-blue-800 border-blue-200",
      3: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };

    return (
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${
          colorClasses[Number(status)]
        }`}
      >
        <Icon size={16} />
        {config.name}
      </div>
    );
  };

  const jsonQr = JSON.stringify({
    id: batchDetails.batchId,
    product: batchDetails.name,
    manufacturer: batchDetails.manufacturer,
    status: statusConfig[Number(batchDetails.currentStatus)]?.name || "Unknown",
    mfgDate: new Date(
      Number(batchDetails.manufactureDate) * 1000
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    expDate: new Date(
      Number(batchDetails.expiryDate) * 1000
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    composition: batchDetails.composition,
    verified: true,
    scannedAt: new Date().toISOString(),
  });

  const ResultsTab = () => (
    <div className="space-y-6">
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Searching for batch: {searchQuery}</p>
        </div>
      )}

      {!isLoading && searchQuery && !batchDetails && (
        <div className="text-center py-16">
          <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No batch found
          </h3>
          <p className="text-gray-600">No batch found with ID: {searchQuery}</p>
          <p className="text-sm text-gray-500 mt-2">
            Try: BTH-2024-001 or BTH-2024-002
          </p>
        </div>
      )}

      {!isLoading && !searchQuery && (
        <div className="text-center py-16">
          <Search className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Search for a batch
          </h3>
          <p className="text-gray-600">
            Enter a Batch ID and click Search to view batch details
          </p>
        </div>
      )}

      {batchDetails && (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Package className="h-8 w-8 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">Batch Details</h2>
          </div>

          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Batch ID
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {batchDetails.batchId}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Product Name
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {batchDetails.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Manufacturer
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {batchDetails.manufacturer}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Manufacture Date
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatDate(batchDetails.manufactureDate)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Expiry Date
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatDate(batchDetails.expiryDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Current Owner
                    </p>
                    <p className="text-lg font-mono text-gray-900">
                      {batchDetails.currentOwnerr &&
                        formatAddress(batchDetails?.currentOwnerr)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Current Status
                    </p>
                    <div className="mt-1">
                      <StatusBadge status={batchDetails.currentStatus} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-5 w-5 text-gray-400" />
                <p className="text-sm font-medium text-gray-500">Composition</p>
              </div>
              <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">
                {batchDetails.composition}
              </p>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-5 w-5 text-gray-400" />
                <p className="text-sm font-medium text-gray-500">
                  IPFS Documents
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {batchDetails?.ipfsDocuments?.map((doc, index) => (
                  <a
                    key={index}
                    href={`https://ipfs.io/ipfs/${doc}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                  >
                    <FileText size={14} />
                    {doc.substring(0, 12)}...
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-5 w-5 text-gray-400" />
                <p className="text-sm font-medium text-gray-500">History</p>
              </div>
              <div className="space-y-3">
                {batchDetails?.history?.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-600"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <StatusBadge status={item[2]} />
                      </div>
                      <span className="text-sm text-gray-500 font-medium">
                        {new Date(Number(item[4])).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded border">
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Previous Owner
                        </label>
                        <p className="font-mono text-sm text-gray-800 break-all">
                          {item[0]}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded border">
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Current Owner
                        </label>
                        <p className="font-mono text-sm text-gray-800 break-all">
                          {item[1]}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 bg-white p-3 rounded border">
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Updated By
                      </label>
                      <p className="font-mono text-sm text-gray-800 break-all">
                        {item[3]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const QRCodeTab = () => {
    if (!batchDetails.batchId) {
      return (
        <div className="text-center py-16">
          <QrCode className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No batch selected
          </h3>
          <p className="text-gray-600">
            Please search for a batch first to generate QR code
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* QR Code Generation */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Generate QR Code
          </h2>
          <div className="flex justify-center mb-6">
            <QRCodeCanvas
              size={1000}
              style={{ height: "auto", maxWidth: "50%", width: "100%" }}
              value={jsonQr}
              viewBox={`0 0 256 256`}
            />
          </div>
          <p className="text-center text-gray-600 text-sm">
            Scan this QR code to view batch information
          </p>
        </div>
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Batch Search System
          </h1>
          <p className="text-gray-600">
            Search and manage batch information with ease
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-lg border border-gray-200 max-w-md w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter Batch ID..."
              className="flex-1 px-4 py-3 border-none outline-none text-lg"
            />
            <button
              onClick={handleSearch}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-colors duration-200 flex items-center gap-2 font-medium"
            >
              <Search size={20} />
              Search
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("results")}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === "results"
                  ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
              }`}
            >
              Batch Results
            </button>
            <button
              onClick={() => setActiveTab("QR Code")}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === "QR Code"
                  ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
              }`}
            >
              QR Code
            </button>
          </div>

          <div className="p-6">
            {activeTab === "results" && <ResultsTab />}
            {activeTab === "QR Code" && <QRCodeTab />}
          </div>
        </div>
      </div>
    </div>
  );
};
