import { useQuery } from "@apollo/client";
import { useState } from "react";
import { MY_PROFILE, UserProfile } from "../../gql/queries/users";
import AnimatedContainer from "../styled/AnimatedContainer";
import { Skeleton, Typography } from "@material-ui/core";
import StyledTab from "../styled/StyledTab";
import StyledTabs from "../styled/StyledTabs";
import TabPanel from "../styled/TabPanel";
import StyledAvatar from "../styled/StyledAvatar";

const Profile = () => {
  const [value, setValue] = useState(0);

  const { loading, data, error } = useQuery<UserProfile>(MY_PROFILE);

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue);
  };

  if (!loading && data?.myProfile === null) {
    return (
      <AnimatedContainer width="70%" height="70vh" topMargin="8%" square>
        <div className="dev">
          <h1>create your profile here</h1>
        </div>
      </AnimatedContainer>
    );
  }

  return (
    <>
      <AnimatedContainer width="70%" topMargin="8%" height={140} square>
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
            {data?.myProfile.displayName.charAt(0)}
          </StyledAvatar>
        )}
        <Typography variant="h5" color="primary">
          {data?.myProfile.displayName}
        </Typography>
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
          {(
            <Typography variant="body1" paragraph>
              {data?.myProfile.bio}
            </Typography>
          ) ?? (
            <div className="dev">
              <h1> empty </h1>
            </div>
          )}
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
