import React, { createContext, useState } from "react";

// Create two context:
// UserContext: to query the context state
// UserDispatchContext: to mutate the context state
const UserContext = createContext({
  username: 'string'
});
// const UserDispatchContext = createContext({
//   username: 'string'
// });

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function UserProvider({ children }: any) {
  const [userDetails, setUserDetails] = useState({
    username: "John Doe"
  });

  return (
    <UserContext.Provider value={userDetails}>
      {/* <UserDispatchContext.Provider value={setUserDetails}> */}
      {children}
      {/* </UserDispatchContext.Provider> */}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };