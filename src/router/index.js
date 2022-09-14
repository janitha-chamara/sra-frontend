import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from "@/AppLayout";
import ReportView from "@/views/ReportView";
import ProjectPlanView from "@/views/ProjectPlanView";

const routes = [
  {
    path: '/',
    name: 'app-layout',
    component: AppLayout,
    children: [
      {
        path: '/project-plan',
        name: 'project-plan',
        component: ProjectPlanView,
      },
      {
        path: '/report',
        name: 'report',
        component: ReportView,
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
