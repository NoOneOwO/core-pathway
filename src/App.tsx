import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import { Shell } from "./components/Shell.tsx";
import { Limitations } from "./views/Limitations.tsx";
import { Loop } from "./views/Loop.tsx";
import { Missing } from "./views/Missing.tsx";
import { OpportunityMap } from "./views/OpportunityMap.tsx";
import { Overview } from "./views/Overview.tsx";
import { Pathway } from "./views/Pathway.tsx";
import { Presentation } from "./views/Presentation.tsx";
import { Team } from "./views/Team.tsx";

const router = createHashRouter([
  {
    path: "/",
    element: <Shell />,
    children: [
      { index: true, element: <Overview /> },
      { path: "pathway", element: <Navigate to="/pathway/01" replace /> },
      { path: "pathway/:stageId", element: <Pathway /> },
      { path: "team", element: <Team /> },
      { path: "team/:roleId", element: <Team /> },
      { path: "map", element: <OpportunityMap /> },
      { path: "limits", element: <Limitations /> },
      { path: "loop", element: <Loop /> },
      { path: "present", element: <Navigate to="/present/1" replace /> },
      { path: "present/:slideNumber", element: <Presentation /> },
      { path: "*", element: <Missing /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
