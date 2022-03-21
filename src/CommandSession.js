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

  handle(command) {
    return {
      ['ALLOT_WATER']: (bedroomSize, allotmentRatio) => {
        if (this.waterAlloted) { throw new Error('Already Alloted water ratio to apartment'); };
        this.apartment = new Apartment({ bedroomSize });
        const parsedRatio = allotmentRatio.split(':').map(x => parseInt(x));
        this.allotmentRatio = { corporationPart: parsedRatio[0], borewellPart: parsedRatio[1] };
        this.waterAlloted = true;
      },
      ['ADD_GUESTS']: (numberOfGuests) => { 
        if (!this.waterAlloted) { throw new Error('Invalid Guest addition Request')}
        this.apartment.addGuests(numberOfGuests);
      },
      ['BILL']: () => {
        if (!this.waterAlloted || this.billRequested) { throw new Error('Invalid Bill Request'); };
        const NUMBER_OF_DAYS = 30;
        const apartmentDailyConsumption = new ApartmentDailyConsumption({
          apartment: this.apartment,
          waterAllotmentRatio: this.allotmentRatio,
          dailyConsumptionPerPerson: 10
        });
        const monthlyConsumption = apartmentDailyConsumption.getTotalIntakeCapacity() * NUMBER_OF_DAYS;
        const monthlyBill = new WaterBillCalculator({
          apartmentDailyConsumption: apartmentDailyConsumption,
          numberOfDays: NUMBER_OF_DAYS
        }).cost();
        console.log(`${monthlyConsumption} ${Math.round(monthlyBill)}`);
        this.billRequested = true;
      }
    }[command];
  }
}