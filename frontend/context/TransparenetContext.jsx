import { ethers, keccak256, toUtf8Bytes } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import { ContractABI, ContractAddress } from "../utils/accouts";

const TNContext = createContext();

const isEmpty = (v) => v === null || v === undefined || v === "";

export default function TransparenetContext({ children }) {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [Isowner, setIsOwner] = useState(false);
  const [IsManufacturer, setIsManufacturer] = useState(false);
  const [IsDistributor, setIsDistributor] = useState(false);
  const [IsWholesaler, setIsWholesaler] = useState(false);
  const [IsRetailer, setIsRetailer] = useState(false);
  const [provider, setProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          setProvider(provider);

          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });

          if (accounts.length > 0) {
            const currentAccount = accounts[0].toLowerCase();
            setAccount(currentAccount);

            const signer = await provider.getSigner();
            const contractInstance = new ethers.Contract(
              ContractAddress,
              ContractABI,
              signer
            );

            const role = await contractInstance.ADMIN_ROLE();
            const ManufacturerRole = await contractInstance.MANUFACTURER();
            const DistributorRole = await contractInstance.DISTRIBUTOR();
            const WholesalerRole = await contractInstance.WHOLESALER();
            const RetailerRole = await contractInstance.RETAILER();
            const myAddress = await signer.getAddress();
            const ownerAccount = await contractInstance.hasRole(
              role,
              myAddress
            );
            const ManufacturerAcc = await contractInstance.hasRole(
              ManufacturerRole,
              myAddress
            );
            const DistributorAcc = await contractInstance.hasRole(
              DistributorRole,
              myAddress
            );
            const WholeSalerAcc = await contractInstance.hasRole(
              WholesalerRole,
              myAddress
            );
            const RetailerAcc = await contractInstance.hasRole(
              RetailerRole,
              myAddress
            );
            setIsOwner(ownerAccount);
            setIsManufacturer(ManufacturerAcc);
            setIsDistributor(DistributorAcc);
            setIsWholesaler(WholeSalerAcc);
            setIsRetailer(RetailerAcc);
            setContract(contractInstance);

            setIsLoading(false);
          }
        }
      } catch (err) {
        console.error("Error during Initialize: ", err);
      }
    };
    init();
  }, []);

  useEffect(() => {
    try {
      if (window.ethereum) {
        const handleChangeAccount = async (accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            if (contract) {
              const signer = await provider.getSigner();
              const myAddress = await signer.getAddress();
              const role = await contract.ADMIN_ROLE();
              const ManufacturerRole = await contract.MANUFACTURER();
              const DistributorRole = await contract.DISTRIBUTOR();
              const WholesalerRole = await contract.WHOLESALER();
              const RetailerRole = await contract.RETAILER();

              const ownerAccount = await contract.hasRole(role, myAddress);
              const ManufacturerAcc = await contract.hasRole(
                ManufacturerRole,
                myAddress
              );
              const DistributorAcc = await contract.hasRole(
                DistributorRole,
                myAddress
              );
              const WholeSalerAcc = await contract.hasRole(
                WholesalerRole,
                myAddress
              );
              const RetailerAcc = await contract.hasRole(
                RetailerRole,
                myAddress
              );

              setIsOwner(ownerAccount);
              setIsManufacturer(ManufacturerAcc);
              setIsDistributor(DistributorAcc);
              setIsWholesaler(WholeSalerAcc);
              setIsRetailer(RetailerAcc);

              setIsOwner(ownerAccount);
            } else {
              setIsOwner(false);
              setAccount(null);
            }
          }
        };

        window.ethereum.on("accountsChanged", handleChangeAccount);

        return () => {
          window.ethereum.removeListener(
            "accountsChanged",
            handleChangeAccount
          );
        };
      }
    } catch (err) {
      console.error("Error during change Account: ", err);
    }
  }, [contract, provider]);

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0 && provider) {
        setAccount(accounts[0].toLowerCase());

        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        const signer = await provider.getSigner();

        const contractInstance = new ethers.Contract(
          ContractAddress,
          ContractABI,
          signer
        );

        const myAddress = await signer.getAddress();
        const role = await contract.ADMIN_ROLE();
        const ManufacturerRole = await contractInstance.MANUFACTURER();
        const DistributorRole = await contractInstance.DISTRIBUTOR();
        const WholesalerRole = await contractInstance.WHOLESALER();
        const RetailerRole = await contractInstance.RETAILER();

        const ownerAccount = await contractInstance.hasRole(role, myAddress);
        const ManufacturerAcc = await contractInstance.hasRole(
          ManufacturerRole,
          myAddress
        );
        const DistributorAcc = await contractInstance.hasRole(
          DistributorRole,
          myAddress
        );
        const WholeSalerAcc = await contractInstance.hasRole(
          WholesalerRole,
          myAddress
        );
        const RetailerAcc = await contractInstance.hasRole(
          RetailerRole,
          myAddress
        );
        setIsOwner(ownerAccount);
        setIsManufacturer(ManufacturerAcc);
        setIsDistributor(DistributorAcc);
        setIsWholesaler(WholeSalerAcc);
        setIsRetailer(RetailerAcc);
        setContract(contractInstance);
      }
    } catch (err) {
      console.error("error during connecting wallet :", err);
    }
  };

  const Manufacturer = async (addr) => {
    if (!contract && !Isowner) return false;
    try {
      const tx = await contract._makeManufacturer(addr);
      await tx.wait();
      return true;
    } catch (err) {
      console.error("Error during Making Manufacturer :", err);
    }
  };

  const Distributor = async (addr) => {
    if (!contract && !Isowner) return false;
    try {
      const tx = await contract._makeDistributor(addr);
      await tx.wait();
      return true;
    } catch (err) {
      console.error("Error during Making Distributor :", err);
    }
  };

  const Wholesaler = async (addr) => {
    if (!contract && !Isowner) return false;
    try {
      const tx = await contract._makeWholesaler(addr);
      await tx.wait();
      return true;
    } catch (err) {
      console.error("Error during Making Wholesaler :", err);
    }
  };

  const Retailer = async (addr) => {
    if (!contract && !Isowner) return false;
    try {
      const tx = await contract._makeRetailer(addr);
      await tx.wait();
      return true;
    } catch (err) {
      console.error("Error during Making Retailer :", err);
    }
  };

  const revokeRole = async (role, addr) => {
    if (!contract && !Isowner) return false;
    try {
      const tx = await contract.revokeRolee(role, addr);
      await tx.wait();
      return true;
    } catch (err) {
      console.error("Error during Revoke Role :", err);
    }
  };

  const getMemberByRole = async (role) => {
    if (!contract && !Isowner) return [];
    try {
      const members = await contract.getRoleMembers(role);
      return members;
    } catch (err) {
      console.error("Error during Get Member By Role :", err);
    }
  };

  const hasAnyRole = async (addr) => {
    if (!contract && !Isowner) return false;

    const Roles = {
      ADMIN_ROLE: keccak256(toUtf8Bytes("ADMIN_ROLE")),
      MANUFACTURER: keccak256(toUtf8Bytes("MANUFACTURER")),
      DISTRIBUTOR: keccak256(toUtf8Bytes("DISTRIBUTOR")),
      WHOLESALER: keccak256(toUtf8Bytes("WHOLESALER")),
      RETAILER: keccak256(toUtf8Bytes("RETAILER")),
    };

    try {
      const Role = await contract.hasAnyRole(addr);

      if (
        Role ===
        "0x0000000000000000000000000000000000000000000000000000000000000000"
      ) {
        return "No Role";
      }

      if (Role === Roles.ADMIN_ROLE) return "ADMIN";
      if (Role === Roles.MANUFACTURER) return "MANUFACTURER";
      if (Role === Roles.DISTRIBUTOR) return "DISTRIBUTOR";
      if (Role === Roles.WHOLESALER) return "WHOLESALER";
      if (Role === Roles.RETAILER) return "RETAILER";

      return "Unknown Role";
    } catch (err) {
      console.error("Error during Getting has any Role :", err);
    }
  };

  const batchRegister = async (
    batchId,
    name,
    manufacturer,
    composition,
    expiryDate,
    ipfsDocuments
  ) => {
    if (!contract) return false;
    if (isEmpty(batchId)) throw new Error("Batch id Required");
    if (isEmpty(name)) throw new Error("Name Required");
    if (isEmpty(manufacturer)) throw new Error("Manufacturer Required");
    if (isEmpty(composition)) throw new Error("Composition Required");
    if (isEmpty(expiryDate)) throw new Error("ExpiryDate Required");

    try {
      setIsLoading(true);

      const tx = await contract.registerBatch(
        batchId,
        name,
        manufacturer,
        composition,
        expiryDate,
        ipfsDocuments,
        []
      );
      await tx.wait();
      return true;
    } catch (err) {
      console.error("Error during Batch Register :", err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const statusUpdate = async (batchId, newStatus) => {
    if (!contract) return false;

    if (isEmpty(batchId)) throw new Error("Batch Id is Required");
    if (isEmpty(newStatus)) throw new Error("New Status is Required");

    try {
      setIsLoading(true);

      const tx = await contract.updateStatus(batchId, newStatus);
      await tx.wait();
      return true;
    } catch (err) {
      console.error("Error during Updating Status :", err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const documentAdd = async (batchId, ipfsHash) => {
    if (!contract) return false;

    if (isEmpty(batchId)) throw new Error("Batch Id is Required");
    if (isEmpty(ipfsHash)) throw new Error("IPFS Hash is Required");

    try {
      setIsLoading(true);
      const tx = await contract.addDocument(batchId, ipfsHash);
      await tx.wait();
      return true;
    } catch (err) {
      console.error("Error during Updating Status :", err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const batchDetailsGet = async (batchId) => {
    if (!contract) return false;
    if (isEmpty(batchId)) throw new Error("Batch Id is Require");

    try {
      setIsLoading(true);
      const batch = await contract.getBatchDetails(batchId);
      return {
        batchId: batch.batchId,
        name: batch.name,
        manufacturer: batch.manufacturer,
        composition: batch.composition,
        manufactureDate: batch.manufactureDate,
        expiryDate: batch.expiryDate,
        currentOwnerr: batch.currentOwner,
        currentStatus: batch.currentStatus,
        ipfsDocuments: batch.ipfsDocuments,
        history: batch.history,
      };
    } catch (err) {
      console.error("Error During Get Batch Details :", err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const IncidentRecord = async (batchId, reason, level, resolved) => {
    if (!contract) return false;
    if (isEmpty(batchId)) throw new Error("Batch Id is required");
    if (isEmpty(reason)) throw new Error("Reason is required");
    if (isEmpty(level)) throw new Error("Level is required");
    if (isEmpty(resolved)) throw new Error("Resolved is required");

    try {
      setIsLoading(true);
      const tx = await contract.recordIncident(
        batchId,
        reason,
        level,
        resolved
      );
      await tx.wait();
      return true;
    } catch (err) {
      console.error("Error during Recording Incident :", err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const BatchIncident = async (batchId) => {
    if (!contract) return false;
    if (isEmpty(batchId)) throw new Error("Batch Id is Required");

    try {
      setIsLoading(true);
      const incident = await contract.getIncidentByBatch(batchId);
      return incident;
    } catch (err) {
      console.error("Error during getting Batch Incident :", err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllBatch = async () => {
    if (!contract) return false;

    try {
      const batchs = await contract.getAllBatches();
      return batchs;
    } catch (err) {
      console.error("Error during Getting all Batchs :", err);
    }
  };

  const getBatchesByOwner = async (addr) => {
    if (!contract) return [];
    if (isEmpty(addr)) throw new Error("Address is required");

    try {
      const batches = await contract.getBatchesByOwner(addr);
      return batches;
    } catch (err) {
      console.error("Error during Getting Batches By owner :", err);
    }
  };

  const BatchesByStatus = async (status) => {
    if (!contract) return [];
    if (isEmpty(status)) throw new Error("Status is Required");

    try {
      const batches = await contract.getBatchesByStatus(status);
      return batches;
    } catch (err) {
      console.error("Error during Getting Batch Status :", err);
    }
  };

  const info = {
    account,
    Isowner,
    IsRetailer,
    IsWholesaler,
    IsDistributor,
    IsManufacturer,
    isLoading,
    connectWallet,
    Manufacturer,
    Distributor,
    Wholesaler,
    Retailer,
    revokeRole,
    getMemberByRole,
    hasAnyRole,
    batchRegister,
    statusUpdate,
    documentAdd,
    batchDetailsGet,
    IncidentRecord,
    BatchIncident,
    getAllBatch,
    getBatchesByOwner,
    BatchesByStatus,
  };

  return <TNContext.Provider value={info}>{children}</TNContext.Provider>;
}

export const UseTNContext = () => {
  return useContext(TNContext);
};
