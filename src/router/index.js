import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "@/AppLayout";
import ProjectPlanView from "@/views/ProjectPlanView";

const routes = [
  {
    path: "/",
    name: "app-layout",
    component: AppLayout,
    children: [
      {
        path: "/project-plan",
        name: "project-plan",
        component: ProjectPlanView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
