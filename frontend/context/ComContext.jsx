import { createContext, useContext, useState } from "react";
import { UseTNContext } from "./TransparenetContext";

const CompContext = createContext();

export default function ComContext({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedValue, setSubmittedValue] = useState("");
  const [title, setTitle] = useState("");
  const { Manufacturer, Distributor, Wholesaler, Retailer } = UseTNContext();

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
    }
  };

  const info = {
    submittedValue,
    isModalOpen,
    setIsModalOpen,
    setSubmittedValue,
    handleSubmit,
    setTitle,
  };
  return <CompContext.Provider value={info}>{children}</CompContext.Provider>;
}

export const UseCompContext = () => {
  return useContext(CompContext);
};
