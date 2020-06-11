import Immutable from 'immutable';
import { service } from '../util/request';


export default {
  namespace: 'user',
  state: Immutable.fromJS({
    user: {},
  }),
  reducers: {
    updateUser(state, { payload }) {
      return state.set('user', Immutable.fromJS(payload));
    },
  },

  effects: {
    * fetchUser({ payload }, { call, put }, actionCreator) {
      const res = yield call(service('GET', '/api/user'), payload);
      if (res) {
        yield put(actionCreator.updateUser(res.data));
      }
    },
  },
};
