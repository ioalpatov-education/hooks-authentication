import { Button, Avatar } from "@mui/material";
import { useContext } from "react";
import { NewsContext } from "../../App";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const { userProfile, logOut } = useContext(NewsContext);
  const navigate = useNavigate();

  const { name, avatar } = userProfile;

  const handleClick = () => {
    logOut();
    navigate("/");
  };

  return (
    <div className="user-info">
      <span>Hello: {`${name}`}</span>
      <Avatar alt={name} src={avatar} />

      <Button variant="outlined" color="error" onClick={handleClick}>
        Logout
      </Button>
    </div>
  );
};

export default UserInfo;
