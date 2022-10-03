<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="flex bg-primary text-white">
      <q-toolbar class="h-[100px]">
        <q-toolbar-title> SRA Internal Status Report </q-toolbar-title>
      </q-toolbar>

      <div class="flex justify-between text-black w-full bg-white">
        <q-tabs align="left" indicator-color="primary">
          <q-route-tab to="/project-plan" label="Project Plan" />
          <!--          <q-route-tab to="/report" label="Report" />-->
        </q-tabs>
        <div class="flex items-center px-3 text-xs text-red-600">
          System last updated
        </div>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "AppLayout",
};
</script>

<style scoped></style>
