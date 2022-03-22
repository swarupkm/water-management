import Apartment from "./Apartment";
import ApartmentDailyConsumption from "./ApartmentDailyConsumption";
import WaterBillCalculator from './WaterBillCalculator';

export default class {
  constructor() {
    this.waterAlloted = false;
    this.billRequested = false;
    this.apartment = null;
    this.allotmentRatio = null;
  }

  allotWater (bedroomSize, allotmentRatio) {
    if (this.waterAlloted) { throw new Error('Already Alloted water ratio to apartment'); };
    this.apartment = new Apartment({ bedroomSize: parseInt(bedroomSize) });
    const parsedRatio = allotmentRatio.split(':').map(x => parseInt(x));
    this.allotmentRatio = { corporationPart: parsedRatio[0], borewellPart: parsedRatio[1] };
    this.waterAlloted = true;
  }

  addGuests(numberOfGuests){
    if (!this.waterAlloted) { throw new Error('Invalid Guest addition Request'); }
    this.apartment.addGuests(parseInt(numberOfGuests));
  }

  generateBill() {
    if (!this.waterAlloted || this.billRequested) { throw new Error('Invalid Bill Request'); };
    const NUMBER_OF_DAYS = 30;
    const apartmentDailyConsumption = new ApartmentDailyConsumption({ apartment: this.apartment, waterAllotmentRatio: this.allotmentRatio, dailyConsumptionPerPerson: 10 });
    const monthlyConsumption = apartmentDailyConsumption.getTotalIntakeCapacity() * NUMBER_OF_DAYS;
    const monthlyBill = new WaterBillCalculator({ apartmentDailyConsumption: apartmentDailyConsumption, numberOfDays: NUMBER_OF_DAYS }).cost();
    console.log(`${monthlyConsumption} ${Math.ceil(monthlyBill)}`);
    this.billRequested = true;
}

  handle(command, args) {
    if (command == 'ALLOT_WATER') this.allotWater(...args);
    if (command == 'ADD_GUESTS') this.addGuests(...args);
    if (command == 'BILL') this.generateBill(...args);
  }
}