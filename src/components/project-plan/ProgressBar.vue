<template>
  <div class="w-[200px] mt-3">
    <div class="relative top-0 left-0 h-[30px] border border-black rounded-md">
      <div
        v-for="(progress, key) in progresses"
        :key="key"
        :style="`width: ${getCalculatedPercentUsedProgress(
          progress.progress
        )}%; background-color: ${progress.color}`"
        :class="{
          'border-r-2 border-black': progress.name === 'percentComplete',
        }"
        class="absolute h-[28px] rounded-l-md"
      >
        <div
          v-if="
            progress.name === 'percentComplete' && progress.progress !== null
          "
          class="absolute -right-4 -top-5"
        >
          <div>{{ progress.progress }}%</div>
        </div>
        <div
          v-if="
            progress.name === 'percentComplete' && progress.progress === null
          "
          class="absolute left-[80px]"
        >
          <q-icon name="warning" color="warning" size="1.5rem" />
        </div>
        <div
          v-if="progress.name === 'percentUsed'"
          class="absolute left-[80px] top-1 text-gray-300"
        >
          <q-badge :style="`background-color: ${progress.color}`">
            {{ getOverDueUsedPercentLabel(progress.progress) }}
          </q-badge>
        </div>
      </div>
    </div>
    <div>{{ label }}</div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",

  props: {
    progresses: {
      type: Array,
    },
    label: {
      type: String,
    },
    width: {
      type: Number,
      default: () => 200,
    },
  },

  methods: {
    getCalculatedPercentUsedProgress(actualProgress) {
      if (actualProgress <= 100) {
        return actualProgress;
      }

      return 100;
    },

    getOverDueUsedPercentLabel(actualProgress) {
      return actualProgress + "%";
      // if (actualProgress <= 100) {
      //   return actualProgress + "%";
      // }
      //
      // return "";
    },
  },

  // computed: {
  //   calculatedProgresses() {
  //     const maxPercentage = maxBy(this.progresses, "progress");
  //
  //     return this.progresses.map((progress) => {
  //       return {
  //         percentage: ,
  //       };
  //     });
  //   },
  // },
};
</script>

<style scoped></style>
