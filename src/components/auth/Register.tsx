import { useMutation } from "@apollo/client";
import { TextField } from "@material-ui/core";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { LOGIN, REGISTER } from "../../gql/mutations/users";
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
  const [login, { loading: loginLoading }] = useMutation(LOGIN);
  const [register, { loading: registeLoading }] = useMutation(REGISTER);

  useEffect(() => {
    if (loginLoading || registeLoading) {
      setCustomError("");
    }
  }, [loginLoading, registeLoading]);

  const { username, email, password, repeatedPassword } = credentials;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const submitUser = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== repeatedPassword && !signIn) {
      return setCustomError("password does not match");
    } else {
      try {
        signIn
          ? await login({ variables: { email, password } })
          : await register({ variables: { username, email, password } });
        history.push("/");
      } catch (err) {
        setCustomError(err.message);
      }
    }
  };
  return (
    <section className="slide-overflow">
      <StyledForm slideDirection="up" onSubmit={submitUser}>
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
          <StyledButton type="submit">
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
