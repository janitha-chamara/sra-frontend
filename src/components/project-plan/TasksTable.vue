<template>
  <q-dialog
    full-width
    full-height
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', false)"
  >
    <q-card class="">
      <q-card-section>
        <div class="flex justify-between text-h6">
          <div>Tasks</div>
          <div>
            <q-btn
              round
              dense
              icon="close"
              @click="$emit('update:model-value', false)"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="flex flex-col w-full">
          <div class="flex w-full">
            <q-chip
              class="w-1/5 p-4 truncate"
              square
              color="blue-5"
              text-color="white"
              icon="event"
              ><span class="truncate">Job Name:{{ job.jobName }}</span></q-chip
            >
            <q-chip
              class="w-1/5 p-4"
              square
              color="blue-5"
              text-color="white"
              icon="event"
              ><span class="truncate"
                >Client: {{ job.clientName }}</span
              ></q-chip
            >
            <q-chip
              class="w-1/5 p-4"
              square
              color="blue-5"
              text-color="white"
              icon="event"
              ><span class="truncate"
                >Status: {{ job.projectStatus }}</span
              ></q-chip
            >
          </div>
          <div class="flex w-full">
            <q-chip
              class="w-1/5 p-4"
              square
              color="blue-5"
              text-color="white"
              icon="event"
              ><span class="truncate"
                >Project Duration:
                {{
                  new Date(job.startDate).toLocaleDateString() +
                  " - " +
                  new Date(job.dueDate).toLocaleDateString()
                }}</span
              ></q-chip
            >
            <q-chip
              class="w-1/5 p-4"
              square
              color="blue-5"
              text-color="white"
              icon="event"
              ><span class="truncate"
                >Project Manager: {{ job.projectManger }}</span
              ></q-chip
            >
            <q-chip
              class="w-1/5 p-4"
              square
              color="blue-5"
              text-color="white"
              icon="event"
              ><span class="truncate"
                >Service Delivery Manager: {{ job.sdm }}</span
              ></q-chip
            >
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="flex justify-center">
          <q-table
            class="my-sticky-header-table w-5/6"
            :rows="[jobForSummaryTable]"
            :columns="summaryTableColumns"
            row-key="name"
            title="Project Summary"
            flat
            table-header-style="background-color: #ffffff"
            dense
            bordered
            hide-bottom
            table-style="background-color: #87CEFA"
            @row-click="
              (event, row) => {
                $emit('row-click', row);
              }
            "
          >
            <template v-slot:body-cell-projectStatus="props">
              <q-td :props="props">
                <div
                  class="w-full flex justify-center"
                  v-if="
                    !isNaN(parseFloat(props.row.totalHours)) &&
                    grandTotalForeCastHours !== null &&
                    !isNaN(parseFloat(grandTotalForeCastHours))
                  "
                >
                  <progress-bar
                    :progresses="getProgresses(props)"
                    :label="props.row.projectStatus"
                  />
                </div>
                <div v-else>
                  <q-icon name="warning" color="warning" size="1.5rem" />
                </div>
              </q-td>
            </template>
            <template v-slot:body-cell-currentthroughProject="props">
              <q-td :props="props">
                <div
                  v-if="
                    !isNaN(parseFloat(props.row.totalHours)) &&
                    grandTotalForeCastHours !== null &&
                    !isNaN(parseFloat(grandTotalForeCastHours))
                  "
                >
                  {{ props.row.currentthroughProject }}
                </div>
                <div v-else>
                  <q-icon name="warning" color="warning" size="1.5rem" />
                </div>
              </q-td>
            </template>
            <template v-slot:body-cell-currentQuotedHoursUsed="props">
              <q-td :props="props">
                <div
                  v-if="
                    !isNaN(parseFloat(props.row.totalHours)) &&
                    grandTotalForeCastHours !== null &&
                    !isNaN(parseFloat(grandTotalForeCastHours))
                  "
                >
                  {{ props.row.currentQuotedHoursUsed }}
                </div>
                <div v-else>
                  <q-icon name="warning" color="warning" size="1.5rem" />
                </div>
              </q-td>
            </template>
            <template v-slot:body-cell-totalHours="props">
              <q-td :props="props">
                <div
                  v-if="
                    !isNaN(parseFloat(props.row.totalHours)) &&
                    grandTotalForeCastHours !== null &&
                    !isNaN(parseFloat(grandTotalForeCastHours))
                  "
                >
                  {{ props.row.totalHours }}
                </div>
                <div v-else>
                  <q-icon name="warning" color="warning" size="1.5rem" />
                </div>
              </q-td>
            </template>
          </q-table>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-table
          class="my-sticky-header-table w-full"
          :rows="tasksForTable"
          :columns="columns"
          row-key="name"
          flat
          bordered
          :pagination="initialPagination"
          @row-click="
            (event, row) => {
              $emit('row-click', row);
            }
          "
        >
          <template v-slot:body-cell-estToComplHours="props">
            <q-td class="flex space-x-1" align="center" :props="props">
              <q-input
                outlined
                dense
                placeholder="Enter est. to complete"
                type="number"
                :model-value="props.row.estToComplHours"
                @update:model-value="
                  processTaskWithCalculations(props.row, $event)
                "
              />
            </q-td>
          </template>
          <template v-slot:body-cell-totalForecastHours="props">
            <q-td :props="props">
              <div
                v-if="
                  props.row.totalForecastHours !== null &&
                  !isNaN(parseFloat(props.row.totalForecastHours))
                "
              >
                {{ props.row.totalForecastHours }}
              </div>
              <div v-else>
                <q-icon name="warning" color="warning" size="1.5rem" />
              </div>
            </q-td>
          </template>
          <template v-slot:bottom-row>
            <q-tr :props="props">
              <q-td align="left" class="bg-grey-5 text-bold"> Total </q-td>
              <q-td align="left" class="bg-grey-5">
                {{ totalQuotedHours }}
              </q-td>
              <q-td align="left" class="bg-grey-5">
                {{ totalActualHours }} </q-td
              ><q-td align="left" class="bg-grey-5">
                {{ totalPercentUsed }}
              </q-td>
              <q-td align="left" class="bg-grey-5">
                <div></div>
              </q-td>
              <q-td align="left" class="bg-grey-5">
                <div
                  v-if="
                    grandTotalForeCastHours !== null &&
                    !isNaN(parseFloat(grandTotalForeCastHours))
                  "
                >
                  {{ grandTotalForeCastHours }}
                </div>
                <div v-else>
                  <q-icon name="warning" color="warning" size="1.5rem" />
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          color="secondary"
          label="Save"
          v-close-popup
          @click="saveTasksWithUpdatedValues"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import Http from "@/services/Http";
