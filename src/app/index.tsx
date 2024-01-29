import { Provider } from "react-redux";

import { Routing } from "../pages";
import { store } from "./store";

import "./styles/index.scss";


function App() {
  return (
      <Provider store={store}>
        <Routing></Routing>
      </Provider>
  );
}

export default App;
