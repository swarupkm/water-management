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
      
    return (borewellWaterCostsCalculator.calculateFor(borewellIntake) +
          corporationWaterCostsCalculator.calculateFor(corporationIntake) +
          tankerWaterCostsCalculator.calculateFor(tankerIntake)) * this.numberOfDays ;
  }
}