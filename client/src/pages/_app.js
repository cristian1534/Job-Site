import "@/styles/globals.css";
import Layout from "@/components/Layout/Layout";
import { Provider } from "react-redux";
import reduxStore from "../redux/store";



export default function App({ Component, pageProps }) {


  return (
    <Provider store={reduxStore}>
      <Layout>
        <Component {...pageProps}  />
      </Layout>
    </Provider>
  );
}
