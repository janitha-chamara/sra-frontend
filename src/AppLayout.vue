<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="flex bg-white text-black">
      <q-toolbar class="h-[100px]">
        <q-img
          src="@/assets/sra_logo.png"
          ratio="16/9"
          spinner-color="white"
          style="height: 90px; max-width: 350px"
        />
        <q-toolbar-title> SRA Internal Status Report </q-toolbar-title>
      </q-toolbar>
      <div class="flex justify-between text-black w-full bg-blue-3">
        <q-tabs align="left" indicator-color="primary">
          <q-route-tab to="/project-plan" label="Project Plan" />
          <!--          <q-route-tab to="/report" label="Report" />-->
        </q-tabs>
        <div class="flex items-center px-3 text-xs text-red-600 text-bold">
          System last updated: {{ wmfLastUpdateDate }}
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
      this.wmfLastUpdateDate =
        moment(wmfLastUpdateDate).format("D-MM-YYYY / hh:mm");
    },
  },

  created() {
    this.router.push("/project-plan");
  },
};
</script>

<style scoped></style>
