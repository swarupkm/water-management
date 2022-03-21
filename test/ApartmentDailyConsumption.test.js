import Apartment from "../src/Apartment";
import ApartmentDailyConsumption from "../src/ApartmentDailyConsumption";

describe('ApartmentDailyConsumption', () => {
  describe('constructor', () => {
    it('must validate allotment ratio, borewellPart', () => {
      const apartment = new Apartment({ bedroomSize: 2 });
      const dailyConsumptionPerPerson = 10;
      const waterAllotmentRatio = { borewellPart: 0, corporationPart: 0};
      expect(() => new ApartmentDailyConsumption({ apartment, waterAllotmentRatio, dailyConsumptionPerPerson })).toThrow();
    })
    it('must validate allotment ratio, corporationPart', () => {
      const apartment = new Apartment({ bedroomSize: 2 });
      const dailyConsumptionPerPerson = 10;
      const waterAllotmentRatio = { borewellPart: 1, corporationPart: 0 };
      expect(() => new ApartmentDailyConsumption({ apartment, waterAllotmentRatio, dailyConsumptionPerPerson })).toThrow();
    })

    it('must validate allotment ratio for positive parts', () => {
      const apartment = new Apartment({ bedroomSize: 2 });
      const dailyConsumptionPerPerson = 10;
      const waterAllotmentRatio = { borewellPart: 1, corporationPart: 1 };
      expect(() => new ApartmentDailyConsumption({ apartment, waterAllotmentRatio, dailyConsumptionPerPerson })).not.toThrow();
    })
    it('must validate dailyConsumptionPerPerson when not positive', () => {
      const apartment = new Apartment({ bedroomSize: 2 });
      const dailyConsumptionPerPerson = 0;
      const waterAllotmentRatio = { borewellPart: 1, corporationPart: 1 };
      expect(() => new ApartmentDailyConsumption({ apartment, waterAllotmentRatio, dailyConsumptionPerPerson })).toThrow();
    })
    it('must validate dailyConsumptionPerPerson when positve', () => {
      const apartment = new Apartment({ bedroomSize: 2 });
      const dailyConsumptionPerPerson = 10;
      const waterAllotmentRatio = { borewellPart: 1, corporationPart: 1 };
      expect(() => new ApartmentDailyConsumption({ apartment, waterAllotmentRatio, dailyConsumptionPerPerson })).not.toThrow();
    })
  })
  describe('getTotalIntakeCapacity', () => {
    
    it('should calculate the total intake per day', () => {
      const apartment = { membersCount: () => 1, guestsCount: () => 2};
      const dailyConsumptionPerPerson = 10;
      const waterAllotmentRatio = { borewellPart: 1, corporationPart: 1 };
      const consumption = new ApartmentDailyConsumption({ apartment, waterAllotmentRatio, dailyConsumptionPerPerson });
      expect(consumption.getTotalIntakeCapacity()).toEqual(30);
    });
  })

  describe('getIntakeDetails', () => {

    it('should build allotment details', () => {
      const apartment = { membersCount: () => 1, guestsCount: () => 2 };
      const dailyConsumptionPerPerson = 10;
      const waterAllotmentRatio = { borewellPart: 1, corporationPart: 3 };
      const consumption = new ApartmentDailyConsumption({ apartment, waterAllotmentRatio, dailyConsumptionPerPerson });
      expect(consumption.getIntakeDetails()).toEqual({ borewellIntake: 2.5, corporationIntake: 7.5, tankerIntake: 20 });
    });
  })
})