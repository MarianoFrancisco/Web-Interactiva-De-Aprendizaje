import Register from "./components/Register";
import Login from "./components/Login";
import Layout from "./layouts/Layout";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import NavBarLayout from "./layouts/NavBar";
import PersistLogin from "./components/PersistLogin";
import GameForm from "./components/games/GameForm";

export const ROLES = {
  Student: 2000,
  Teacher: 1580,
  Admin: 5002,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PersistLogin />}>
          <Route element={<NavBarLayout />}>
            <Route path="/" element={<h2>home</h2>} />
            {/* 
          <Route path="/product/:id" element={<ProductOverview />} />
          <Route path="/unauthorized" element={<Unauthorized />} /> */}

            {/* we want to protect these routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
              
              {/* <Route path="/product-form" element={<ProductForm />} />
            <Route path="/profile/products" element={<ProductsList profile={true} />} />
            <Route path="/cards" element={<CreditCardList />} /> */}
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.Teacher]} />
              }
            >
              <Route path="/new-game" element={<GameForm />} />
              {/* <Route path="/orders" element={<OrderList />} /> */}
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              {/* <Route path="/users" element={<Users />} />
            <Route path="/new-employee" element={<Register admin={true} />} /> */}
            </Route>

            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
