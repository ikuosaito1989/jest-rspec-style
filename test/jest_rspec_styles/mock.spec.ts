import '../spec_helper';
import Mock from '../../src/jest_rspec_styles/mock';

describe('Mock', () => {
  lazy('described_instance', () => {
    return new Mock();
  });

  describe('#alow', () => {
    subject(() => {
      return lazy('described_instance').allow(lazy('target')).toReceive('toString').andReturn('stub-value');
    });

    lazy('target', () => {
      return new Date();
    });

    it('Mock method', () => {
      subject();
      expect(lazy('target').toString()).toEqual('stub-value');
    });

    context('When after mock method', () => {
      beforeEach(() => {
        subject();
      });

      it('Can unmock method.', () => {
        subject();
        expect(() => jest.restoreAllMocks()).toChange(() => jest.isMockFunction(lazy('target').toString), {
          from: true,
          to:   false,
        });
      });
    });

    context('When mock multiple times', () => {
      beforeEach(() => {
        subject();
        lazy('described_instance').allow(lazy('target')).toReceive('toString').andCallOriginal();
      });

      it('Mock method', () => {
        expect(lazy('target').toString()).toEqual('stub-value');
      });

      it('Can unmock method.', () => {
        expect(() => jest.restoreAllMocks()).toChange(() => jest.isMockFunction(lazy('target').toString), {
          from: true,
          to:   false,
        });
      });
    });
  });

  describe('#alowAnyInstanceOf', () => {
    subject(() => {
      return lazy('described_instance').allowAnyInstanceOf(lazy('target')).toReceive('toString').andReturn('stub-value');
    });

    lazy('target', () => {
      return Date;
    });

    it('Mock method', () => {
      subject();
      expect((new Date()).toString()).toEqual('stub-value');
    });
  });
});
