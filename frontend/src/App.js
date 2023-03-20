import Router from "./routes/routes";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import UserProvider from "./context/user-context";

function App() {
  return (
    <UserProvider>
      <Router />
      <NotificationContainer />
    </UserProvider>
  );
}

export default App;
