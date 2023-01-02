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
      v-model:pagination="pagination"
      @row-click="
        (event, row) => {
          $emit('row-click', row);
        }
      "
    >
      <template v-slot:header-cell-estToComplHours="props">
        <q-th :props="props">
          <div>Estimate</div>
          <div>To</div>
          <div>Complete</div>
        </q-th>
      </template>
      <template v-slot:header-cell-currentQuotedHoursUsed="props">
        <q-th :props="props">
          <div>Current % of</div>
          <div>Quoted Hours</div>
          <div>Used</div>
        </q-th>
      </template>
      <template v-slot:header-cell-totalForeCastHours="props">
        <q-th :props="props">
          <div>Total</div>
          <div>Forecast</div>
          <div>Hours</div>
        </q-th>
      </template>
      <template v-slot:header-cell-currentthroughProject="props">
        <q-th :props="props">
          <div>Current % of</div>
          <div>through</div>
          <div>Project</div>
        </q-th>
      </template>
      <template v-slot:header-cell-forecastQuotedHours="props">
        <q-th :props="props">
          <div>Forecast % of</div>
          <div>Quoted Hours</div>
          <div>to be Used</div>
        </q-th>
      </template>
      <template v-slot:body-cell-jobName="props">
        <q-td :props="props">
          {{ props.row.jobName }}
        </q-td>
      </template>
      <template v-slot:body-cell-estToComplHours="props">
        <q-td :props="props">
          <div v-if="props.row.isTaskComplete">
            {{ props.row.estToComplHours }}
          </div>
          <q-icon v-else name="warning" color="warning" size="1.5rem" />
        </q-td>
      </template>
      <template v-slot:body-cell-projectStatus="props">
        <q-td :props="props">
          <progress-bar
            v-if="props.row.isTaskComplete"
            :progresses="getProgresses(props)"
            :label="props.row.projectStatus"
          />
          <q-icon v-else name="warning" color="warning" size="1.5rem" />
        </q-td>
      </template>
      <template v-slot:body-cell-currentQuotedHoursUsed="props">
        <q-td
          :props="props"
          class="text-bold"
          :class="{
            'text-red': props.row.currentQuotedHoursUsed > 100,
            'text-green': props.row.currentQuotedHoursUsed <= 100,
          }"
        >
          {{ props.row.currentQuotedHoursUsed }}%
        </q-td>
      </template>
      <template v-slot:body-cell-currentthroughProject="props">
        <q-td :props="props">
          <div v-if="props.row.isTaskComplete">
            {{ props.row.currentthroughProject }}%
          </div>
          <q-icon v-else name="warning" color="warning" size="1.5rem" />
        </q-td>
      </template>
      <template v-slot:body-cell-totalForeCastHours="props">
        <q-td :props="props">
          <div v-if="props.row.isTaskComplete">
            {{ props.row.totalForeCastHours }}
          </div>
          <q-icon v-else name="warning" color="warning" size="1.5rem" />
        </q-td>
      </template>
      <template v-slot:body-cell-forecastQuotedHours="props">
        <q-td :props="props">
          <div v-if="props.row.isTaskComplete">
            {{ props.row.forecastQuotedHours }}%
          </div>
          <q-icon v-else name="warning" color="warning" size="1.5rem"
        /></q-td>
      </template>
      <template v-slot:body-cell-wmfLastUpdate="props">
        <q-td :props="props">
          {{ getWmfLastUpdate(props.row.wfmLastUpdate) }}
        </q-td>
      </template>
      <template v-slot:pagination="scope">
        <q-btn
          v-if="scope.pagesNumber > 2"
          icon="first_page"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.firstPage"
        />

        <q-btn
          icon="chevron_left"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.prevPage"
        />

        <q-btn
          icon="chevron_right"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.nextPage"
        />

        <q-btn
          v-if="scope.pagesNumber > 2"
          icon="last_page"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.lastPage"
        />
      </template>
    </q-table>
  </div>
</template>

