import { useMutation } from "@apollo/client";
import { TextField } from "@material-ui/core";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { loggedUserVar } from "../../cache";
import { LOGIN, REGISTER } from "../../gql/mutations/users";
import { MY_PROFILE } from "../../gql/queries/users";
import StyledButton from "../styled/StyledButton";
import StyledForm from "../styled/StyledForm";

const Register: FC<RouteComponentProps> = ({ history }) => {
  const [signIn, setSignIn] = useState(true);
  const [customError, setCustomError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    repeatedPassword: "",
  });
  const [login, { loading: loginLoading }] = useMutation(LOGIN, {
    refetchQueries: [
      {
        query: MY_PROFILE,
      },
    ],
    onCompleted({ login }) {
      if (login) {
        loggedUserVar({
          isAuthenticated: true,
          user: login,
        });
        history.push("/");
      }
    },
    onError({ message }) {
      setCustomError(message);
    },
  });
  const [register, { loading: registeLoading }] = useMutation(REGISTER, {
    onCompleted({ register }) {
      if (register) {
        loggedUserVar({
          isAuthenticated: true,
          user: register,
        });
        history.push("/profile");
      }
    },
    onError({ message }) {
      setCustomError(message);
    },
  });

  useEffect(() => {
    if (loginLoading || registeLoading) {
      setCustomError("");
    }
  }, [loginLoading, registeLoading]);

  const { username, email, password, repeatedPassword } = credentials;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const submitUser = (e: FormEvent) => {
    e.preventDefault();
    if (password !== repeatedPassword && !signIn) {
      return setCustomError("password does not match");
    } else {
      signIn
        ? login({ variables: { email, password } })
        : register({ variables: { username, email, password } });
    }
  };
  return (
    <section className="slide-overflow">
      <StyledForm
        slideDirection="up"
        topMargin="15vh"
        width={300}
        onSubmit={submitUser}
      >
        {!signIn && (
          <TextField
            name="username"
            value={username}
            onChange={handleChange}
            type="text"
            label="Username"
            required
            autoComplete="off"
            error={customError.includes("username")}
            helperText={customError.includes("username") ? customError : null}
          />
        )}
        <TextField
          name="email"
          value={email}
          onChange={handleChange}
          type="email"
          label="Email"
          required
          autoComplete="off"
          error={customError.includes("email") || customError.includes("user")}
          helperText={
            customError.includes("email") || customError.includes("user")
              ? customError
              : null
          }
        />
        <TextField
          name="password"
          value={password}
          onChange={handleChange}
          type="password"
          label="Password"
          required
          autoComplete="off"
          error={
            customError.includes("password") ||
            customError.includes("credentials")
          }
          helperText={
            customError.includes("password") ||
            customError.includes("credentials")
              ? customError
              : null
          }
        />
        {!signIn && (
          <>
            <TextField
              value={repeatedPassword}
              onChange={handleChange}
              name="repeatedPassword"
              type="password"
              label="Repeat Password"
              required
              autoComplete="off"
              error={customError.includes("match")}
              helperText={customError.includes("match") && customError}
            />
            <p>
              By creating an account, you agree to our Conditions of Use and
              Privacy Policy.
            </p>
          </>
        )}
        <div>
          <StyledButton type="submit" disabled={loginLoading || registeLoading}>
            {signIn ? "Sign In" : "Register"}
          </StyledButton>
          Or
          <h3 className="pointer" onClick={() => setSignIn(!signIn)}>
            {signIn ? "Register" : "Sign In"}
          </h3>
        </div>
      </StyledForm>
    </section>
  );
};

export default Register;
