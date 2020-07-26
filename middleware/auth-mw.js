module.exports = {
  isValid,
  truckReq,
  menuReq,
};

function isValid(user) {
  return Boolean(
    user.username && user.password && typeof user.password === "string"
  );
}

function truckReq(updates) {
  return Boolean(
    updates.truckName &&
      updates.customerRatingAvg &&
      updates.currentLocation &&
      updates.departTime
  );
}

function menuReq(requirements) {
  return Boolean(
    requirements.menuName &&
      requirements.menuPrice &&
      requirements.customerRatingAvg
  );
}
