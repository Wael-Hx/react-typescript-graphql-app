import { Link } from "react-router-dom";
import StyledButton from "../styled/StyledButton";

const Navbar = () => {
  return (
    <nav>
      <Link className="link" to="/auth">
        <StyledButton> Sign In </StyledButton>
      </Link>
    </nav>
  );
};

export default Navbar;
