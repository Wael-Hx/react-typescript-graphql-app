import { Button, makeStyles, ButtonProps } from "@material-ui/core";
import { FC } from "react";

const useStyles = makeStyles({
  root: {
    fontSize: "0.85rem",
    fontWeight: 400,
    fontFamily: "Raleway, Roboto",
  },
  outlined: {
    color: "black",
    borderColor: "transparent",
    margin: "0 5px 0 5px",
    "&:hover": {
      borderColor: "black",
    },
  },
});

const StyledButton: FC<ButtonProps> = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <Button
      variant="outlined"
      {...props}
      classes={{ outlinedPrimary: classes.outlined, root: classes.root }}
    >
      {children}
    </Button>
  );
};

export default StyledButton;
