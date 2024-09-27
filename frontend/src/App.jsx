import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import SignUp from "./pages/SignUp";
import Dashboard, { DashboardLoader } from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Send, { SendLoader } from "./pages/Send";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/dashboard"
          loader={DashboardLoader}
          element={<Dashboard />}
        />
        <Route path="/send" loader={SendLoader} element={<Send />} />
        <Route path="*" element={<Error />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
