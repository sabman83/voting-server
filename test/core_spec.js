import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, vote, next} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

  it('adds the entries to the state', () => {
    const state = Map();
    const entries = ['Trainspotting', '28 Days Later'];
    const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }));
    });

  });

  describe('next', () => {
      it('creates a vote with a pair from the entry', () => {
      const state = Map({
        entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
      });

      const nextState = next(state);

      expect(nextState).to.equal(Map({
        entries: List.of('Sunshine'),
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later')
        })
      }));

    });
    it('updates current pair and adds a new one', () => {
      const state = Map({
        entries: List.of('Sunshine'),
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 4
          })
        })
      });

      const nextState = next(state);

      expect(nextState).to.equal(Map({
        entries: List.of(),
        vote: Map({
          pair: List.of('Sunshine', '28 Days Later')
        })
      }));
    });

    it('puts a tied pair back to entries', () => {
      const state = Map({
        entries: List.of('Sunshine', 'Pulp Fiction'),
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 4
          })
        })
      });

      const nextState = next(state);

      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later'),
        vote: Map({
          pair: List.of('Sunshine', 'Pulp Fiction')
        })
      }));

    });

    it('declares a winnner when all entries have been voted off', () => {
      const state = Map({
        entries: List.of(),
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 5
          })
        })
      });

      const nextState = next(state);

      expect(nextState).to.equal(Map({
        winner: '28 Days Later'
      }));
    });
  });

  describe('vote', () => {
    it('creates a tally for an unvoted entry', () => {
      const state = Map({
          pair: List.of('Trainspotting', '28 Days Later')
      });

      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 1
          })
        })
      );
    });

    it('increments the tally for an a voted entry', () => {
      const state = Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 4
          })
      });
      const nextState = vote(state, '28 Days Later');
      expect(nextState).to.eq(Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 5
          })
      }));
    });
  });



















});
