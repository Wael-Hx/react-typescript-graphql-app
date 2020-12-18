import { TextField } from "@material-ui/core";
import { ChangeEvent, FormEvent, useState } from "react";
import StyledButton from "../styled/StyledButton";
import StyledForm from "../styled/StyledForm";

const Register = () => {
  const [signIn, setSignIn] = useState(true);
  const [customError, setCustomError] = useState<null | string>(null);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    repeatedPassword: "",
  });

  const { email, password, repeatedPassword } = credentials;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const submitUser = (e: FormEvent) => {
    e.preventDefault();
    if (password !== repeatedPassword && !signIn) {
      return setCustomError("password does not match");
    }
    console.log("submit");
  };
  return (
    <StyledForm register={submitUser}>
      <TextField
        name="email"
        value={email}
        onChange={handleChange}
        type="email"
        label="Email"
        required
        autoComplete="off"
      />
      <TextField
        name="password"
        value={password}
        onChange={handleChange}
        type="password"
        label="Password"
        required
        autoComplete="off"
      />
      {!signIn && (
        <>
          <TextField
            value={repeatedPassword}
            onChange={handleChange}
            name="repeatedPassword"
            type="password"
            label="Repeat Password"
            FormHelperTextProps={{ style: { color: "red" } }}
            helperText={customError}
            required
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
  );
};

export default Register;
