import { createContext, useContext } from "react";

function assignContextToApi(api) {
  const Context = createContext();

  const ApiProvider = ({ children }) => (
    <Context.Provider value={api()}>{children}</Context.Provider>
  );

  const useApi = () => useContext(Context);

  return {
    useApi,
    ApiProvider,
  };
}

export default assignContextToApi;
