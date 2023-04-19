import PropTypes from "prop-types";
import { Button, Avatar } from "@mui/material";

const UserInfo = ({ userProfile, onLogOut }) => {
  const { name, avatar } = userProfile;

  const logOut = () => {
    onLogOut();
  };

  return (
    <div className="user-info">
      <span>Hello: {`${name}`}</span>
      <Avatar alt={name} src={avatar} />

      <Button variant="outlined" color="error" onClick={logOut}>
        Logout
      </Button>
    </div>
  );
};

UserInfo.propTypes = {
  userProfile: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onLogOut: PropTypes.func.isRequired,
};

export default UserInfo;
