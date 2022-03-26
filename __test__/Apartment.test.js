import Apartment from "../src/Apartment";

describe('Apartment', () => {
  describe('bedroom size', () => {
    it('can construct apartment of bedroom size 2', () => {
      expect(() => new Apartment({ bedroomSize: 2 })).not.toThrow();
    })    
    it('can construct apartment of bedroom size 3', () => {
      expect(() => new Apartment({ bedroomSize: 3 })).not.toThrow();
    })    
    it('cannot construct apartment of any other bedroom size', () => {
      expect(() => new Apartment({ bedroomSize: 1 })).toThrow();
    })
  })

  describe('members', () => {
    it('should have 3 members for 2 bedroom apartment', () => {
      const apartment = new Apartment({ bedroomSize: 2 });
      expect(apartment.membersCount()).toBe(3);
    })
    it('should have 5 members for 3 bedroom apartment', () => {
      const apartment = new Apartment({ bedroomSize: 3 });
      expect(apartment.membersCount()).toBe(5);
    })
    it('should add guests', () => {
      const apartment = new Apartment({ bedroomSize: 3 });
      apartment.addGuests(4)
      expect(apartment.guestsCount()).toBe(4);
    })
  })
  
})