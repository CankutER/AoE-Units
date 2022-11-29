import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Units from "./pages/units";
import UnitDetails from "./pages/unitDetails";
import SharedLayout from "./pages/shared";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout></SharedLayout>}>
          <Route index element={<Landing></Landing>}></Route>
          <Route path="/units" element={<Units></Units>}></Route>
          <Route
            path="/units/:unitId"
            element={<UnitDetails></UnitDetails>}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
