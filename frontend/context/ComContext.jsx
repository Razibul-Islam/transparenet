import { createContext, useContext, useState } from "react";
import { UseTNContext } from "./TransparenetContext";

const CompContext = createContext();

export default function ComContext({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);
  const [isGetRoleMember, setIsGetRoleMember] = useState(false);
  const [isProductModalOpen,setIsProductModalOpen]= useState(false);
  const [submittedValue, setSubmittedValue] = useState("");
  const [title, setTitle] = useState("");
  const { Manufacturer, batchRegister, Distributor, Wholesaler, Retailer,hasAnyRole,getMemberByRole,revokeRole } = UseTNContext();

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
    }else if(title === "hasAnyRole"){
      const res = await hasAnyRole(value);
      console.log(res);
    }else if(value === "ADMIN_ROLE" || value === "MANUFACTURER" || value === "WHOLESALER" ||value === "DISTRIBUTOR" || value === "RETAILER"){
      const res = await getMemberByRole(value);
      console.log(res);
    }else{
      const res = await revokeRole(value.role,value.address);
      console.log(res);
    }
  };

  const handleRegister = async (value) => {

    let expireTimeStamp = Math.floor(new Date(value.expiryDate).getTime()/1000);


    const res = await batchRegister(value.batchId,value.name,value.manufacturer,value.composition,expireTimeStamp,value.ipfsDocuments);
    console.log(res);
  }

  const info = {
    submittedValue,
    isModalOpen,
    isGetRoleMember,
    isRevokeModalOpen,
    isProductModalOpen,
    setIsProductModalOpen,
    setIsGetRoleMember,
    setIsRevokeModalOpen,
    setIsModalOpen,
    setSubmittedValue,
    handleSubmit,
    setTitle,
    handleRegister
  };
  return <CompContext.Provider value={info}>{children}</CompContext.Provider>;
}

export const UseCompContext = () => {
  return useContext(CompContext);
};
