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
          v-if="progress.name === 'percentComplete'"
          class="absolute -right-4 -top-5"
        >
          <div v-if="!progress">
            <q-icon name="warning" color="warning" size="4rem" />
          </div>
          <div v-else>{{ progress.progress }}%</div>
        </div>
        <div
          v-if="progress.name === 'percentUsed'"
          class="absolute right-1/2 top-1 text-white"
        >
          {{ getOverDueUsedPercentLabel(progress.progress) }}
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
      if (actualProgress <= 100) {
        return actualProgress + "%";
      }

      return "";
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
