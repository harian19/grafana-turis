// Libraries
import React, { FC } from 'react';
import { cx, keyframes, css } from 'emotion';

// Components
import { UserSignup } from './UserSignup';
import { LoginServiceButtons } from './LoginServiceButtons';
import LoginCtrl from './LoginCtrl';
import { LoginForm } from './LoginForm';
import { ChangePassword } from './ChangePassword';
import { Branding } from 'app/core/components/Branding/Branding';
import { useStyles } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';

export const LoginPage: FC = () => {
  const loginStyles = useStyles(getLoginStyles);
  return (
    <div>
      <div className={loginStyles.customBackground}>
        <img className={loginStyles.remoteSenseLogo} alt="Remote Sense" src="public/img/whiteRSlogo.png"></img>
      </div>
      <Branding.LoginBackground className={loginStyles.container}>
        <div className={cx(loginStyles.loginContent, Branding.LoginBoxBackground())}>
          <div className={loginStyles.loginLogoWrapper}>
            <Branding.LoginLogo className={loginStyles.loginLogo} />
            <div className={loginStyles.titleWrapper}>
              <h4>Powered by Remote Sense</h4>
              {/* <h1 className={loginStyles.mainTitle}>{Branding.LoginTitle}</h1> */}
              {/* <h3 className={loginStyles.subTitle}>Link - IOT</h3> */}
            </div>
          </div>
          <LoginCtrl>
            {({
              loginHint,
              passwordHint,
              ldapEnabled,
              authProxyEnabled,
              disableLoginForm,
              disableUserSignUp,
              login,
              isLoggingIn,
              changePassword,
              skipPasswordChange,
              isChangingPassword,
            }) => (
              <div className={loginStyles.loginOuterBox}>
                {!isChangingPassword && (
                  <div className={`${loginStyles.loginInnerBox} ${isChangingPassword ? 'hidden' : ''}`} id="login-view">
                    {!disableLoginForm && (
                      <LoginForm
                        displayForgotPassword={!(ldapEnabled || authProxyEnabled)}
                        onSubmit={login}
                        loginHint={loginHint}
                        passwordHint={passwordHint}
                        isLoggingIn={isLoggingIn}
                      />
                    )}

                    <LoginServiceButtons />
                    {!disableUserSignUp && <UserSignup />}
                  </div>
                )}

                {isChangingPassword && (
                  <div className={cx(loginStyles.loginInnerBox, loginStyles.enterAnimation)}>
                    <ChangePassword onSubmit={changePassword} onSkip={skipPasswordChange as any} />
                  </div>
                )}
              </div>
            )}
          </LoginCtrl>

          <div className="clearfix" />
        </div>
      </Branding.LoginBackground>
    </div>
  );
};

const flyInAnimation = keyframes`
from{
  transform: translate(-400px, 0px);
}

to{
  transform: translate(0px, 0px);
}`;

export const getLoginStyles = (theme: GrafanaTheme) => {
  return {
    container: css`
      min-height: 85vh;
      background-position: center;
      background-repeat: no-repeat;
      min-width: 100%;
      margin-left: 0;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    `,
    customBackground: css`
      background-color: #1a8bd8;
      height: 15vh;
    `,
    submitButton: css`
      justify-content: center;
      width: 100%;
    `,
    remoteSenseLogo: css`
      max-width: 17vh;
      margin-left: 2vh;
      margin-top: 2vh;
    `,
    loginLogo: css`
      width: 100%;
      max-width: 40vh;
      margin-bottom: 25px;
    `,
    loginLogoWrapper: css`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: ${theme.spacing.lg};
      padding-bottom: 10px;
    `,
    titleWrapper: css`
      color: black;
      text-align: center;
    `,
    mainTitle: css`
      font-size: '32px';
      color: black;
    `,
    subTitle: css`
      font-size: ${theme.typography.size.md};
      color: ${theme.colors.textSemiWeak};
    `,
    loginContent: css`
      max-width: 600px;
      width: 100%;
      display: flex;
      align-items: stretch;
      flex-direction: column;
      position: relative;
      justify-content: center;
      z-index: 1;
      min-height: 320px;
      border-radius: 3px;
      padding: 20px 0;
    `,
    loginOuterBox: css`
      display: flex;
      overflow-y: hidden;
      align-items: center;
      justify-content: center;
    `,
    loginInnerBox: css`
      padding: 32px 32px 0px 32px;
      @media (max-width: 320px) {
        padding: ${theme.spacing.lg};
      }
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
      max-width: 600px;
      width: 100%;
      transform: translate(0px, 0px);
      transition: 0.25s ease;
    `,
    enterAnimation: css`
      animation: ${flyInAnimation} ease-out 0.2s;
    `,
  };
};
