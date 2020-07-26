exports.seed = function (knex) {
  // Deletes ALL existing entries
  const exampleFoodtruck = [
    {
      id: 1,
      imgOfTruck:
        "https://azbigmedia.com/wp-content/uploads/2019/02/food-trucks-Scookie-bar.jpg",
      cuisineType: "Pasta",
      cstmrRatingAvg: 4,
      menu: "property under construction, will work soon",
      currentLocation: "199 West Hilltop St. Miami, FL 33125",
    },
    {
      id: 2,
      imgOfTruck:
        "https://cdn.vox-cdn.com/thumbor/quN_vZUwDPocvn37Wmp4fN-5QYI=/0x74:2039x1603/1200x800/filters:focal(0x74:2039x1603)/cdn.vox-cdn.com/uploads/chorus_image/image/34385803/8896812208_6b2e99f4aa_o.0.jpg",
      cuisineType: "Tex-Mex",
      cstmrRatingAvg: 5,
      menu: "property under construction, will work soon",
      currentLocation: "199 West Hilltop St. Miami, FL 33125",
    },
  ];
  return knex("exampleFoodTruck").insert(exampleFoodtruck);
};
