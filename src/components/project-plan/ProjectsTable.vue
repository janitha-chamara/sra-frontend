<template>
  <div class="q-pa-md">
    <q-table
      v-if="!isWaiting"
      class="my-sticky-header-table h-[60vh]"
      title="Projects"
      :rows="rows"
      :columns="columns"
      row-key="name"
      flat
      bordered
      @row-click="
        (event, row) => {
          $emit('row-click', row);
        }
      "
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <progress-bar
            :progresses="getProgresses(props)"
            :label="props.row.status"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import ProgressBar from "@/components/project-plan/ProgressBar";
export default {
  name: "ProjectsTable",
  components: { ProgressBar },
  props: {
    rows: { type: Array },
    isWaiting: { type: Boolean },
  },
  data() {
    return {
      columns: [
        {
          name: "job",
          align: "center",
          label: "Job",
          field: "job_name",
          sortable: true,
        },
        {
          name: "business_unit",
          align: "center",
          label: "Business Unit",
          field: "business_unit",
          sortable: true,
        },
        {
          name: "client",
          align: "center",
          label: "Client",
          field: "client",
          sortable: true,
        },
        {
          name: "project_manager",
          align: "center",
          label: "Project Manager",
          field: "project_manager",
          sortable: true,
        },
        {
          name: "sdm",
          align: "center",
          label: "SDM",
          field: "sdm",
          sortable: true,
        },
        {
          name: "status",
          align: "center",
          label: "Status",
          field: "status",
          sortable: true,
        },
        {
          name: "quoted_hours",
          align: "center",
          label: "Quoted Hours",
          field: "quoted_hours",
          sortable: true,
        },
        {
          name: "actual_hours",
          align: "center",
          label: "Actual Hours",
          field: "actual_hours",
          sortable: true,
        },
        {
          name: "percent_used",
          align: "center",
          label: "Percent Used",
          field: "percent_used",
          sortable: true,
        },
        {
          name: "estimate_to_complete",
          align: "center",
          label: "Est To Complete",
          field: "estimate_to_complete_hours",
          sortable: true,
        },
        {
          name: "percent_completed",
          align: "center",
          label: "Percent Completed",
          field: "percent_complete",
          sortable: true,
        },
        {
          name: "difference_percent",
          align: "center",
          label: "Difference Percent",
          field: "difference_percent",
          sortable: true,
        },
        {
          name: "forecast_hours",
          align: "center",
          label: "Forecast Hours",
          field: "forecast_hours",
          sortable: true,
        },
        {
          name: "variance_hours",
          align: "center",
          label: "Variance Hours",
          field: "variance_hours",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    getProgresses(props) {
      const percentComplete = props.row.percent_complete;
      const percentUsed = props.row.percent_used;
      const status = props.row.status;

      let percentCompleteColor = "";
      let percentUsedColor = "";

      if (status === "Completed" && percentUsed <= 100) {
        percentUsedColor = "#639438";
      }

      if ((status === "Completed" || !percentComplete) && percentUsed > 100) {
        percentUsedColor = "#890303";
      }

      return [
        {
          name: "percentUsed",
          progress: percentUsed,
          color: percentUsedColor,
        },
        {
          name: "percentComplete",
          progress: percentComplete,
          color: percentCompleteColor,
        },
      ];
    },
    getLabel() {
      return "30%";
    },
  },
};
</script>

<style scoped></style>
