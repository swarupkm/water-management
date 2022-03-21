import { BorewellWaterCostsCalculator, CorporationWaterCostsCalculator, TankerWaterCostsCalculator } from "./WaterCostsCalculators";

export default class {
  constructor({ apartmentDailyConsumption, numberOfDays }) {
    this.apartmentDailyConsumption = apartmentDailyConsumption;
    this.numberOfDays = numberOfDays;
  }
  cost() {
    const { borewellIntake, corporationIntake, tankerIntake } = this.apartmentDailyConsumption.getIntakeDetails();
    const borewellWaterCostsCalculator = new BorewellWaterCostsCalculator();
    const corporationWaterCostsCalculator = new CorporationWaterCostsCalculator();
    const tankerWaterCostsCalculator = new TankerWaterCostsCalculator();
    return (borewellWaterCostsCalculator.calculateFor(borewellIntake * this.numberOfDays) +
          corporationWaterCostsCalculator.calculateFor(corporationIntake * this.numberOfDays)+
          tankerWaterCostsCalculator.calculateFor(tankerIntake * this.numberOfDays )) ;
  }
}