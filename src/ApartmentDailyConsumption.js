export default class {
  constructor({ apartment, waterAllotmentRatio, dailyConsumptionPerPerson }) {
    validateAllotmentRatio(waterAllotmentRatio);
    validateDailyConsumption(dailyConsumptionPerPerson);
    this.apartment = apartment;
    this.waterAllotmentRatio = waterAllotmentRatio;
    this.dailyConsumptionPerPerson = dailyConsumptionPerPerson;
  }
  getIntakeDetails() {
    const membersIntakeCapacity = this.apartment.membersCount() * this.dailyConsumptionPerPerson;
    const guestsIntakeCapacity = this.apartment.guestsCount() * this.dailyConsumptionPerPerson;
    const borewellIntakeFraction = (this.waterAllotmentRatio.borewellPart / (this.waterAllotmentRatio.borewellPart + this.waterAllotmentRatio.corporationPart)) * membersIntakeCapacity;
    const corporationIntakeFraction = (this.waterAllotmentRatio.corporationPart / (this.waterAllotmentRatio.borewellPart + this.waterAllotmentRatio.corporationPart)) * membersIntakeCapacity;
    return {
      borewellIntake: borewellIntakeFraction,
      corporationIntake: corporationIntakeFraction,
      tankerIntake: guestsIntakeCapacity
    }
  }
  getTotalIntakeCapacity() {
    return (this.apartment.membersCount() + this.apartment.guestsCount()) * this.dailyConsumptionPerPerson;
  }
}

function validateAllotmentRatio(waterAllotmentRatio) {
  if (!(waterAllotmentRatio.borewellPart > 0)) {
    throw new Error('waterAllotmentRatio.borewellPart must be a positive number');
  }
  if (!(waterAllotmentRatio.corporationPart > 0)) {
    throw new Error('waterAllotmentRatio.corporationPart must be a positive number');
  }
}

function validateDailyConsumption(dailyConsumptionPerPerson) {
  if (!(dailyConsumptionPerPerson > 0)) {
    throw new Error('dailyConsumptionPerPerson must be a positive number');
  }
}