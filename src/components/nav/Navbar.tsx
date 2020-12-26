import { Link, RouteComponentProps } from "react-router-dom";
import StyledButton from "../styled/StyledButton";
import { useMutation, useQuery } from "@apollo/client";
import { ME, USER } from "../../gql/queries/users";
import { LOGOUT } from "../../gql/mutations/users";
import { loggedUserVar, UserData } from "../../cache";
import { FC, useEffect } from "react";

const Navbar: FC<RouteComponentProps> = ({ history }) => {
  const { loading, data, refetch } = useQuery(ME, {
    fetchPolicy: "network-only",
  });
  const [logoutUser, { loading: logoutLoading, client }] = useMutation(LOGOUT);
  const { data: userData } = useQuery<UserData>(USER);

  useEffect(() => {
    if (data?.me) {
      loggedUserVar({
        isAuthenticated: true,
        user: data.me,
        loading: false,
      });
    }
  }, [data]);

  const logout = async () => {
    try {
      await logoutUser();
      refetch();
      loggedUserVar({
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
