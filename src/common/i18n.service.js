const i18nService = {
  defaultLanguage: "en",

  languages: [
    {
      lang: "en",
      name: "English",
      flag: process.env.BASE_URL + "assets/media/flags/226-united-states.svg"
    },
    {
      lang: "ar",
      name: "Arabic",
      flag: process.env.BASE_URL + "assets/media/flags/195-france.svg"
    }
  ],

  /**
   * Keep the active language in the localStorage
   * @param lang
   */
  setActiveLanguage(lang) {
    localStorage.setItem("language", lang);
  },

  /**
   * Get the current active language
   * @returns {string | string}
   */
  getActiveLanguage() {
    return localStorage.getItem("language") || this.defaultLanguage;
  }
};

export default i18nService;