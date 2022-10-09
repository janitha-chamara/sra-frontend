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
              color="primary"
              text-color="white"
              icon="event"
              ><span class="truncate">Job Name:{{ job.jobName }}</span></q-chip
            >
            <q-chip
              class="w-1/5 p-4"
              square
              color="primary"
              text-color="white"
              icon="event"
              ><span class="truncate"
                >Client: {{ job.clientName }}</span
              ></q-chip
            >
            <q-chip
              class="w-1/5 p-4"
              square
              color="primary"
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
              color="primary"
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
              color="primary"
              text-color="white"
              icon="event"
              ><span class="truncate"
                >Project Manager: {{ job.projectManger }}</span
              ></q-chip
            >
            <q-chip
              class="w-1/5 p-4"
              square
              color="primary"
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
        <q-table
          class="my-sticky-header-table w-full"
          :rows="tasksForTable"
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
          <template v-slot:body-cell-estToComplHours="props">
            <q-td class="flex space-x-1" align="center" :props="props">
              <q-input
                outlined
                dense
                type="number"
                label="Enter est. to complete"
                :model-value="props.row.estToComplHours"
                @update:model-value="
                  processTaskWithCalculations(props.row, $event)
                "
              /><q-btn
                round
                dense
                color="primary"
                icon="save"
                @click="saveTaskWithUpdatedValues(props.row)"
              />
            </q-td>
          </template>
          <template v-slot:bottom-row>
            <q-tr :props="props">
              <q-td align="center" class="bg-grey-5 text-bold"> Total </q-td>
              <q-td align="center" class="bg-grey-5">
                {{ job.quotedHours }}
              </q-td>
              <q-td align="center" class="bg-grey-5">
                {{ job.actualHours }}
              </q-td>
              <q-td align="center" class="bg-grey-5">
                {{ job.currentQuotedHoursUsed }}
              </q-td>
              <q-td align="center" class="bg-grey-5">
                {{ job.estToComplHours }}
              </q-td>
              <q-td align="center" class="bg-grey-5">
                {{ job.totalForeCastHours }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import Http from "@/services/Http";
import { useToast } from "vue-toastification";

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

  data() {
    return {
      columns: [
        {
          name: "taskName",
          align: "center",
          label: "Task",
          field: "taskName",
          sortable: true,
        },
        {
          name: "quotedHours",
          align: "center",
          label: "Quoted Hours",
          field: "quotedHours",
          sortable: true,
        },
        {
          name: "actualHours",
          align: "center",
          label: "Actual Hours",
          field: "actualHours",
          sortable: true,
        },
        {
          name: "percentUsed",
          align: "center",
          label: "Percent Used",
          field: "percentUsed",
          sortable: true,
        },
        {
          name: "estToComplHours",
          align: "center",
          label: "Est. to Complete",
          field: "estToComplHours",
          sortable: true,
        },
        {
          name: "totalForecastHours",
          align: "center",
          label: "Forecast Hours",
          field: "totalForecastHours",
          sortable: true,
        },
      ],
      tasksForTable: [],
      taskToBeUpdated: null,
      toast: useToast(),
    };
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
    saveTaskWithUpdatedValues(task) {
      Http.post("Task/UpdateTask", [task])
        .then(() => {
          this.toast.success("Task updated successfully");
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
          totalForecastHours:
            parseFloat(task.actualHours) + parseFloat(estimateToCompleteHours),
        };
      });
    },
  },
};
</script>

<style scoped></style>
