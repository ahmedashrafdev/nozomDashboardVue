<template>
  <!-- begin::Page loader -->
  <div class="kt-page-loader kt-page-loader--logo">
    <img
      alt="Logo"
      src="http://halal.esolve-eg.com/images/splash-screen.png"
      style="width: 100px"
    />
    <div
      class="kt-spinner"
      v-bind:class="spinnerClass || 'kt-spinner--brand'"
    ></div>
  </div>
  <!-- end::Page Loader -->
</template>

<script>
export default {
  name: "Loader",
  props: {
    logo: String,
    spinnerClass: String,
  },
};
</script>
