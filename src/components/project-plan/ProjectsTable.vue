<template>
  <div class="q-pa-md">
    <q-table
        class="my-sticky-header-table"
        title="Projects"
        :rows="rows"
        :columns="columns"
        row-key="name"
        flat
        bordered
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-linear-progress size="25px" :value="getProgress" color="accent">
            <div class="absolute-full flex flex-center">
              <q-badge color="white" text-color="accent" :label="getLabel" />
            </div>
          </q-linear-progress>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: "ProjectsTable",
  props: {
    rows: {type: Array},
  },
  data(){
    return {
      columns: [
        { name: 'job', align: 'center', label: 'Job', field: 'job_name', sortable: true },
        { name: 'business_unit', align: 'center', label: 'Business Unit', field: 'business_unit', sortable: true },
        { name: 'client', align: 'center', label: 'Client', field: 'client', sortable: true },
        { name: 'project_manager', align: 'center', label: 'Project Manager', field: 'project_manager', sortable: true },
        { name: 'sdm', align: 'center', label: 'SDM', field: 'sdm', sortable: true },
        { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
        { name: 'quoted_hours', align: 'center', label: 'Quoted Hours', field: 'quoted_hours', sortable: true },
        { name: 'actual_hours', align: 'center', label: 'Actual Hours', field: 'actual_hours', sortable: true },
        { name: 'percent_used', align: 'center', label: 'Percent Used', field: 'percent_used', sortable: true },
        { name: 'estimate_to_complete', align: 'center', label: 'Est To Complete', field: 'estimate_to_complete_hours', sortable: true },
        { name: 'percent_completed', align: 'center', label: 'Percent Completed', field: 'percent_complete', sortable: true },
        { name: 'difference_percent', align: 'center', label: 'Difference Percent', field: 'difference_percent', sortable: true },
        { name: 'forecast_hours', align: 'center', label: 'Forecast Hours', field: 'forecast_hours', sortable: true },
        { name: 'variance_hours', align: 'center', label: 'Variance Hours', field: 'variance_hours', sortable: true },
      ]
    }
  },
  methods: {
    getProgress(){
      return 0.3
    },
    getLabel(){
      return '30%'
    }
  }
}
</script>

<style scoped>

</style>