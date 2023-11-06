import { AuthProvider } from "./src/context/authContext";
import Navigation from "./src/components/Navigation";
import { Provider } from "react-redux";
import configStore from "./src/reduxs/config";
const store = configStore;
export default function App() {
    return (
        <AuthProvider>
            <Provider store={store}>
                <Navigation />
            </Provider>
        </AuthProvider>
    );
}
