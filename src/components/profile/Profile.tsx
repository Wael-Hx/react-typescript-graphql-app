import { useQuery } from "@apollo/client";
import { useState } from "react";
import { MY_PROFILE, UserProfile } from "../../gql/queries/users";
import AnimatedContainer from "../styled/AnimatedContainer";
import { Skeleton, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import StyledTab from "../styled/StyledTab";
import StyledTabs from "../styled/StyledTabs";
import TabPanel from "../styled/TabPanel";
import StyledAvatar from "../styled/StyledAvatar";
import AddProfile from "./AddProfile";
import { Link } from "react-router-dom";

const Profile = () => {
  const [value, setValue] = useState(0);
  const { loading, data } = useQuery<UserProfile>(MY_PROFILE);

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue);
  };

  if (loading) {
    return <h1 className="center">Loading ...</h1>;
  }
  if (!loading && !data?.myProfile) {
    return <AddProfile />;
  }
  return (
    <>
      <AnimatedContainer width="70%" topMargin="15vh" height={140} square>
        {loading ? (
          <Skeleton variant="circular">
            <StyledAvatar size={12}></StyledAvatar>
          </Skeleton>
        ) : (
          <StyledAvatar
            src={data?.myProfile.avatar}
            alt={data?.myProfile.user.username}
            size={12}
          >
            {data?.myProfile.displayName.charAt(0) ||
              data?.myProfile.user.username.charAt(0)}
          </StyledAvatar>
        )}
        <div className="aligned">
          <Typography variant="h5" color="primary">
            {data?.myProfile.displayName}
          </Typography>
          <Link to="/profile/edit">
            <EditIcon color="primary" fontSize="small" />
          </Link>
        </div>
      </AnimatedContainer>
      <AnimatedContainer
        width="70%"
        topMargin="10px"
        height={365}
        elevation={2}
        square
      >
        <StyledTabs
          onChange={handleChange}
          value={value}
          variant="scrollable"
          allowScrollButtonsMobile
          scrollButtons="auto"
        >
          <StyledTab label="About" />
          <StyledTab label="Posts" />
          <StyledTab label="Liked" />
          <StyledTab label="Saved" />
        </StyledTabs>
        <TabPanel value={value} index={0}>
          <Typography variant="body1" paragraph>
            {data?.myProfile.bio || ""}
          </Typography>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="dev">
            <h1> you haven't created any posts yet </h1>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className="dev">
            <h1> you haven't liked any posts yet </h1>
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <div className="dev">
            <h1> you haven't saved any posts yet </h1>
          </div>
        </TabPanel>
      </AnimatedContainer>
    </>
  );
};

export default Profile;
