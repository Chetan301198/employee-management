import "../styles/globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
