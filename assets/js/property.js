const PropertyService = {
  getProperty: function (propertyId) {
    $.ajax({
      url: Constants.get_api_base_url() + "properties/" + propertyId,
      type: "GET",
      dataType: "json",
      success: function (data) {
        console.log(data);
        var price = "  " + data.Price + "$";
        // Set basic property details
        $("#property-name").html(data.Name);
        $("#property-location").html(data.Location);
        $("#property-breadcrumb").html("Property ID: " + propertyId);
        $(".bi-cash").html(price);

        // Set property summary details
        $(".summary-list .list").html(`
          <li class="d-flex justify-content-between">
            <strong>Property ID:</strong>
            <span>${propertyId}</span>
          </li>
          <li class="d-flex justify-content-between">
            <strong>Location:</strong>
            <span>${data.Location}</span>
          </li>
          <li class="d-flex justify-content-between">
            <strong>Property Type:</strong>
            <span>${data.Type}</span>
          </li>
          <li class="d-flex justify-content-between">
            <strong>Status:</strong>
            <span>${data.Status}</span>
          </li>
          <li class="d-flex justify-content-between">
            <strong>Area:</strong>
            <span>${data.Area}</span>
          </li>
          <li class="d-flex justify-content-between">
            <strong>Beds:</strong>
            <span>${data.Beds}</span>
          </li>
          <li class="d-flex justify-content-between">
            <strong>Baths:</strong>
            <span>${data.Baths}</span>
          </li>
          <li class="d-flex justify-content-between">
            <strong>Garage:</strong>
            <span>${data.Garage}</span>
          </li>
        `);

        // Set property description
        $(".property-description .description").html(data.Description);

        // Set amenities
        const amenities = [];
        if (data.Balcony) amenities.push("Balcony");
        if (data.OutdoorKitchen) amenities.push("Outdoor Kitchen");
        if (data.CableTv) amenities.push("Cable Tv");
        if (data.Deck) amenities.push("Deck");
        if (data.TennisCourts) amenities.push("Tennis Courts");
        if (data.Internet) amenities.push("Internet");
        if (data.Parking) amenities.push("Parking");
        if (data.SunRoom) amenities.push("Sun Room");
        if (data.ConcreteFlooring) amenities.push("Concrete Flooring");

        $(".amenities-list .list-a").html(
          amenities.map((amenity) => `<li>${amenity}</li>`).join("")
        );

        // Set property images in carousel
        $("#property-single-carousel .swiper-wrapper").html(`
          <div class="carousel-item-b swiper-slide">
            <img src="${
              data.Image
                ? "data:image/jpeg;base64," + data.Image
                : "assets/img/property-1.jpg"
            }" alt="${data.Name}" />
          </div>
        `);

        $.ajax({
          url: Constants.get_api_base_url() +"image/" + propertyId,
          type: "GET",
          dataType: "json",
          success: function (data) {
            console.log(data);
            data.forEach((image) => {
              $("#property-single-carousel .swiper-wrapper").append(`
                <div class="carousel-item-b swiper-slide">
                  <img src="data:image/jpeg;base64,${image.Image}" alt="${data.Name}" />
                </div>
              `);
            });

            // Initialize Swiper carousel
            const propertyCarousel = new Swiper("#property-single-carousel", {
              loop: true,
              spaceBetween: 10,
              slidesPerView: 1,
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
            });
          },
          error: function (xhr, status, error) {
            console.error("Error fetching property data:", error);
          },
        });
      },
      error: function (xhr, status, error) {
        console.error("Error fetching property data:", error);
      },
    });
  },
};

$(document).ready(function () {
  const propertyId = "123"; // Replace with the actual property ID you want to fetch
  PropertyService.getProperty(propertyId);
});
