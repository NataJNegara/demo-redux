import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRotue from "./components/ProtectedRotue";
import ProfilePage from "./pages/ProfilePage";
import CreatePostPage from "./pages/CreatePostPage";
import UserPostsPage from "./pages/UserPostsPage";
import EditPostPage from "./pages/EditPostPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="" element={<ProtectedRotue />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create" element={<CreatePostPage />} />
        <Route path="/post" element={<UserPostsPage />} />
        <Route path="/post/edit/:postId" element={<EditPostPage />} />
      </Route>
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
