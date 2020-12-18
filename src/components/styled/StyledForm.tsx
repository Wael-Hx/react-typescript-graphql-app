import { makeStyles, Paper, PaperProps, Slide } from "@material-ui/core";
import { FormEvent } from "react";

const useStyles = makeStyles((theme) => ({
  signInContainer: {
    margin: "10% auto auto auto",
    width: 300,
    fontSize: ".8em",
    boxShadow: "0px 5px 10px -8px black",
    padding: "20px 30px",
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

interface Props extends PaperProps {
  register: (e: FormEvent) => void;
}

const StyledForm = ({ children, register, ...props }: Props) => {
  const classes = useStyles();
  return (
    <Slide direction="up" in mountOnEnter unmountOnExit>
      <Paper className={classes.signInContainer} {...props}>
        <form className={classes.form} onSubmit={register}>
          {children}
        </form>
      </Paper>
    </Slide>
  );
};

export default StyledForm;
