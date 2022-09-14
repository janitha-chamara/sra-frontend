<template>
  <q-card class="m-2 h-auto">
    <q-card-section class="space-y-2">
      <div class="font-medium">Search projects</div>
      <div class="flex space-x-5">
        <q-input dense outlined v-model="text" label="Job NO" class="w-[180px]"/>
        <q-select dense outlined v-model="model" :options="options" class="w-[180px]" label="Job Name"/>
        <q-select dense outlined v-model="model" :options="options" class="w-[180px]" label="Client"/>
        <q-select dense outlined v-model="model" :options="options" class="w-[180px]" label="Business Unit"/>
        <q-select dense outlined v-model="model" :options="options" class="w-[180px]" label="Project Manager"/>
        <q-select dense outlined v-model="model" :options="options" class="w-[180px]" label="Service Delivery Manager"/>
        <q-select dense outlined v-model="model" :options="options" class="w-[180px]" label="Status"/>
      </div>
    </q-card-section>
    <q-card-section>
      <ProjectsTable :rows="projects"/>
    </q-card-section>
  </q-card>
</template>

<script>
import ProjectsTable from "@/components/project-plan/ProjectsTable";
import Http from "@/services/Http";

export default {
  name: "ProjectPlan",

  components: {ProjectsTable},

  data() {
    return {
      projects: [
        {
          job: 'Sample',
          business_unit: 'Sample',
          client: 'Sample',
          project_manager: 'Sample',
          sdm: 'Sample',
          status: 'Sample',
          quoted_hours: 'Sample',
          actual_hours: 'Sample',
          percent_used: 'Sample',
          estimate_to_complete: 'Sample',
          percent_completed: 'Sample',
          difference_percent: 'Sample',
          forecast_hours: 'Sample',
          variance_hours: 'Sample',
        },
      ]
    }
  },

  created() {
    this.fetchJobs()
  },

  methods: {
    async fetchJobs() {
      const {data} = await Http.get('Job/GetAllJobs')
      this.projects = [...data.response]
    }
  }
}
</script>

<style scoped>

</style>