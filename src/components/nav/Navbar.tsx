import { Link, useHistory } from "react-router-dom";
import StyledButton from "../styled/StyledButton";
import { useMutation, useQuery } from "@apollo/client";
import { ME, USER } from "../../gql/queries/users";
import { LOGOUT } from "../../gql/mutations/users";
import { loggedUserVar, UserData } from "../../cache";
import { useEffect } from "react";

const Navbar = () => {
  const history = useHistory();
  const { loading, data, refetch } = useQuery(ME, {
    fetchPolicy: "network-only",
  });
  const [logoutUser, { loading: logoutLoading, client }] = useMutation(LOGOUT);
  const { data: userData } = useQuery<UserData>(USER);

  useEffect(() => {
    if (data?.me && !loading) {
      loggedUserVar({
        isAuthenticated: true,
        user: data.me,
        loading: false,
      });
    } else if (!data?.me && !loading) {
      loggedUserVar({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
    }
  }, [data, loading]);

  const logout = async () => {
    try {
      await logoutUser();
      refetch();
      loggedUserVar({
        ...loggedUserVar(),
        isAuthenticated: false,
        user: null,
      });
      client.cache.reset();
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav>
      {userData?.loggedUser.isAuthenticated ? (
        <>
          <StyledButton onClick={logout} disabled={logoutLoading}>
            logout
          </StyledButton>
          <Link className="link" to="/profile">
            <StyledButton>Profile</StyledButton>
          </Link>
        </>
      ) : (
        <Link className="link" to="/auth">
          <StyledButton disabled={loading}> Sign In </StyledButton>
        </Link>
      )}
      <Link className="link" to="/">
        <StyledButton>Home</StyledButton>
      </Link>
    </nav>
  );
};

export default Navbar;
