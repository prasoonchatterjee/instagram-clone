import { useEffect, useContext } from "react";
import Header from "../components/header";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar";
import useUser from "../hooks/use-user";
import LoggedInUserContext from "../context/logged-in-user";
import UserContext from "../context/user";

export default function Dashboard() {
  const logUser = useContext(UserContext);
  const { user } = useUser(logUser.uid);
  useEffect(() => {
    document.title = "Margatsni";
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user }}>
      <div className="bg-gray-background">
        <Header />
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg px-4 lg:px-0">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
}
