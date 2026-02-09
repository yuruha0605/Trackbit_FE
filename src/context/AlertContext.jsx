import { createContext, useContext, useState } from "react";
import AlertModal from "../components/common/AlertModal";

const AlertContext = createContext(null);

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: null,
  });

  const openAlert = ({ title, description, onConfirm }) => {
    setAlert({
      isOpen: true,
      title,
      description,
      onConfirm,
    });
  };

  const closeAlert = () => {
    setAlert((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <AlertContext.Provider value={{ openAlert }}>
      {children}

      {alert.isOpen && (
        <AlertModal
          title={alert.title}
          description={alert.description}
          onConfirm={() => {
            alert.onConfirm?.();
            closeAlert();
          }}
          onClose={closeAlert}
        />
      )}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within AlertProvider");
  }
  return context;
}
