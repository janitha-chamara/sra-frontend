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
      <template v-slot:body-cell-projectStatus="props">
        <q-td :props="props">
          <progress-bar
            :progresses="getProgresses(props)"
            :label="props.row.projectStatus"
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
          name: "jobName",
          align: "left",
          label: "Job",
          field: "jobName",
          sortable: true,
        },
        {
          name: "clientName",
          align: "left",
          label: "Client",
          field: "clientName",
          sortable: true,
        },
        {
          name: "projectManger",
          align: "left",
          label: "Project Manager",
          field: "projectManger",
          sortable: true,
        },
        {
          name: "sdm",
          align: "left",
          label: "SDM",
          field: "sdm",
          sortable: true,
        },
        {
          name: "projectStatus",
          align: "left",
          label: "Project Status",
          field: "projectStatus",
          sortable: true,
        },
        {
          name: "quotedHours",
          align: "left",
          label: "Quoted Hours",
          field: "quotedHours",
          sortable: true,
        },
        {
          name: "actualHours",
          align: "left",
          label: "Actual Hours",
          field: "actualHours",
          sortable: true,
        },
        {
          name: "currentQuotedHoursUsed",
          align: "left",
          label: "Current % of Quoted Hours Used",
          field: "currentQuotedHoursUsed",
          sortable: true,
        },
        {
          name: "estToComplHours",
          align: "left",
          label: "Est To Complete",
          field: "estToComplHours",
          sortable: true,
        },
        {
          name: "totalForeCastHours",
          align: "left",
          label: "Total Forecast Hours",
          field: "totalForeCastHours",
          sortable: true,
        },
        {
          name: "currentthroughProject",
          align: "left",
          label: "Current % through Project",
          field: "currentthroughProject",
          sortable: true,
        },
        {
          name: "forecastQuotedHours",
          align: "left",
          label: "Forecast % of Quoted Hours to be Used",
          field: "forecastQuotedHours",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    getProgresses(props) {
      const percentComplete = props.row.currentthroughProject;
      const percentUsed = props.row.currentQuotedHoursUsed;
      const status = props.row.projectStatus;

      let percentCompleteColor = "";
      let percentUsedColor = "";

      if (
        status === "Completed" &&
        percentComplete === 100 &&
        percentUsed <= 100
      ) {
        percentUsedColor = "#639438";

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
      }

      if (
        status === "Completed" &&
        percentComplete === 100 &&
        percentUsed > 100
      ) {
        percentUsedColor = "#890303";

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
      }

      if (percentComplete < 100 && percentUsed > 100) {
        percentUsedColor = "#890303";

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
      }

      if (percentComplete < 100 && percentUsed <= 100) {
        percentUsedColor = "#639438";

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
      }
    },
  },
};
</script>

<style scoped></style>
