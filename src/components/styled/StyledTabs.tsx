import { makeStyles, Tabs, TabsProps } from "@material-ui/core";
import { FC } from "react";

const useStyles = makeStyles({
  tabs: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: "#1890ff",
  },
});

const StyledTabs: FC<TabsProps> = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <Tabs
      className={classes.tabs}
      classes={{ indicator: classes.indicator }}
      {...props}
    >
      {children}
    </Tabs>
  );
};

export default StyledTabs;
