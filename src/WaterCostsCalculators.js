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

class Slab {
  constructor({ minLiters, maxLiters, cost }) {
    this.minLiters = minLiters;
    this.maxLiters = maxLiters || Number.MAX_SAFE_INTEGER;
    this.slabCost = cost;
  }
  calculate(waterInLiters) {
    let cost = 0;
    if (waterInLiters < this.minLiters) {
      return cost;
    }
    if (waterInLiters >= this.minLiters && waterInLiters <= this.maxLiters) {
      cost += this.slabCost * (Math.min(waterInLiters, this.maxLiters) - this.minLiters + 1);
      return cost;
    }
    if (waterInLiters > this.maxLiters) {
      cost += this.slabCost * (this.maxLiters - this.minLiters + 1);
      return cost;
    }
  }
}

export class TankerWaterCalculator extends WaterCostsCalculator {
  SLABS = [
    new Slab({ minLiters: 1, maxLiters: 500, cost: 2 }),
    new Slab({ minLiters: 501, maxLiters: 1500, cost: 3 }),
    new Slab({ minLiters: 1501, maxLiters: 3000, cost: 5 }),
    new Slab({ minLiters: 3001, maxLiters: null, cost: 8}),
  ]
  calculatorFor(waterInLiters) {
    validateWaterUnits(waterInLiters)
    let cost = 0;
    for (let slab of this.SLABS) {
      cost += slab.calculate(waterInLiters);
    }
    return cost;
  }
}