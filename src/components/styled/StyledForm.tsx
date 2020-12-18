import { makeStyles } from "@material-ui/core";
import { FormEvent, ReactNode } from "react";

const useStyles = makeStyles((theme) => ({
  signInContainer: {
    margin: "10% auto auto auto",
    width: 300,
    fontSize: ".8em",
    boxShadow: "0px 5px 10px -8px black",
    padding: "5px 30px",
    border: "1px solid white",
    [theme.breakpoints.down("sm")]: {
      margin: "20% auto auto auto",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",

    "& >*": {
      marginBottom: 10,
    },
    "& > div:last-child": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& h3": {
        fontFamily: "Roboto , system-ui",
        color: "#68adef",
        fontWeight: "500",
        textTransform: "uppercase",
      },
    },
  },
}));

interface Props {
  children: ReactNode;
  register: (e: FormEvent) => void;
}

const StyledForm = ({ children, register }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.signInContainer}>
      <form className={classes.form} onSubmit={register}>
        {children}
      </form>
    </div>
  );
};

export default StyledForm;
