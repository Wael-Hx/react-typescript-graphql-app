import { makeStyles, Theme, Tab, TabProps } from "@material-ui/core";
import { FC } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  tab: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: "Raleway, Roboto, Segoe UI",
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#40a9ff",
    },
  },
  selected: {},
}));

const StyledTab: FC<TabProps> = ({ ...props }) => {
  const classes = useStyles();
  return <Tab className={classes.tab} {...props} />;
};

export default StyledTab;
