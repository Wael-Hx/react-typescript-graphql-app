import { TextField } from "@material-ui/core";
import { ChangeEvent, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import StyledButton from "../styled/StyledButton";
import StyledForm from "../styled/StyledForm";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { token } = useParams<{ token: string }>();

  const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handmeEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const changeYourPassword = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
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
  );
};

export default ChangePassword;
