import { CircularProgress, TextField } from "@material-ui/core";
import { ChangeEvent, FormEvent, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import StyledButton from "../styled/StyledButton";
import StyledForm from "../styled/StyledForm";
import { loggedUserVar, UserVar } from "../../cache";
import { useReactiveVar } from "@apollo/client";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { token } = useParams<{ token: string }>();
  const auth = useReactiveVar<UserVar>(loggedUserVar);

  const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handmeEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const changeYourPassword = (e: FormEvent) => {
    e.preventDefault();
  };

  if (auth.loading) {
    return (
      <div className="center">
        <CircularProgress />
      </div>
    );
  }
  if (auth.user) {
    return <Redirect to="/" />;
  }
  return (
    <section className="slide-overflow">
      <StyledForm onSubmit={changeYourPassword} width="20%" topMargin="10%">
        {token ? (
          <TextField
            label="Reset Password"
            name="password"
            onChange={handlePassChange}
            value={password}
            type="password"
            required
            autoComplete="off"
          />
        ) : (
          <TextField
            label="Type your Email"
            name="email"
            value={email}
            onChange={handmeEmailChange}
            type="email"
            required
            autoComplete="on"
          />
        )}
        <StyledButton type="submit">Confirm</StyledButton>
      </StyledForm>
    </section>
  );
};

export default ChangePassword;
