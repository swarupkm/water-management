jest.mock('../src/WaterCostsCalculators');
import WaterBillCalculator from "../src/WaterBillCalculator";
import { BorewellWaterCostsCalculator, CorporationWaterCostsCalculator, TankerWaterCostsCalculator } from "../src/WaterCostsCalculators";

const borewellWaterCostsCalculatorCalculateForMock = jest
  .spyOn(BorewellWaterCostsCalculator.prototype, 'calculateFor')
  .mockImplementation(() => (10));

const corporationWaterCostsCalculatorCalculateForMock = jest
  .spyOn(CorporationWaterCostsCalculator.prototype, 'calculateFor')
  .mockImplementation(() => (20));

const tankerWaterCostsCalculatorCalculateForMock = jest
  .spyOn(TankerWaterCostsCalculator.prototype, 'calculateFor')
  .mockImplementation(() => (30));

describe('Water Bill Calculator', () => {
  describe('cost', () => {
    const NUMBER_OF_DAYS = 30;
    const apartmentDailyConsumption = { getIntakeDetails: () => ({ borewellIntake: 4, corporationIntake: 5, tankerIntake: 10 }) };
    const waterBillCaclulator = new WaterBillCalculator({ apartmentDailyConsumption, numberOfDays: NUMBER_OF_DAYS });
    const cost = waterBillCaclulator.cost();
    

    it('should consider BorewellWaterCostsCalculator as part of the caluclation', () => {
      expect(borewellWaterCostsCalculatorCalculateForMock).toHaveBeenCalledWith(4 * NUMBER_OF_DAYS);
    });

    it('should consider CorporationWaterCostsCalculator as part of the caluclation', () => {
      expect(corporationWaterCostsCalculatorCalculateForMock).toHaveBeenCalledWith(5 * NUMBER_OF_DAYS);
    });

    it('should consider TankerWaterCostsCalculator as part of the caluclation', () => {
      expect(tankerWaterCostsCalculatorCalculateForMock).toHaveBeenCalledWith(10 * NUMBER_OF_DAYS);
    });

    it('should calculate the total cost for given number of days', () => {
      expect(cost).toEqual((10 + 20 + 30));
    });

  });
});