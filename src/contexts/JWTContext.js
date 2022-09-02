import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from 'axios';
import { useSelector } from 'react-redux';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

const { REACT_APP_ENDPOINT } = process.env;

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);
const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (username, password) => {
    let user1;
    const response = await axios.post(`${REACT_APP_ENDPOINT}/auth/login/`, {
      username,
      password
    });
    const { access } = response.data;
    setSession(access);
    if (response.status === 200) {
      const headers = {
        Authorization: `Bearer ${access}`
      };
      const response1 = await axios.get(`${REACT_APP_ENDPOINT}/auth/users/me/`, { headers });
      user1 = response1.data;
      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: true,
          user: user1
        }
      });
    }
    dispatch({
      type: 'LOGIN',
      payload: {
        user: user1
      }
    });
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const resetPassword = () => {};

  const updateProfile = () => {};

  const loginlogout = useSelector((state) => state.useradmin.loginlogout);
  let user2;

  const initialize = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const headers = {
          Authorization: `Bearer ${accessToken}`
        };
        const response = await axios.get(`${REACT_APP_ENDPOINT}/auth/users/me/`, { headers });
        user2 = response.data;

        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: true,
            user: user2
          }
        });
      } else {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
        setSession('');
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: false,
          user: null
        }
      });
    }
  };

  useEffect(() => {
    initialize();
    /* eslint-disable-next-line */
  }, [loginlogout]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
