// pages/_app.js
import '../styles/globals.css'; // Relative path to styles folder
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
