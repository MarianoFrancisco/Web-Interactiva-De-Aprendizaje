import Register from "./components/Register";
import Login from "./components/Login";
import Layout from "./layouts/Layout";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import NavBarLayout from "./layouts/NavBar";
import PersistLogin from "./components/PersistLogin";
import GameForm from "./components/games/GameForm";
import GameDetail from "./components/games/GameDetail";
import GameList from "./components/games/list/GameList";
import QuizPlay from "./components/games/quiz/QuizPlay";
import Room from "./components/games/Room";
import RoomTest from "./components/RoomTest";
import Comment from "./components/comment/Comment";
import CommentUser from "./components/comment/CommentGuest";
import Medal from "./components/medal/Medal";
import UsersList from "./components/UsersList";
import Ranking from "./components/games/Ranking"
import PruebaRanking from "./components/games/PruebaRanking"
import RoomForm from "./components/room/RoomForm";

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
            <Route path="/" element={<RoomTest />} />
            <Route path="/enter-room" element={<RoomForm />} />
            <Route path="/room/:code" element={<Room />} />
            <Route path="/commentsUsers" element={<CommentUser />} />
            <Route path="/ranking/:game" element={<Ranking />} />
            <Route path="/pruebaRanking" element={<PruebaRanking />} />
            {/* 
          <Route path="/product/:id" element={<ProductOverview />} />
          <Route path="/unauthorized" element={<Unauthorized />} /> */}

            {/* we want to protect these routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
              <Route path="/medals" element={<Medal />} />
              {/* <Route path="/product-form" element={<ProductForm />} />
            <Route path="/profile/products" element={<ProductsList profile={true} />} />
          <Route path="/cards" element={<CreditCardList />} /> */}
            </Route>
            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.Teacher, ROLES.Student]} />
              }
            >
              <Route path="/comments" element={<Comment />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            </Route>
            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.Teacher]} />
              }
            >
              {/* <Route path="/room/:gameId" element={<Room />} /> */}
              <Route path="/room" element={<Room />} />
              <Route path="/new-game" element={<GameForm />} />
              <Route path="/profile/games" element={<GameList />} />
              <Route path="/game-detail/:id" element={<GameDetail />} />
              <Route path="/game/quiz" element={<QuizPlay />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="/users" element={<UsersList />} />
              <Route path="/new-employee" element={<Register admin={true} />} />
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
