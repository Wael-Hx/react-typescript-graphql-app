import { useQuery } from "@apollo/client";
import { UserData } from "../../cache";
import { USER } from "../../gql/queries/users";
import AnimatedContainer from "../styled/AnimatedContainer";

const Home = () => {
  const { data } = useQuery(USER);

  const {
    loggedUser: { user },
  }: UserData = data;

  return (
    <AnimatedContainer width="70%" height="70vh" topMargin="8%" square>
      <div className="dev">
        <h1>
          {`hello ${user?.username || ""}`} <br /> this page is under
          developement
        </h1>
      </div>
    </AnimatedContainer>
  );
};

export default Home;
