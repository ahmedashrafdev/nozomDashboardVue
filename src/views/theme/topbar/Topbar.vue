<template>
  <!-- begin:: Header Topbar -->
  <div class="kt-header__topbar">
    <!--begin: Language bar -->
    <div class="kt-header__topbar-item kt-header__topbar-item--langs">
      <div
        class="kt-header__topbar-wrapper"
        id="kt_language_toggle"
        data-toggle="dropdown"
      >
        <span class="kt-header__topbar-icon">
          <img :src="languageFlag || getLanguageFlag" alt="" />
        </span>
      </div>
      <div
        class="dropdown-menu dropdown-menu-fit dropdown-menu-right"
        v-on:click.stop
      >
        <KTDropdownLanguage
          v-on:language-changed="onLanguageChanged"
        ></KTDropdownLanguage>
      </div>
    </div>
    <!--end: Language bar -->

    <!--begin: User Bar -->
    <div
      class="kt-header__topbar-item items-center kt-header__topbar-item--user"
    >
      <a
        href="#"
        @click.prevent="onLogout"
        class="btn btn-label btn-label-brand btn-sm btn-bold h-50"
        >Sign Out</a
      >
    </div>
    <!--end: User Bar -->
  </div>
  <!-- end:: Header Topbar -->
</template>

<script>
import KTDropdownLanguage from "@/views/theme/topbar/DropdownLanguage.vue";
import i18nService from "@/common/i18n.service.js";
import { LOGOUT } from "@/store/auth.module";

export default {
  name: "KTTopbar",
  data() {
    return {
      languageFlag: "",
      languages: i18nService.languages,
    };
  },
  components: {
    KTDropdownLanguage,
  },
  methods: {
    onLanguageChanged() {
      this.languageFlag = this.languages.find((val) => {
        return val.lang === i18nService.getActiveLanguage();
      }).flag;
    },
    onLogout() {
      this.$store
        .dispatch(LOGOUT)
        .then(() => this.$router.push({ name: "login" }));
    },
  },
  computed: {
    getLanguageFlag() {
      return this.onLanguageChanged();
    },
  },
};
</script>
