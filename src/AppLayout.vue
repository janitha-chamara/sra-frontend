<template>
  <q-layout view="hHh lpR fFf" style="color: #002048">
    <q-header elevated class="flex bg-white text-black">
      <q-toolbar class="h-[100px] pt-1 text-inter-base">
        <q-toolbar-title style="color: #002048">
          Internal Status Report
        </q-toolbar-title>
        <q-img
          src="@/assets/sra_logo.png"
          ratio="16/9"
          spinner-color="white"
          style="height: 90px; max-width: 350px"
        />
      </q-toolbar>
      <div class="flex justify-end text-black w-full">
        <!--        <q-tabs align="left" indicator-color="primary">-->
        <!--          <q-route-tab to="/project-plan" label="Project Plan" />-->
        <!--          &lt;!&ndash;          <q-route-tab to="/report" label="Report" />&ndash;&gt;-->
        <!--        </q-tabs>-->
        <div class="flex items-center px-3 text-xs text-bold text-[#002048]">
          Last updated: {{ wmfLastUpdateDate }}
        </div>
      </div>
    </q-header>

    <q-page-container>
      <router-view @fetch-jobs="handleFetchJobs" />
    </q-page-container>
  </q-layout>
</template>

<script>
import moment from "moment";
import { useRouter } from "vue-router/dist/vue-router";

export default {
  name: "AppLayout",

  data() {
    return {
      wmfLastUpdateDate: "",
      router: useRouter(),
    };
  },

  methods: {
    handleFetchJobs(wmfLastUpdateDate) {
      this.wmfLastUpdateDate = moment(wmfLastUpdateDate).format(
        "DD-MMM-YY  |  hh:mma"
      );
    },
  },

  created() {
    this.router.push("/project-plan");
  },
};
</script>

<style scoped></style>
