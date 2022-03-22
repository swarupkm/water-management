import Apartment from "../src/Apartment";
import CommandSession from "../src/CommandSession";

describe('Command Session', () => {
  describe('handle ALLOT_WATER command', () => {
    const session = new CommandSession();
    session.handle('ALLOT_WATER', [2, '3:7']);
    it('should throw error if already alloted', () => {
      expect(() => session.handle('ALLOT_WATER', [2, '3:7'])).toThrow()
    })
    it('should create apartment', () => {
      expect(session.apartment).toEqual(new Apartment({ bedroomSize: 2 }));
    })
    it('should assign allotment ratio', () => {
      expect(session.allotmentRatio).toEqual({ corporationPart: 3, borewellPart: 7 });
    })
  })

  describe('handle ADD_GUESTS', () => {
    it('should throw error if water is not already alloted', () => {
      const session = new CommandSession();
      expect(() => session.handle('ADD_GUESTS', [2])).toThrow()
    })

    it('should add guests', () => {
      const session = new CommandSession();
      session.handle('ALLOT_WATER',[2, '3:7']);
      expect(() => session.handle('ADD_GUESTS', [2])).not.toThrow();
    })

  })
  describe('handle BILL', () => {
    it('should throw error if water not alloted', () => {
      const session = new CommandSession();
      expect(() => session.handle('BILL',[])).toThrow();
    })
    it('should throw error if bill already generate', () => {
      const session = new CommandSession();
      session.handle('ALLOT_WATER',[2, '3:7']);
      session.handle('BILL',[])
      expect(() => session.handle('BILL',[])).toThrow();
    })
    it('should not throw error if bill is not already generate', () => {
      const session = new CommandSession();
      session.handle('ALLOT_WATER',[2, '3:7']);
      expect(() => session.handle('BILL',[])).not.toThrow();
    })
  })
})