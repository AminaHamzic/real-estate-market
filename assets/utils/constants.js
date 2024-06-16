var Constants = {
  get_api_base_url: function () {
    if (location.hostname == "localhost") {
      return "http://localhost/real-estate-marketplace/backend/";
    } else {
      return "https://urchin-app-sr3f6.ondigitalocean.app/live-backend/";
    }
  },
};
