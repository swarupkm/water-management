const DEFAULT_MEMBERS = {
  2: 3,
  3: 5
}
export default class {
  constructor({ bedroomSize }) {
    validateBedroomSize(bedroomSize);
    this.members = DEFAULT_MEMBERS[bedroomSize];
    this.guests = 0;
  }
  membersCount() {
    return this.members
  }
  guestsCount() {
    return this.guests;
  }
  addGuests(guests) {
    this.guests += guests;
  }
}

const validateBedroomSize = (bedroomSize) => {
  const allowedBedroomSizes = [2, 3];
  if (!allowedBedroomSizes.includes(bedroomSize)) {
    throw new Error(`Accepted Bedroom Sizes are [${allowedBedroomSizes}]`)
  }
};