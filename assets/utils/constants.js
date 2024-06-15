var Constants = {
  get_api_base_url: function () {
    if (location.hostname == "localhost") {
      return "http://localhost/WEB-PROJEKAT/";
    } else {
      return "https://urchin-app-sr3f6.ondigitalocean.app/live-backend/";
    }
  },
};
