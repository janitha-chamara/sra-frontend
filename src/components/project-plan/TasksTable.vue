<template>
  <q-dialog persistent full-width full-height :model-value="modelValue">
    <q-card class="">
      <q-card-section>
        <div style="color: #002048" class="flex justify-between text-h6">
          <div>{{ job.jobId }} {{ job.jobName }}</div>
          <div>
            <q-btn round dense icon="close" @click="handleClickClose" />
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div style="color: #002048" class="flex flex-row w-full">
          <div class="flex flex-row truncate w-1/3">
            <div class="w-1/5 text-bold">Job Name:</div>
            <div class="w-1/2">{{ job.jobName }}</div>
          </div>
          <div class="flex flex-row truncate w-1/3">
            <div class="w-1/3 text-bold">Client:</div>
            <div class="w-1/2">{{ job.clientName }}</div>
          </div>
        </div>
        <div style="color: #002048" class="flex flex-row mb-4">
          <div class="flex flex-row truncate w-1/3">
            <div class="w-1/5 text-bold">Status:</div>
            <div class="w-1/2">{{ job.projectStatus }}</div>
          </div>
          <div class="flex flex-row truncate w-1/3">
            <div class="w-1/3 text-bold">Project Duration:</div>
            <div class="w-1/2">
              {{
                new Date(job.startDate).toLocaleDateString() +
                " - " +
                new Date(job.dueDate).toLocaleDateString()
              }}
            </div>
          </div>
        </div>

        <!--            <span class="truncate"-->
        <!--              >Project Manager: {{ job.projectManger }}</span-->
        <!--            >-->
        <!--            <span class="truncate"-->
        <!--              >Service Delivery Manager: {{ job.sdm }}</span-->
        <!--            >-->
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="flex justify-center">
          <q-table
            style="color: #002048"
            class="my-sticky-header-table w-5/6"
            :rows="[jobForSummaryTable]"
            :columns="summaryTableColumns"
            row-key="name"
            flat
            table-header-style="background-color: #D4E7E3"
            dense
            bordered
            hide-bottom
            table-style="background-color: #D4E7E3"
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
                  <q-icon name="warning" style="color: #d8766f" size="1.5rem" />
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
                  <q-icon name="warning" style="color: #d8766f" size="1.5rem" />
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
                  <q-icon name="warning" style="color: #d8766f" size="1.5rem" />
                </div>
              </q-td>
            </template>
            <template v-slot:body-cell-forecastQuotedHours="props">
              <q-td :props="props">
                <div
                  v-if="
                    !isNaN(parseFloat(props.row.totalHours)) &&
                    grandTotalForeCastHours !== null &&
                    !isNaN(parseFloat(grandTotalForeCastHours))
                  "
                >
                  {{ props.row.forecastQuotedHours }}
                </div>
                <div v-else>
                  <q-icon name="warning" style="color: #d8766f" size="1.5rem" />
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
                  <q-icon name="warning" style="color: #d8766f" size="1.5rem" />
                </div>
              </q-td>
            </template>
            <template v-slot:body-cell-isLock>
              <q-toggle
                :model-value="!!job.isLock"
                color="deep"
                @update:model-value="handleClickIsLock($event, job)"
              />
            </template>
          </q-table>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-table
          class="my-sticky-header-table w-full"
          :rows="tasksForTable"
          style="color: #002048; max-height: 65vh"
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
          <template v-slot:header-cell-taskName="props">
            <q-th :props="props">Task </q-th>
          </template>
          <template v-slot:header-cell-quotedHours="props">
            <q-th :props="props"> Quoted Hours</q-th>
          </template>
          <template v-slot:header-cell-actualHours="props">
            <q-th :props="props"> Actual Hours</q-th>
          </template>
          <template v-slot:header-cell-percentUsed="props">
            <q-th :props="props">Percent Used </q-th>
          </template>
          <template v-slot:header-cell-estToComplHours="props">
            <q-th :props="props"> Est. to Complete</q-th>
          </template>
          <template v-slot:header-cell-totalForecastHours="props">
            <q-th :props="props"> Forecast Hours</q-th>
          </template>
          <template v-slot:body-cell-estToComplHours="props">
            <q-td class="flex space-x-1" align="center" :props="props">
              <q-input
                outlined
                dense
                placeholder="Enter est. to complete"
                type="number"
                :class="{ 'bg-[#d89951]': isChanged(props.row) }"
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
                <q-icon name="warning" style="color: #d8766f" size="1.5rem" />
              </div>
            </q-td>
          </template>
          <template v-slot:bottom-row>
            <q-tr
              :props="props"
              style="background-color: #625f59; color: white"
            >
              <q-td align="left" class="text-bold"> Total </q-td>
              <q-td align="left" class="">
                {{ totalQuotedHours }}
              </q-td>
              <q-td align="left" class=""> {{ totalActualHours }} </q-td
              ><q-td align="left" class="">
                {{ totalPercentUsed }}
              </q-td>
              <q-td align="left" class="">
                <div></div>
              </q-td>
              <q-td align="left" class="">
                <div
                  v-if="
                    grandTotalForeCastHours !== null &&
                    !isNaN(parseFloat(grandTotalForeCastHours))
                  "
                >
                  {{ grandTotalForeCastHours }}
                </div>
                <div v-else>
                  <q-icon name="warning" style="color: #d8766f" size="1.5rem" />
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          style="background-color: #9cb7a9; color: aliceblue"
          label="Cancel and close"
          @click="handleClickClose"
        />
        <q-btn
          style="background-color: #002048; color: aliceblue"
          label="Save Changes"
          @click="saveTasksWithUpdatedValues"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import Http from "@/services/Http";
