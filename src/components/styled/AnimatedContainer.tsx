import { makeStyles, Paper, PaperProps, Grow } from "@material-ui/core";
import { FC } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: ({ topMargin }: any) => `${topMargin || "auto"} auto auto auto`,
    width: ({ width }: any) => (width ? width : "auto"),
    height: ({ height }: any) => (height ? height : "auto"),
    fontSize: ".8em",
    padding: "20px 30px",
    [theme.breakpoints.down("sm")]: {
      margin: "20% auto auto auto",
      padding: "8px 20px",
      width: ({ width }: any) => (width ? addWidth(width) : "auto"),
    },
  },
}));

interface AnimatedContainerProps extends PaperProps {
  width?: string | number;
  height?: string | number;
  topMargin?: string;
}

const AnimatedContainer: FC<AnimatedContainerProps> = ({
  children,
  width,
  height,
  topMargin,
  ...props
}) => {
  const classes = useStyles({ width, height, topMargin });
  return (
    <Grow in timeout={500}>
      <Paper className={classes.container} {...props}>
        {children}
      </Paper>
    </Grow>
  );
};

export default AnimatedContainer;

const addWidth = (width: number | string): string | number => {
  if (typeof width === "string") {
    return `${Math.round((100 - parseInt(width)) / 2) + parseInt(width)}%`;
  }
  return Math.round((100 - width) / 2) + width;
};
