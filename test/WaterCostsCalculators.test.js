const { WaterCostsCalculator, CorporationWaterCalculator, BorewellWaterCalculator, TankerWaterCalculator } = require("../src/WaterCostsCalculators");

describe('Water Costs Calculator', () => {
  describe('interfaces', () => {
    it('should throw error if calculaterFor implemented', () => {
      class SomeCalculator extends WaterCostsCalculator { }
      expect(new SomeCalculator().calculatorFor).toThrow()
    })

    it('should not throw error if calculaterFor is not implemented', () => {
      class SomeCalculator extends WaterCostsCalculator { 
        calculatorFor(){}
      }
      expect(new SomeCalculator().calculatorFor).not.toThrow()

    })
  })
});

describe('CorporationWaterCalculator', () => {
  describe('calculateFor', () => {
    it('should throw error if water is not integer', () => {
      expect(() => { new CorporationWaterCalculator().calculatorFor(10.5); }).toThrow();
    })
    it('should calculate for flat rate of 1', () => {
      expect(new CorporationWaterCalculator().calculatorFor(10)).toEqual(10);
    })
  })
});

describe('BorewellWaterCalculator', () => {
  describe('calculateFor', () => {
    it('should throw error if water is not integer', () => {
      expect(() => { new BorewellWaterCalculator().calculatorFor(10.5); }).toThrow();
    })
    it('should calculate for flat rate of 1.5', () => {
      expect(new BorewellWaterCalculator().calculatorFor(10)).toEqual(15);
    });
  })
});

describe('BorewellWaterCalculator', () => {
  describe('calculateFor', () => {
    it('should throw error if water is not integer', () => {
      expect(() => { new BorewellWaterCalculator().calculatorFor(10.5); }).toThrow();
    });
    it('should calculate for flat rate of 1.5', () => {
      expect(new BorewellWaterCalculator().calculatorFor(10)).toEqual(15);
    });
  });
});

describe('TankerWaterCalculator', () => {
  describe('calculateFor', () => {
    it('should throw error if water is not integer', () => {
      expect(() => { new TankerWaterCalculator().calculatorFor(10.5); }).toThrow();
    });
    describe('slabs', () => {
      it('for 0 liters, cost is 0 ', () => {
        expect(new TankerWaterCalculator().calculatorFor(0)).toEqual(0);
      })
      describe('rate for minLiters: 1, maxLiters: 500, cost: 2', () => {
        it('for 1 liter, cost is 2 ', () => {
          expect(new TankerWaterCalculator().calculatorFor(1)).toEqual(2);
        });
        it('for 100 liter, cost is 200 ', () => {
          expect(new TankerWaterCalculator().calculatorFor(100)).toEqual(200);
        });
        it('for 500 liter, cost is 1000 ', () => {
          expect(new TankerWaterCalculator().calculatorFor(500)).toEqual(1000);
        })
      })
      describe('rate for minLiters: 501, maxLiters: 1500, cost: 3', () => {
        it('for 501 liter, cost is 1003 ', () => {
          expect(new TankerWaterCalculator().calculatorFor(501)).toEqual(1003);
        });
        it('for 1000 liter, cost is 2500 ', () => {
          expect(new TankerWaterCalculator().calculatorFor(1000)).toEqual(2500);
        });
        it('for 1500 liter, cost is 4000 ', () => {
          expect(new TankerWaterCalculator().calculatorFor(1500)).toEqual(4000);
        })
      })
      describe('rate for minLiters: 1501, maxLiters: 3000, cost: 5', () => {
        it('for 1501 liter, cost is 4005 ', () => {
          expect(new TankerWaterCalculator().calculatorFor(1501)).toEqual(4005);
        });
        it('for 2000 liter, cost is 6500 ', () => {
          expect(new TankerWaterCalculator().calculatorFor(2000)).toEqual(6500);
        });
        it('for 3000 liter, cost is 11500 ', () => {
          expect(new TankerWaterCalculator().calculatorFor(3000)).toEqual(11500);
        })
      })
      describe('minLiters: 3001, maxLiters: null, cost: 8', () => {
        it('for 3001 liter, cost is 11508 ', () => {
          expect(new TankerWaterCalculator().calculatorFor(3001)).toEqual(11508);
        });
        it('for 4000 liter, cost is 19500 ', () => {
          expect(new TankerWaterCalculator().calculatorFor(4000)).toEqual(19500);
        })
      })
    })
  });
});