exports.seed = function (knex) {
  // Deletes ALL existing entries
  const foodTrucks = [
    {
      id: 1,
      truckName: "Milano's Pizza Truck",
      imgOfTruck: "https://www.phaidon.com/resource/pizzaleadtruck.jpg",
      customerRatings: 4.5,
      customerRatingAvg: 4.5,
      currentLocation: "2807 Normandy Blvd Denver, CO 98725",
      departTime: "02/29/2020 10:30 PM",
      operator_id: 1,
    },
    {
      id: 2,
      truckName: "Sergio's Sno-Cone Truck",
      imgOfTruck:
        "https://roaminghunger.com/img/trucks/original/19517/5ad53e46-b108-46c3-94de-4fa446204482.jpg",
      customerRatings: 4,
      customerRatingAvg: 4.5,
      currentLocation: "2525 SouthBridge Ave Denver, CO 98645",
      departTime: "02/29/2020 10:00 PM",
      operator_id: 2,
    },
    {
      id: 3,
      truckName: "Bonnie's SweetBuns Truck",
      imgOfTruck:
        "https://nmgprod.s3.amazonaws.com/media/editorial/2019/11/16/scarlet_picture_456931.jpg",
      customerRatings: 5,
      customerRatingAvg: 5,
      currentLocation: "784 Overton Block Denver, CO 45879",
      departTime: "02/30/2020 6:30 PM",
      operator_id: 2,
    },
  ];
  return knex("foodTrucks")
    .insert(foodTrucks)
    .then(() => console.log("\n== Seed data for foodTrucks table added ==\n"));
};
