<template>
  <div>
    <div class="row">
      <div class="col-lg-12 col-xl-12 order-lg-1 order-xl-1">
        <!--begin:: Widgets/Inbound Bandwidth-->
        <KTPortlet
          v-bind="{
            title: 'monthly sales',
            class:
              'kt-portlet--fit kt-portlet--head-noborder t-portlet--height-fluid',
            headClass: 'kt-portlet__space-x',
            fluidHalfHeight: true,
            headNoBorder: true,
            bodyFluid: true,
          }"
        >
          <template v-slot:body>
            <Widget20_1></Widget20_1>
          </template>
        </KTPortlet>
        <!--end:: Widgets/Inbound Bandwidth-->
      </div>
    </div>

    <div class="row">
      <div class="col-xl-4 col-lg-4 order-lg-2 order-xl-1">
        <KTPortlet
          v-bind:class="'kt-portlet--height-fluid'"
          v-bind="{ bodyFit: true }"
        >
          <template v-slot:body>
            <Widget14_1></Widget14_1>
          </template>
        </KTPortlet>
      </div>

      <div class="col-xl-4 col-lg-4 order-lg-2 order-xl-1">
        <KTPortlet
          v-bind:class="'kt-portlet--height-fluid'"
          v-bind="{ bodyFit: true }"
        >
          <template v-slot:body>
            <Widget14_2></Widget14_2>
          </template>
        </KTPortlet>
      </div>

      <div class="col-xl-4 col-lg-4 order-lg-2 order-xl-1">
        <KTPortlet
          v-bind:class="'kt-portlet--height-fluid'"
          v-bind="{ bodyFit: true }"
        >
          <template v-slot:body>
            <Widget14_3></Widget14_3>
          </template>
        </KTPortlet>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/store/breadcrumbs.module";
import KTPortlet from "@/views/partials/content/Portlet.vue";
import Widget14_1 from "@/views/partials/widgets/Widget14_MiniDailySales.vue";
import Widget14_2 from "@/views/partials/widgets/Widget14_MiniProfitShare.vue";
import Widget14_3 from "@/views/partials/widgets/Widget14_MiniRevenueChange.vue";
import Widget20_1 from "@/views/partials/widgets/Widget20_Inbound.vue";

/**
 * Sample widgets data source
 */
import timelines from "@/common/mock/widget-timeline.json";

export default {
  name: "dashboard",
  components: {
    KTPortlet,
    Widget14_1,
    Widget14_2,
    Widget14_3,
    Widget20_1,
  },
  data() {
    return {
      timelines: timelines,
      tabIndex: 0,
      tabIndex2: 0,
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Dashboard" }]);
  },
  methods: {
    setActiveTab1(event) {
      this.tabIndex = this.setActiveTab(event);
    },
    setActiveTab2(event) {
      this.tabIndex2 = this.setActiveTab(event);
    },
    /**
     * Set current active on click
     * @param event
     */
    setActiveTab(event) {
      // get all tab links
      const tab = event.target.closest('[role="tablist"]');
      const links = tab.querySelectorAll(".nav-link");
      // remove active tab links
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
      }

      // set current active tab
      event.target.classList.add("active");

      // set clicked tab index to bootstrap tab
      return parseInt(event.target.getAttribute("data-tab"));
    },
  },
};
</script>
