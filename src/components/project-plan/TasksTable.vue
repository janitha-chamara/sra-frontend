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
              class="w-1/5 p-4"
              square
              color="primary"
              text-color="white"
              icon="event"
              >Job No: {{ job.job_no }}</q-chip
            >
            <q-chip
              class="w-1/5 p-4"
              square
              color="primary"
              text-color="white"
              icon="event"
              >Job Name:{{ job.business_unit }}</q-chip
            >
            <q-chip
              class="w-1/5 p-4"
              square
              color="primary"
              text-color="white"
              icon="event"
              >Client: {{ job.job_no }}</q-chip
            >
            <q-chip
              class="w-1/5 p-4"
              square
              color="primary"
              text-color="white"
              icon="event"
              >Business Unit: {{ job.job_no }}</q-chip
            >
          </div>
          <div class="flex w-full">
            <q-chip
              class="w-1/5 p-4"
              square
              color="primary"
              text-color="white"
              icon="event"
              >Status: {{ job.job_no }}</q-chip
            >
            <q-chip
              class="w-1/5 p-4"
              square
              color="primary"
              text-color="white"
              icon="event"
              >Project Duration: {{ job.job_no }}</q-chip
            >
            <q-chip
              class="w-1/5 p-4"
              square
              color="primary"
              text-color="white"
              icon="event"
              >Project Manager: {{ job.job_no }}</q-chip
            >
            <q-chip
              class="w-1/5 p-4"
              square
              color="primary"
              text-color="white"
              icon="event"
              >Service Delivery Manager: {{ job.job_no }}</q-chip
            >
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-table
          class="my-sticky-header-table w-full"
          :rows="tasks"
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
          <template v-slot:body-cell-estimate_to_complete_hours>
            <q-td align="center">
              <q-input outlined dense label="Enter est. to complete" />
            </q-td>
          </template>
          <template v-slot:bottom-row>
            <q-tr :props="props">
              <q-td align="center" class="bg-grey-5 text-bold"> Total </q-td>
              <q-td align="center" class="bg-grey-5">
                {{ job.quoted_hours }}
              </q-td>
              <q-td align="center" class="bg-grey-5">
                {{ job.actual_hours }}
              </q-td>
              <q-td align="center" class="bg-grey-5">
                {{ job.percent_used }}
              </q-td>
              <q-td align="center" class="bg-grey-5">
                {{ job.estimate_to_complete_hours }}
              </q-td>
              <q-td align="center" class="bg-grey-5">
                {{ job.percent_complete }}
              </q-td>
              <q-td align="center" class="bg-grey-5">
                {{ job.difference_percent }}
              </q-td>
              <q-td align="center" class="bg-grey-5">
                {{ job.forecast_hours }}
              </q-td>
              <q-td align="center" class="bg-grey-5">
                {{ job.variance_percent }}
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
          name: "task_name",
          align: "center",
          label: "Task",
          field: "task_name",
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
          name: "estimate_to_complete_hours",
          align: "center",
          label: "Est. to Complete",
          field: "estimate_to_complete_hours",
          sortable: true,
        },
        {
          name: "percent_complete",
          align: "center",
          label: "Percent Complete",
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
          name: "variance_percent",
          align: "center",
          label: "Variance Percent",
          field: "variance_percent",
          sortable: true,
        },
      ],
    };
  },
};
</script>

<style scoped></style>
