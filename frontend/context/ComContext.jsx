import { createContext, useContext, useState } from "react";
import { UseTNContext } from "./TransparenetContext";

const CompContext = createContext();

export default function ComContext({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);
  const [isGetRoleMember, setIsGetRoleMember] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isGetDetailsOpen, setIsGetDetailsOpen] = useState(false);
  const [isAllBatch, setIsAllBatch] = useState(false);
  const [ownedBatches, setOwnedBatches] = useState(false);
  const [statusBatches, setStatusBatches] = useState(false);
  const [addDocumentOpen, setAddDocumentOpen] = useState(false);
  const [recordIncidentOpen, setRecordIncidentOpen] = useState(false);
  const [getRecordsOpen, setGetRecordsOpen] = useState(false);
  const [submittedValue, setSubmittedValue] = useState("");
  const [title, setTitle] = useState("");
  const [batchDetails, setBatchDetails] = useState({});
  const [batches, setBatches] = useState([]);
  const {
    Manufacturer,
    batchRegister,
    Distributor,
    Wholesaler,
    Retailer,
    hasAnyRole,
    getMemberByRole,
    revokeRole,
    statusUpdate,
    batchDetailsGet,
    IsRetailer,
    IsWholesaler,
    IsDistributor,
    IsManufacturer,
    getAllBatch,
    getBatchesByOwner,
    documentAdd,
    IncidentRecord,
    BatchIncident,
  } = UseTNContext();

  const handleSubmit = async (value) => {
    if (title === "_makeManufacturer") {
      const res = await Manufacturer(value);
      console.log(res);
    } else if (title === "_makeDistributor") {
      const res = await Distributor(value);
      console.log(res);
    } else if (title === "_makeWholesaler") {
      const res = await Wholesaler(value);
      console.log(res);
    } else if (title === "_makeRetailer") {
      const res = await Retailer(value);
      console.log(res);
    } else if (title === "hasAnyRole") {
      const res = await hasAnyRole(value);
      console.log(res);
    } else if (
      value === "ADMIN_ROLE" ||
      value === "MANUFACTURER" ||
      value === "WHOLESALER" ||
      value === "DISTRIBUTOR" ||
      value === "RETAILER"
    ) {
      const res = await getMemberByRole(value);
      console.log(res);
    } else {
      const res = await revokeRole(value.role, value.address);
      console.log(res);
    }
  };

  const handleRegister = async (value) => {
    let expireTimeStamp = Math.floor(
      new Date(value.expiryDate).getTime() / 1000
    );

    await batchRegister(
      value.batchId,
      value.name,
      value.manufacturer,
      value.composition,
      expireTimeStamp,
      value.ipfsDocuments
    );
  };

  const getAllBatches = async () => {
    const res = await getAllBatch();
    return res;
  };

  const getOwnedBatches = async () => {
    const res = await getBatchesByOwner();
    console.log(res);
    return res;
  };

  const addDocument = async (batchId, document) => {
    await documentAdd(batchId, document);
  };

  const getBatchDetails = async (batchId) => {
    const res = await batchDetailsGet(batchId);
    setBatchDetails(res);
    return res;
  };

  const handleUpdateStatus = async (value) => {
    if (IsManufacturer) {
      const res = await statusUpdate(value, 0);
      console.log(res);
      console.log(value);
    } else if (IsDistributor) {
      const res = await statusUpdate(value, 1);
      console.log(res);
      console.log(value);
    } else if (IsWholesaler) {
      const res = await statusUpdate(value, 2);
      console.log(res);
      console.log(value);
    } else if (IsRetailer) {
      const res = await statusUpdate(value, 3);
      console.log(res);
      console.log(value);
    } else {
      alert("Enter a valid Status");
    }
  };

  const getIncidentDetails = async (value) => {
    if (!value.batchId || !value.reason) {
      alert("Please fill in all fields");
      return;
    }
    if (!["Critical", "High", "Medium", "Low"].includes(value.priority)) {
      alert("Please select a valid priority level");
      return;
    }

    let priorityMap;

    switch (value.priority) {
      case "Critical":
        priorityMap = 0;
        break;
      case "High":
        priorityMap = 1;
        break;
      case "Medium":
        priorityMap = 2;
        break;
      case "Low":
        priorityMap = 3;
        break;
      default:
        alert("Invalid priority level");
        return;
    }

    await IncidentRecord(value.batchId, value.reason, priorityMap, false);
  };

  const getRecords = async (batchId) => {
    if (!batchId) {
      alert("Please enter a batch ID");
      return;
    }
    console.log(batchId);

    const res = await BatchIncident(batchId);
    setBatches(res);
  };

  const info = {
    submittedValue,
    isModalOpen,
    isGetRoleMember,
    isRevokeModalOpen,
    isProductModalOpen,
    isStatusModalOpen,
    isGetDetailsOpen,
    batchDetails,
    isAllBatch,
    ownedBatches,
    statusBatches,
    addDocumentOpen,
    recordIncidentOpen,
    getRecordsOpen,
    batches,
    setGetRecordsOpen,
    setRecordIncidentOpen,
    setAddDocumentOpen,
    setStatusBatches,
    setOwnedBatches,
    setIsAllBatch,
    setIsGetDetailsOpen,
    handleUpdateStatus,
    setIsProductModalOpen,
    setIsGetRoleMember,
    setIsRevokeModalOpen,
    setIsModalOpen,
    setSubmittedValue,
    handleSubmit,
    setTitle,
    handleRegister,
    setIsStatusModalOpen,
    getBatchDetails,
    getAllBatches,
    getOwnedBatches,
    addDocument,
    getIncidentDetails,
    getRecords,
  };
  return <CompContext.Provider value={info}>{children}</CompContext.Provider>;
}

export const UseCompContext = () => {
  return useContext(CompContext);
};