import { useToast } from "vue-toastification";
import { sumBy } from "lodash";
import ProgressBar from "@/components/project-plan/ProgressBar";

export default {
  name: "TasksTable",

  props: {
    modelValue: {
      type: Boolean,
    },
    tasks: {
      type: Array,
    },
    job: {
      type: Object,
    },
  },

  components: { ProgressBar },

  data() {
    return {
      initialPagination: {
        rowsPerPage: null,
      },

      columns: [
        {
          name: "taskName",
          align: "left",
          label: "Task",
          field: "taskName",
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
          name: "percentUsed",
          align: "left",
          label: "Percent Used",
          field: "percentUsed",
          sortable: true,
        },
        {
          name: "estToComplHours",
          align: "left",
          label: "Est. to Complete",
          field: "estToComplHours",
          sortable: true,
        },
        {
          name: "totalForecastHours",
          align: "left",
          label: "Forecast Hours",
          field: "totalForecastHours",
          sortable: true,
        },
      ],
      summaryTableColumns: [
        {
          name: "projectStatus",
          align: "center",
          label: "Project Status",
          field: "projectStatus",
          sortable: true,
        },
        {
          name: "currentQuotedHoursUsed",
          align: "center",
          label: "Current % of Quoted Hours Used",
          field: "currentQuotedHoursUsed",
          sortable: true,
        },
        {
          name: "currentthroughProject",
          align: "center",
          label: "Current % through Project",
          field: "currentthroughProject",
          sortable: true,
        },
        {
          name: "forecastQuotedHours",
          align: "center",
          label: "Forecast % of Quoted Hours to be Used",
          field: "forecastQuotedHours",
          sortable: true,
        },
        {
          name: "totalHours",
          align: "center",
          label: "Total Est. Hours to Completion",
          field: "totalHours",
          sortable: true,
        },
      ],
      tasksForTable: [],
      taskToBeUpdated: null,
      toast: useToast(),
    };
  },

  computed: {
    totalQuotedHours() {
      return sumBy(this.tasksForTable.map((task) => task.quotedHours))?.toFixed(
        2
      );
    },
    totalActualHours() {
      return sumBy(this.tasksForTable.map((task) => task.actualHours))?.toFixed(
        2
      );
    },
    totalPercentUsed() {
      return sumBy(this.tasksForTable.map((task) => task.percentUsed))?.toFixed(
        2
      );
    },
    totalCurrentQuotedHoursUsed() {
      return sumBy(
        this.tasksForTable.map((task) => task.currentQuotedHoursUsed)
      )?.toFixed(2);
    },
    totalEstToComplHours() {
      return sumBy(
        this.tasksForTable.map((task) => task.estToComplHours)
      )?.toFixed(2);
    },
    grandTotalForeCastHours() {
      if (
        this.tasksForTable.some((task) => {
          return task.totalForecastHours === null;
        })
      ) {
        return null;
      }

      return sumBy(
        this.tasksForTable.map((task) => task.totalForecastHours)
      )?.toFixed(2);
    },
    jobForSummaryTable() {
      return {
        ...this.job,
        totalHours: sumBy(this.tasksForTable, (task) => {
          if (task.estToComplHours === null && task.actualHours === null) {
            return task.quotedHours;
          }

          return task.estToComplHours;
        }),
      };
    },
  },

  watch: {
    tasks: {
      handler() {
        this.tasksForTable = [...this.tasks];
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    saveTasksWithUpdatedValues() {
      Http.post("Task/UpdateTask", this.tasksForTable)
        .then(() => {
          this.toast.success("Task updated successfully");

          this.$emit("update-tasks");
        })
        .catch(() => {
          this.toast.error("Server error occurred");
        });
    },

    processTaskWithCalculations(task, estimateToCompleteHours) {
      this.tasksForTable = this.tasksForTable.map((originalTask) => {
        if (originalTask.taskId !== task.taskId) {
          return { ...originalTask };
        }

        return {
          ...task,
          estToComplHours: parseFloat(estimateToCompleteHours),
          totalForecastHours: this.getCalculatedForecastHours(
            task,
            parseFloat(estimateToCompleteHours)
          ),
        };
      });
    },

    getCalculatedForecastHours(task, estimateToCompleteHours) {
      if (task.actualHours === 0 || task.actualHours === null) {
        return estimateToCompleteHours;
      }

      return parseFloat(task.actualHours) + estimateToCompleteHours;
    },

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
