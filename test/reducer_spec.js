import {Map,List, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles an undefined state', () => {
    const action = {
      type: 'SET_ENTRIES',
      entries: ['Trainspotting', 'Pulp Fiction']
    };

    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting', 'Pulp Fiction']
    }));

  });
  it("handles SET_ENTRIES", () => {
    const action = {
      type: 'SET_ENTRIES',
      entries: ['Trainspotting', 'Pulp Fiction']
    };

    const state = Map();
    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting', 'Pulp Fiction']
    }));
  });
  it("handles VOTE", () => {
    const state = Map({
      entries: List.of(),
      vote: Map({
        pair: List.of('Trainspotting', 'Pulp Fiction')
      })
    });
    const action = {
      type: 'VOTE',
      entry: 'Trainspotting'
    }
    const nextState = reducer(state, action);
    expect(nextState).to.equal(Map({
      entries: List.of(),
      vote: Map({
        pair: List.of('Trainspotting', 'Pulp Fiction'),
        tally: Map({
          'Trainspotting': 1
        })
      })
    }));
  });
  it("handles NEXT", () => {
    const state = Map({
      entries: List.of(),
      vote: Map({
        pair: List.of('Trainspotting', 'Pulp Fiction'),
        tally: Map({
          'Trainspotting': 1,
          'Pulp Fiction': 2
        })
      })
    });
    const action = {
      type: 'NEXT',
    }
    const nextState = reducer(state, action);
    expect(nextState).to.equal(Map({
      winner: 'Pulp Fiction'
    }));
  });

  it('can reduce actions', () => {
    const actions  = [
      {type: 'SET_ENTRIES', entries: ['Train', 'Pulp']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Pulp'},
      {type: 'NEXT'},
    ];

    const nextState = actions.reduce(reducer, Map());

    expect(nextState).to.equal(Map({
      winner: 'Pulp'
    }));
  });
});
