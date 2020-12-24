import { makeStyles, Paper, PaperProps, Slide } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "10% auto auto auto",
    width: ({ width }: any) => (width ? width : "auto"),
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

interface StyledFormProps extends PaperProps {
  slideDirection: "up" | "left" | "down" | "right";
  width?: string | number;
}

const StyledForm = ({
  children,
  slideDirection,
  width,
  ...props
}: StyledFormProps) => {
  const classes = useStyles({ width });
  return (
    <Slide direction={slideDirection} in mountOnEnter unmountOnExit>
      <Paper className={classes.container} {...props}>
        <form className={classes.form}>{children}</form>
      </Paper>
    </Slide>
  );
};

export default StyledForm;
