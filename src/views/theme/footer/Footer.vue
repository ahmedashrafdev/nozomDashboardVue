<template>
  <!-- begin:: Footer -->
  <div
    class="kt-footer kt-grid__item kt-grid kt-grid--desktop kt-grid--ver-desktop"
    id="kt_footer"
  >
    <div
      class="kt-container"
      v-bind:class="{ 'kt-container--fluid': isFluid() }"
    >
      <div class="kt-footer__copyright">
        2021 &nbsp;&copy;&nbsp;
        <a href="http://www.elnozom.com/" target="_blank" class="kt-link ml-1">
         {{$t('copyrights')}}
        </a>
      </div>
      <div class="kt-footer__menu">
        <a
          href="http://www.elnozom.com/?page_id=39"
          target="_blank"
          class="kt-footer__menu-link kt-link"
          >{{$t('about')}}</a
        >
        <a
          href="http://www.elnozom.com/?page_id=42"
          target="_blank"
          class="kt-footer__menu-link kt-link"
          >{{$t('contact')}}</a
        >
      </div>
    </div>
  </div>
  <!-- end:: Footer -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "KTFooter",
  methods: {
    /**
     * Check if footer container is fluid
     * @returns {boolean}
     */
    isFluid() {
      return this.layoutConfig("footer.self.width") === "fluid";
    },
  },
  computed: {
    ...mapGetters(["layoutConfig"]),
  },
};
</script>
