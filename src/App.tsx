import { Provider as PaperProvider } from "react-native-paper";

import Layout from "components/layout";

export default function App() {
  return (
    <PaperProvider>
      <Layout />
    </PaperProvider>
  );
}