<script>
import ProgressBar from "@/components/project-plan/ProgressBar";
import moment from "moment";
import Http from "@/services/Http";
export default {
  name: "ProjectsTable",
  components: { ProgressBar },
  props: {
    rows: { type: Array },
    isWaiting: { type: Boolean },
  },
  data() {
    return {
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: null,
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "jobName",
          align: "left",
          label: "Job",
          field: "jobName",
          sortable: true,
          classes: "bg-grey-2 ellipsis",
          style: "max-width: 200px",
          headerClasses: "bg-primary text-white",
          headerStyle: "max-width: 200px",
        },
        {
          name: "clientName",
          align: "left",
          label: "Client",
          field: "clientName",
          sortable: true,
          classes: "bg-grey-2 ellipsis",
          style: "max-width: 200px",
          headerClasses: "bg-primary text-white",
          headerStyle: "max-width: 200px",
        },
        {
          name: "projectManger",
          align: "left",
          label: "Project Manager",
          field: "projectManger",
          sortable: true,
          classes: "bg-grey-2 ellipsis",
          style: "max-width: 200px",
          headerClasses: "bg-primary text-white",
          headerStyle: "max-width: 200px",
        },
        {
          name: "sdm",
          align: "left",
          label: "SDM",
          field: "sdm",
          sortable: true,
          classes: "bg-grey-2 ellipsis",
          style: "max-width: 200px",
          headerClasses: "bg-primary text-white",
          headerStyle: "max-width: 200px",
        },
        {
          name: "projectStatus",
          align: "left",
          label: "Project Status",
          field: "projectStatus",
          sortable: true,
          classes: "bg-grey-2 ellipsis",
          style: "max-width: 250px",
          headerClasses: "bg-primary text-white",
          headerStyle: "max-width: 250px",
        },
        {
          name: "quotedHours",
          align: "left",
          label: "Quoted Hours",
          field: "quotedHours",
          sortable: true,
          classes: "bg-grey-2 ellipsis",
          style: "max-width: 200px",
          headerClasses: "bg-primary text-white",
          headerStyle: "max-width: 200px",
        },
        {
          name: "actualHours",
          align: "left",
          label: "Actual Hours",
          field: "actualHours",
          sortable: true,
          classes: "bg-grey-2 ellipsis",
          style: "max-width: 200px",
          headerClasses: "bg-primary text-white ellipsis",
          headerStyle: "max-width: 200px",
        },
        {
          name: "currentQuotedHoursUsed",
          align: "left",
          label: "Current % of Quoted Hours Used",
          field: "currentQuotedHoursUsed",
          classes: "bg-grey-2 ellipsis",
          style: "max-width: 200px",
          headerClasses: "bg-primary text-white ellipsis",
          headerStyle: "max-width: 100px",
        },
        {
          name: "estToComplHours",
          align: "left",
          label: "Est To Complete",
          field: "estToComplHours",
          sortable: false,
          classes: "bg-grey-2 ellipsis",
          style: "max-width: 200px",
          headerClasses: "bg-primary text-white ellipsis",
          headerStyle: "max-width: 200px",
        },
        {
          name: "totalForeCastHours",
          align: "left",
          label: "Total Forecast Hours",
          field: "totalForeCastHours",
          classes: "bg-grey-2 ellipsis",
          style: "max-width: 100px",
          headerClasses: "bg-primary text-white ellipsis",
          headerStyle: "max-width: 100px",
        },
        {
          name: "currentthroughProject",
          align: "left",
          label: "Current % through Project",
          field: "currentthroughProject",
          classes: "bg-grey-2 ellipsis",
          style: "max-width: 100px",
          headerClasses: "bg-primary text-white ellipsis",
          headerStyle: "max-width: 100px",
        },
        {
          name: "forecastQuotedHours",
          align: "left",
          label: "Forecast % of Quoted Hours to be Used",
          field: "forecastQuotedHours",
          classes: "bg-grey-2 ellipsis",
          style: "max-width: 100px",
          headerClasses: "bg-primary text-white ellipsis",
          headerStyle: "max-width: 100px",
        },
        {
          name: "wmfLastUpdate",
          align: "left",
          label: "Update Date",
          field: "wmfLastUpdate",
          classes: "bg-grey-2 ellipsis",
          style: "max-width: 100px",
          headerClasses: "bg-primary text-white ellipsis",
          headerStyle: "max-width: 100px",
        },
      ],
    };
  },

  computed: {
    pagesNumber() {
      return Math.ceil(this.rows.length / this.pagination.value.rowsPerPage);
    },
  },

  methods: {
    getWmfLastUpdate(wmfLastUpdate) {
      return moment(wmfLastUpdate).format("D-MM-YY");
    },

    async handleClickIsLock(toggleValue, job) {
      await Http.post("Job/UpdateIsLock", {
        ...job,
      });

      this.$emit("update-is-lock");
    },

    getProgresses(props) {
      const percentComplete = props.row.currentthroughProject;
      const percentUsed = props.row.currentQuotedHoursUsed;
      // const status = props.row.projectStatus;

      let percentCompleteColor = "";
      let percentUsedColor = "";

      if (
        percentUsed - percentComplete > 0 &&
        percentUsed - percentComplete <= 5
      ) {
        percentUsedColor = "#f8a018";

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

      if (percentUsed > percentComplete) {
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

      if (percentUsed < percentComplete) {
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

      // if (
      //   status === "Completed" &&
      //   percentComplete === 100 &&
      //   percentUsed <= 100
      // ) {
      //   percentUsedColor = "#639438";
      //
      //   return [
      //     {
      //       name: "percentUsed",
      //       progress: percentUsed,
      //       color: percentUsedColor,
      //     },
      //     {
      //       name: "percentComplete",
      //       progress: percentComplete,
      //       color: percentCompleteColor,
      //     },
      //   ];
      // }
      //
      // if (
      //   status === "Completed" &&
      //   percentComplete === 100 &&
      //   percentUsed > 100
      // ) {
      //   percentUsedColor = "#890303";
      //
      //   return [
      //     {
      //       name: "percentUsed",
      //       progress: percentUsed,
      //       color: percentUsedColor,
      //     },
      //     {
      //       name: "percentComplete",
      //       progress: percentComplete,
      //       color: percentCompleteColor,
      //     },
      //   ];
      // }
      //
      // if (percentComplete < 100 && percentUsed > 100) {
      //   percentUsedColor = "#890303";
      //
      //   return [
      //     {
      //       name: "percentUsed",
      //       progress: percentUsed,
      //       color: percentUsedColor,
      //     },
      //     {
      //       name: "percentComplete",
      //       progress: percentComplete,
      //       color: percentCompleteColor,
      //     },
      //   ];
      // }
      //
      // if (percentComplete < 100 && percentUsed <= 100) {
      //   percentUsedColor = "#639438";
      //
      //   return [
      //     {
      //       name: "percentUsed",
      //       progress: percentUsed,
      //       color: percentUsedColor,
      //     },
      //     {
      //       name: "percentComplete",
      //       progress: percentComplete,
      //       color: percentCompleteColor,
      //     },
      //   ];
      // }
    },
  },
};
</script>

<style scoped></style>
