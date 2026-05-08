import { BrowserRouter, Routes, Route } from "react-router-dom";

import PeriodeAkademik from "./pages/PeriodeAkademik";
import TambahPeriode from "./pages/TambahPeriode";
import EditPeriode from "./pages/EditPeriode";
import ViewPeriode from "./pages/ViewPeriode";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<PeriodeAkademik />}
        />

        <Route
          path="/tambah-periode"
          element={<TambahPeriode />}
        />

        <Route
          path="/edit-periode/:id"
          element={<EditPeriode />}
        />

        <Route
          path="/view-periode/:id"
          element={<ViewPeriode />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;