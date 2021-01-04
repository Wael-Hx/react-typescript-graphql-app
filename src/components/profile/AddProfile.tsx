import { useMutation } from "@apollo/client";
import { TextField } from "@material-ui/core";
import React, { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { CREATE_PROFILE, UPDATE_PROFILE } from "../../gql/mutations/users";
import { MY_PROFILE } from "../../gql/queries/users";
import AlertMessage from "../styled/AlertMessage";
import AnimatedContainer from "../styled/AnimatedContainer";
import StyledButton from "../styled/StyledButton";
import StyledForm from "../styled/StyledForm";
import { useHistory, useLocation } from "react-router-dom";

const AddProfile = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const [profile, setProfile] = useState({
    displayName: "",
    bio: "",
    avatar: "",
  });
  const [profileError, setProfileError] = useState("");
  const [createProfile] = useMutation(CREATE_PROFILE, {
    refetchQueries: [
      {
        query: MY_PROFILE,
      },
    ],
    onError(error) {
      setProfileError(error.message);
    },
  });

  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    onError(error) {
      setProfileError(error.message);
    },
    onCompleted() {
      history.push("/profile");
    },
  });

  const { avatar, displayName, bio } = profile;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const submitProfile = (e: FormEvent) => {
    e.preventDefault();
    pathname === "/profile/edit"
      ? updateProfile({ variables: profile })
      : createProfile({ variables: profile });
  };

  return (
    <AnimatedContainer width="70%" height="70vh" topMargin="15vh" square>
      <div className="dev">
        <h1>create your profile here</h1>
      </div>
      <StyledForm onSubmit={submitProfile} width="70%" elevation={0}>
        <TextField
          name="avatar"
          value={avatar}
          onChange={handleChange}
          label="Avatar"
          placeholder="link to your avatar"
          variant="outlined"
          autoComplete="off"
        />
        <TextField
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Name"
          placeholder="add your name"
          variant="outlined"
          autoComplete="off"
        />
        <TextField
          name="bio"
          value={bio}
          onChange={handleChange}
          label="Bio"
          multiline
          rows={4}
          placeholder="add more information about yourself"
          variant="outlined"
          autoComplete="off"
        />
        <StyledButton type="submit">submit</StyledButton>
      </StyledForm>
      {profileError && (
        <AlertMessage
          onClick={() => setProfileError("")}
          messageType="error"
          alertText={profileError}
        />
      )}
    </AnimatedContainer>
  );
};

export default AddProfile;
