const PropertyService = {
  getAllProperties: function () {
    $.ajax({
      url: Constants.get_api_base_url() + "properties",
      type: "GET",
      dataType: "json",
      success: function (data) {
        console.log("Fetched data:", data); // Log fetched data for debugging
        const properties = data.data;
        const container = $("#property-container");
        var propertyCard = "";
        if (properties.length === 0) {
          container.html("<p>No properties found.</p>");
        } else {
          for (var i = 0; i < properties.length; i++) {
            var property = properties[i];
            propertyCard += `
                        <div class="col-md-4">
                            <div class="card-box-a card-shadow">
                                <div class="img-box-a">
                                    <img src="${
                                      property.Image
                                        ? "data:image/jpeg;base64," +
                                          property.Image
                                        : "assets/img/property-1.jpg"
                                    }" alt="${
              property.Name
            }" class="img-a img-fluid">
                                </div>
                                <div class="card-overlay">
                                    <div class="card-overlay-a-content">
                                        <div class="card-header-a">
                                            <h2 class="card-title-a">
                                                <a href="#single" onclick="PropertyService.getProperty(${
                                                  property.idproperties
                                                })">${property.Name}
                                                    <br /> ${property.Name}</a>
                                            </h2>
                                        </div>
                                        <div class="card-body-a">
                                            <div class="price-box d-flex">
                                                <span class="price-a">${
                                                  property.Price
                                                }$</span>
                                            </div>
                                            <a href="#single" onclick="PropertyService.getProperty(${
                                              property.idproperties
                                            })" class="link-a">Click here to view
                                                <span class="bi bi-chevron-right"></span>
                                            </a>
                                        </div>
                                        <div class="card-footer-a">
                                            <ul class="card-info d-flex justify-content-around">
                                                <li>
                                                    <h4 class="card-info-title">Area</h4>
                                                    <span>${property.Area}m
                                                        <sup>2</sup>
                                                    </span>
                                                </li>
                                                <li>
                                                    <h4 class="card-info-title">Beds</h4>
                                                    <span>${
                                                      property.Beds
                                                    }</span>
                                                </li>
                                                <li>
                                                    <h4 class="card-info-title">Baths</h4>
                                                    <span>${
                                                      property.Baths
                                                    }</span>
                                                </li>
                                                <li>
                                                    <h4 class="card-info-title">Garages</h4>
                                                    <span>${
                                                      property.Garage
                                                    }</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
          }

          container.html(propertyCard);

          $(".property-card").on("click", function () {
            const propertyId = $(this).data("id");
            window.location.hash = `single?id=${propertyId}`;
          });
        }
      },
      error: function (xhr, status, error) {
        console.error("Error fetching properties:", error);
        $("#property-container").html(
          "<p>Error fetching properties. Please try again later.</p>"
        );
      },
    });
  },

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

        if (Utils.get_from_localstorage("user")) {
          $(".SaveDugme").html(
            `<button class="styled-button" onclick="PropertyService.saveProperty(${propertyId})">Save Property</button>`
          );
        }

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
          url: Constants.get_api_base_url() + "image/" + propertyId,
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
  saveProperty: function (propertyId) {
    const user = Utils.get_from_localstorage("user").idUsers;
    if (user) {
      $.ajax({
        url: Constants.get_api_base_url() + "favourites/",
        type: "POST",
        dataType: "json",
        data: {
          user_id: user,
          propertyId: propertyId,
        },
        success: function (data) {
          console.log(data);
          alert("Property saved successfully!");
        },
        error: function (xhr, status, error) {
          console.error("Error saving property:", error);
        },
      });
    } else {
      alert("Please login to save properties.");
    }
  },

  getAllFavourites: function ($user_id) {
    $.ajax({
      url:
        Constants.get_api_base_url() +
        "properties/user/" +
        $user_id +
        "/favourites",
      type: "GET",
      dataType: "json",
      success: function (data) {
        console.log("Fetched data:", data); // Log fetched data for debugging
        var properties = data.data;
        const container = $("#property-container");
        if (properties.length === 0) {
          container.html("<p>No properties found.</p>");
        } else {
          properties.forEach((property) => {
            console.log("Processing property:", property); // Log each property being processed
            const propertyCard = `
                        <div class="col-md-4">
                            <div class="card-box-a card-shadow">
                                <div class="img-box-a">
                                    <img src="${
                                      property.Image
                                        ? "data:image/jpeg;base64," +
                                          property.Image
                                        : "assets/img/property-1.jpg"
                                    }" alt="${
              property.Name
            }" class="img-a img-fluid">
                                </div>
                                <div class="card-overlay">
                                    <div class="card-overlay-a-content">
                                        <div class="card-header-a">
                                            <h2 class="card-title-a">
                                                <a href="#single" onclick="PropertyService.getProperty(${
                                                  property.idproperties
                                                })">${property.Name}
                                                    <br /> ${property.Name}</a>
                                            </h2>
                                        </div>
                                        <div class="card-body-a">
                                            <div class="price-box d-flex">
                                                <span class="price-a">${
                                                  property.Price
                                                }$</span>
                                            </div>
                                            <a href="#single" onclick="PropertyService.getProperty(${
                                              property.idproperties
                                            })" class="link-a">Click here to view
                                                <span class="bi bi-chevron-right"></span>
                                            </a>
                                        </div>
                                        <div class="card-footer-a">
                                            <ul class="card-info d-flex justify-content-around">
                                                <li>
                                                    <h4 class="card-info-title">Area</h4>
                                                    <span>${property.Area}m
                                                        <sup>2</sup>
                                                    </span>
                                                </li>
                                                <li>
                                                    <h4 class="card-info-title">Beds</h4>
                                                    <span>${
                                                      property.Beds
                                                    }</span>
                                                </li>
                                                <li>
                                                    <h4 class="card-info-title">Baths</h4>
                                                    <span>${
                                                      property.Baths
                                                    }</span>
                                                </li>
                                                <li>
                                                    <h4 class="card-info-title">Garages</h4>
                                                    <span>${
                                                      property.Garage
                                                    }</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

            container.append(propertyCard);
          });

          $(".property-card").on("click", function () {
            const propertyId = $(this).data("id");
            window.location.hash = `single?id=${propertyId}`;
          });
        }
      },
      error: function (xhr, status, error) {
        console.error("Error fetching properties:", error);
        $("#property-container").html(
          "<p>Error fetching properties. Please try again later.</p>"
        );
      },
    });
  },
};