import { useToast } from "vue-toastification";
import { cloneDeep, isEqual, sumBy } from "lodash";
import ProgressBar from "@/components/project-plan/ProgressBar";
import { useQuasar } from "quasar";

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

      $q: useQuasar(),

      columns: [
        {
          name: "taskName",
          align: "left",
          label: "Task",
          field: "taskName",
          sortable: true,
          headerStyle: "max-width: 200px; background-color: #D4E7E3",
        },
        {
          name: "quotedHours",
          align: "left",
          label: "Quoted Hours",
          field: "quotedHours",
          sortable: true,
          headerStyle: "max-width: 200px; background-color: #D4E7E3",
        },
        {
          name: "actualHours",
          align: "left",
          label: "Actual Hours",
          field: "actualHours",
          sortable: true,
          headerStyle: "max-width: 200px; background-color: #D4E7E3",
        },
        {
          name: "percentUsed",
          align: "left",
          label: "Percent Used",
          field: "percentUsed",
          sortable: true,
          headerStyle: "max-width: 200px; background-color: #D4E7E3",
        },
        {
          name: "estToComplHours",
          align: "left",
          label: "Est. to Complete",
          field: "estToComplHours",
          sortable: true,
          headerStyle: "max-width: 200px; background-color: #D4E7E3",
        },
        {
          name: "totalForecastHours",
          align: "left",
          label: "Forecast Hours",
          field: "totalForecastHours",
          sortable: true,
          headerStyle: "max-width: 200px; background-color: #D4E7E3",
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
        {
          name: "isLock",
          align: "totalHours",
          label: "Is Lock",
          field: "isLock",
        },
      ],
      tasksForTable: [],
      taskToBeUpdated: null,
      toast: useToast(),
    };
  },

  computed: {
    hasChanges() {
      return !isEqual(this.tasksForTable, this.tasks);
    },

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
        this.tasksForTable = this.tasks.map((task) => cloneDeep(task));
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    handleClickClose() {
      if (!this.hasChanges) {
        this.$emit("update:model-value", false);

        return;
      }

      this.$q
        .dialog({
          title: "Confirm",
          message: "You have unsaved changes. are you sure want to close?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.$emit("update:model-value", false);
        });
    },

    async handleClickIsLock(toggleValue, job) {
      await Http.post("Job/UpdateIsLock", {
        ...job,
        isLock: toggleValue,
      });

      this.$emit("update-is-lock");
    },

    saveTasksWithUpdatedValues() {
      Http.post("Task/UpdateTask", this.tasksForTable)
        .then(() => {
          this.toast.success("Task updated successfully");

          this.$emit("update-tasks");

          this.$emit("update:model-value", false);
        })
        .catch(() => {
          this.toast.error("Server error occurred");
        });
    },

    isChanged(task) {
      const originalTask = this.tasks.find(
        (originalTask) => originalTask.taskId === task.taskId
      );

      return originalTask.estToComplHours !== task.estToComplHours;
    },

    processTaskWithCalculations(task, estimateToCompleteHours) {
      this.tasksForTable = this.tasksForTable.map((originalTask) => {
        if (originalTask.taskId !== task.taskId) {
          return { ...originalTask };
        }

        return {
          ...task,
          estToComplHours: isNaN(parseFloat(estimateToCompleteHours))
            ? null
            : parseFloat(estimateToCompleteHours),
          totalForecastHours: this.getCalculatedForecastHours(
            task,
            parseFloat(estimateToCompleteHours)
          ),
        };
      });
    },

    getCalculatedForecastHours(task, estimateToCompleteHours) {
      const originalTask = this.tasks.find(
        (rawTask) => rawTask.taskId === task.taskId
      );
      if (
        isNaN(estimateToCompleteHours) &&
        originalTask.quotedHours !== null &&
        originalTask.actualHours === null
      ) {
        return originalTask.quotedHours;
      }
      if (
        isNaN(estimateToCompleteHours) &&
        originalTask.quotedHours !== null &&
        originalTask.actualHours !== null
      ) {
        return null;
      }
      if (task.actualHours === 0 || task.actualHours === null) {
        return estimateToCompleteHours;
      }

      return parseFloat(task.actualHours) + estimateToCompleteHours;
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
        percentUsedColor = "#D8766F3C";

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
        percentUsedColor = "#4073773C";

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

<style scoped>
.my-sticky-header-table {
  height: auto;
}

table {
  border-color: #002048;
}

tr:hover {
  background-color: white;
}

thead tr th {
  position: sticky;
  z-index: 1;
}

thead tr:first-child th {
  top: 0;
}

q-table--loading thead tr:last-child th {
  top: 48px;
}

.text-toggle {
  color: #002048 !important;
}
.bg-toggle {
  background: #002048 !important;
}
</style>
