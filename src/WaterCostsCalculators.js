export class WaterCostsCalculator {
  calculatorFor(waterInLiters) {
    throw new Error('Method not implemented');
  }
}

const validateWaterUnits = (waterInLiters) => {
  if (!Number.isInteger(waterInLiters)) {
    throw new Error('Water is not integer');
  }
}

export class CorporationWaterCalculator extends WaterCostsCalculator {
  calculatorFor(waterInLiters) {
    validateWaterUnits(waterInLiters)
    const cost = 1;
    return cost * waterInLiters;
  }
}

export class BorewellWaterCalculator extends WaterCostsCalculator {
  calculatorFor(waterInLiters) {
    validateWaterUnits(waterInLiters)
    const cost = 1.5;
    return cost * waterInLiters;

  }
}

export class TankerWaterCalculator extends WaterCostsCalculator {
  SLABS = [
    { minLiters: 1, maxLiters: 500, cost: 2 },
    { minLiters: 501, maxLiters: 1500, cost: 3 },
    { minLiters: 1501, maxLiters: 3000, cost: 5 },
    { minLiters: 3001, maxLiters: null, cost: 8},
  ]
  calculatorFor(waterInLiters) {
    validateWaterUnits(waterInLiters)
    let cost = 0;
    for (let slab of this.SLABS) {
      if (waterInLiters < slab.minLiters) {
        continue;
      }
      if (!slab.maxLiters) {
        cost += slab.cost * (waterInLiters - slab.minLiters + 1);
        continue;
      }
      if (waterInLiters > slab.maxLiters) {
        cost += slab.cost * (slab.maxLiters - slab.minLiters + 1);
        continue;
      }
      if (waterInLiters >= slab.minLiters && waterInLiters <= slab.maxLiters) {
        cost += slab.cost * (Math.min(waterInLiters, slab.maxLiters) - slab.minLiters + 1);
        continue;
      }
    }
    return cost;
  }
}