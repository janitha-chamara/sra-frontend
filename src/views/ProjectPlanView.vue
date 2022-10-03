<template>
  <q-card class="m-2 h-auto">
    <q-card-section class="space-y-2">
      <div class="font-medium">Search projects</div>
      <div class="flex space-x-5">
        <q-input
          dense
          outlined
          label="Job NO"
          class="w-[180px]"
          v-model="jobNoSearchText"
        />
        <q-input
          dense
          outlined
          v-model="jobNameSearchText"
          class="w-[180px]"
          label="Job Name"
        />
        <q-input
          dense
          outlined
          v-model="clientSearchText"
          class="w-[180px]"
          label="Client"
        />
        <q-input
          dense
          outlined
          v-model="businessUnitSearchText"
          class="w-[180px]"
          label="Business Unit"
        />
        <q-input
          dense
          outlined
          v-model="projectManagerSearchText"
          class="w-[180px]"
          label="Project Manager"
        />
        <q-input
          dense
          outlined
          v-model="serviceDeliveryManagerSearchText"
          class="w-[180px]"
          label="Service Delivery Manager"
        />
        <q-input
          dense
          outlined
          v-model="statusSearchText"
          class="w-[180px]"
          label="Status"
        />
      </div>
    </q-card-section>
    <q-card-section>
      <ProjectsTable
        :rows="projects"
        :is-waiting="isWaiting"
        @row-click="handleClickProjectsTableRow"
      />
    </q-card-section>
    <tasks-table
      v-model="isOpenTasksModal"
      :tasks="selectedJobTasks"
      :job="selectedJob"
    />
  </q-card>
</template>

<script>
import ProjectsTable from "@/components/project-plan/ProjectsTable";
import Http from "@/services/Http";
import TasksTable from "@/components/project-plan/TasksTable";

export default {
  name: "ProjectPlan",

  components: { ProjectsTable, TasksTable },

  data() {
    return {
      isWaiting: false,
      isOpenTasksModal: false,
      selectedJobTasks: [],
      selectedJob: null,
      projects: [
        {
          job: "Sample",
          business_unit: "Sample",
          client: "Sample",
          project_manager: "Sample",
          sdm: "Sample",
          status: "Sample",
          quoted_hours: "Sample",
          actual_hours: "Sample",
          percent_used: "Sample",
          estimate_to_complete: "Sample",
          percent_completed: "Sample",
          difference_percent: "Sample",
          forecast_hours: "Sample",
          variance_hours: "Sample",
        },
      ],
      originalProjects: [
        {
          job: "Sample",
          business_unit: "Sample",
          client: "Sample",
          project_manager: "Sample",
          sdm: "Sample",
          status: "Sample",
          quoted_hours: "Sample",
          actual_hours: "Sample",
          percent_used: "Sample",
          estimate_to_complete: "Sample",
          percent_completed: "Sample",
          difference_percent: "Sample",
          forecast_hours: "Sample",
          variance_hours: "Sample",
        },
      ],
      jobNoSearchText: "",
      jobNameSearchText: "",
      clientSearchText: "",
      businessUnitSearchText: "",
      projectManagerSearchText: "",
      serviceDeliveryManagerSearchText: "",
      statusSearchText: "",
    };
  },

  created() {
    this.fetchJobs();
  },

  watch: {
    jobNoSearchText(newValue) {
      if (newValue === "") {
        this.projects = [...this.originalProjects];

        return;
      }

      this.projects = [
        ...this.projects.filter((project) => {
          return project.job_name.toString().includes(newValue);
        }),
      ];
    },
    jobNameSearchText(newValue) {
      if (newValue === "") {
        this.projects = [...this.originalProjects];

        return;
      }

      this.projects = [
        ...this.projects.filter((project) => {
          return project.job_name.toString().includes(newValue);
        }),
      ];
    },
    clientSearchText(newValue) {
      if (newValue === "") {
        this.projects = [...this.originalProjects];

        return;
      }

      this.projects = [
        ...this.projects.filter((project) => {
          return project.client.toString().includes(newValue);
        }),
      ];
    },
    businessUnitSearchText(newValue) {
      if (newValue === "") {
        this.projects = [...this.originalProjects];

        return;
      }

      this.projects = [
        ...this.projects.filter((project) => {
          return project.business_unit.toString().includes(newValue);
        }),
      ];
    },
    projectManagerSearchText(newValue) {
      if (newValue === "") {
        this.projects = [...this.originalProjects];

        return;
      }

      this.projects = [
        ...this.projects.filter((project) => {
          return project.project_manager.toString().includes(newValue);
        }),
      ];
    },
    serviceDeliveryManagerSearchText(newValue) {
      if (newValue === "") {
        this.projects = [...this.originalProjects];

        return;
      }

      this.projects = [
        ...this.projects.filter((project) => {
          return project.account_manager.toString().includes(newValue);
        }),
      ];
    },
    statusSearchText(newValue) {
      if (newValue === "") {
        this.projects = [...this.originalProjects];

        return;
      }

      this.projects = [
        ...this.projects.filter((project) => {
          return project.status.toString().includes(newValue);
        }),
      ];
    },
  },

  methods: {
    async fetchJobs() {
      this.isWaiting = true;

      const { data } = await Http.get("jobs");

      const projectsWithStatusChartOptions = data.data.map((project) => {
        return {
          ...project,
          chartOptions: {
            title: false,
            legend: false,
            credits: false,
            chart: {
              height: 70,
              width: 300,
              type: "bar",
            },
            xAxis: {
              visible: false,
            },
            yAxis: {
              visible: false,
              min: 0,
              title: {
                text: "Goals",
              },
            },
            plotOptions: {
              series: {
                stacking: "percent",
              },
              dataLabels: {
                enabled: true,
                allowOverlap: true,
              },
            },
            series: [
              {
                dataLabels: [
                  {
                    // align: 'center',
                    format: `{y}%`,
                    inside: true,
                  },
                ],
                data: [{ y: project.percent_complete }],
              },
              {
                dataLabels: [
                  {
                    // align: 'center',
                    format: `{y}%`,
                    inside: true,
                  },
                ],
                data: [{ y: project.percent_used }],
              },
            ],
          },
        };
      });

      this.projects = [...projectsWithStatusChartOptions];
      this.originalProjects = [...projectsWithStatusChartOptions];

      this.isWaiting = false;
    },

    async fetchTasks(jobId) {
      this.isWaiting = true;

      const { data } = await Http.get("tasks", { params: { job_id: jobId } });

      this.selectedJobTasks = [...data.data];

      this.isWaiting = false;
    },

    async handleClickProjectsTableRow(row) {
      this.selectedJob = { ...row };
      await this.fetchTasks(row.id);
      this.isOpenTasksModal = true;
    },
  },
};
</script>

<style scoped></style>
