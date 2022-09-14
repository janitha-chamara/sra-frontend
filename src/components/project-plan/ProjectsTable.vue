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
    />
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
        { name: 'job', align: 'center', label: 'Job', field: 'jobName', sortable: true },
        { name: 'business_unit', align: 'center', label: 'Business Unit', field: 'businessUnitID', sortable: true },
        { name: 'client', align: 'center', label: 'Client', field: 'clientID', sortable: true },
        { name: 'project_manager', align: 'center', label: 'Project Manager', field: 'projectMangerID', sortable: true },
        { name: 'sdm', align: 'center', label: 'SDM', field: 'sdm', sortable: true },
        { name: 'status', align: 'center', label: 'Status', field: 'statusID', sortable: true },
        { name: 'quoted_hours', align: 'center', label: 'Quoted Hours', field: 'quotedHours', sortable: true },
        { name: 'actual_hours', align: 'center', label: 'Actual Hours', field: 'actualHours', sortable: true },
        { name: 'percent_used', align: 'center', label: 'Percent Used', field: 'percentUsed', sortable: true },
        { name: 'estimate_to_complete', align: 'center', label: 'Est To Complete', field: 'estToComplHours', sortable: true },
        { name: 'percent_completed', align: 'center', label: 'Percent Completed', field: 'percentComplete', sortable: true },
        { name: 'difference_percent', align: 'center', label: 'Difference Percent', field: 'differencePercent', sortable: true },
        { name: 'forecast_hours', align: 'center', label: 'Forecast Hours', field: 'forecastHours', sortable: true },
        { name: 'variance_hours', align: 'center', label: 'Variance Hours', field: 'varianceHours', sortable: true },
      ]
    }
  }
}
</script>

<style scoped>

</style>