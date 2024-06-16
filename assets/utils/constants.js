var Constants = {
  get_api_base_url: function () {
    if (location.hostname == "localhost") {
      return "http://localhost/real-estate-marketplace/backend/";
    } else {
      return "https://king-prawn-app-utq8k.ondigitalocean.app/backend/";
    }
  },
};
