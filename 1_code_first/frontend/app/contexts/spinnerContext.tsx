import { createContext, useState, useContext, type ReactNode } from "react";

interface SpinnerData {
  isActive: boolean;
}

const SpinnerContext = createContext<{
  spinner: SpinnerData;
  activate: React.Dispatch<React.SetStateAction<void>>;
  deactivate: React.Dispatch<React.SetStateAction<void>>;
}>({
  spinner: { isActive: false },
  activate: () => null,
  deactivate: () => null,
});

export const useSpinner = () => {
  return useContext(SpinnerContext);
};

export const SpinnerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [spinner, setSpinner] = useState<SpinnerData>({ isActive: false });
  const activate = () => {
    setSpinner({ isActive: true });
  };

  const deactivate = () => {
    setSpinner({ isActive: false });
  };

  return (
    <SpinnerContext.Provider value={{ spinner, activate, deactivate }}>
      {children}
    </SpinnerContext.Provider>
  );
};
