import { Button, makeStyles, ButtonProps } from "@material-ui/core";
import { FC } from "react";

const useStyles = makeStyles({
  outlined: {
    color: "black",
    borderColor: "transparent",
    margin: "0 5px 0 5px",
    "&:hover": {
      borderColor: "black",
    },
  },
});

const StyledButton: FC<ButtonProps> = ({ children }) => {
  const classes = useStyles();
  return (
    <Button variant="outlined" classes={{ outlinedPrimary: classes.outlined }}>
      {children}
    </Button>
  );
};

export default StyledButton;
