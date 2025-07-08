import { createContext, useContext, useState } from "react";

const CompContext = createContext();

export default function ComContext({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedValue, setSubmittedValue] = useState("");

  const info = {
    submittedValue,
    isModalOpen,
    setIsModalOpen,
    setSubmittedValue,
  };
  return <CompContext.Provider value={info}>{children}</CompContext.Provider>;
}

export const UseCompContext = () => {
  return useContext(CompContext);
};
