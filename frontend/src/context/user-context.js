import { createContext, useState } from "react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    auth: false,
    name: "",
    email: "",
    role: "",
    englishLevel: "",
    id: "",
    CVLink: "",
    technicalKnowledge: "",
  });

  const setUserInfo = (user) => {
    const newUser = {
      auth: user.auth,
      name: user.name,
      email: user.email,
      role: user.role,
      id: user.id,
      englishLevel: user.englishLevel,
      CVLink: user.CVLink,
      technicalKnowledge: user.technicalKnowledge,
    };

    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
