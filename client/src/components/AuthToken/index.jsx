import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ALL_COURSES } from '../../store/courses/actions';
import { SET_TUTOR_LOGIN } from '../../store/tutor/actions';

import Auth from '../../utils/graphql/auth';
import { MUTATION_TOKEN_LOGIN } from '../../utils/graphql/tutor/mutations';

const AuthToken = () => {
  const [loginWithToken] = useMutation(MUTATION_TOKEN_LOGIN);
  const dispatch = useDispatch();

  const { loggedIn } = useSelector((state) => state.tutor);

  const currentToken = Auth.getToken();
  useEffect(() => {
    if (loggedIn || !currentToken || Auth.isTokenExpired(currentToken)) return <div />;
    let mounted = true;
    const login = async () => {
      try {
        const {
          data: { loginWithToken: { token, tutor } },
        } = await loginWithToken();
        if (!tutor || !token || !mounted) return;
        Auth.login(token);
        dispatch({ type: SET_TUTOR_LOGIN, payload: tutor });
        dispatch({ type: SET_ALL_COURSES, payload: tutor.courses });
      } catch (error) {
        console.error(error);
        Auth.logout();
      }
    };
    login();
    return () => { mounted = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div />;
};

export default AuthToken;
