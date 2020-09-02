import React, { FC } from 'react';
import { selectors } from '@grafana/e2e-selectors';

import { FormModel } from './LoginCtrl';
import { Button, Field } from '@grafana/ui';
import { Input } from './CustomLoginInput';
import { Form } from './CustomForm';
import { css } from 'emotion';

interface Props {
  displayForgotPassword: boolean;
  onSubmit: (data: FormModel) => void;
  isLoggingIn: boolean;
  passwordHint: string;
  loginHint: string;
}

const forgottenPasswordStyles = css`
  color: black;
  display: inline-block;
  margin-top: 16px;
  float: right;
`;

const wrapperStyles = css`
  width: 100%;
  padding-bottom: 16px;
`;

const inputOverrideStyles = css`
  font-size: 18px;
  color: black;
  background: white;
`;

const labelOverrideStyles = css`
  font-size: 18px;
  color: black;
`;

export const submitButton = css`
  margin-top: 
  font-size: 18px;
  justify-content: center;
  width: 100%;
`;

export const LoginForm: FC<Props> = ({ displayForgotPassword, onSubmit, isLoggingIn, passwordHint, loginHint }) => {
  return (
    <div className={wrapperStyles}>
      <Form onSubmit={onSubmit} validateOn="onChange">
        {({ register, errors }) => (
          <>
            <Field
              className={labelOverrideStyles}
              label="Email or username"
              invalid={!!errors.user}
              error={errors.user?.message}
            >
              <Input
                className={inputOverrideStyles}
                autoFocus
                name="user"
                ref={register({ required: 'Email or username is required' })}
                placeholder={loginHint}
                aria-label={selectors.pages.Login.username}
              />
            </Field>
            <Field
              className={labelOverrideStyles}
              label="Password"
              invalid={!!errors.password}
              error={errors.password?.message}
            >
              <Input
                className={inputOverrideStyles}
                name="password"
                type="password"
                placeholder={passwordHint}
                ref={register({ required: 'Password is requireed' })}
                aria-label={selectors.pages.Login.password}
              />
            </Field>
            <Button aria-label={selectors.pages.Login.submit} className={submitButton} disabled={isLoggingIn}>
              {isLoggingIn ? 'Logging in...' : 'Log in'}
            </Button>
            {displayForgotPassword && (
              <a className={forgottenPasswordStyles} href="user/password/send-reset-email">
                Forgot your password?
              </a>
            )}
          </>
        )}
      </Form>
    </div>
  );
};
