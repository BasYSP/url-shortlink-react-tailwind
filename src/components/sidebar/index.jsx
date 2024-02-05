import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
  QrCodeIcon,
  HomeIcon,
  NewspaperIcon,
  LinkIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { useState } from "react";
import { useEffect } from "react";

export function Sidebar() {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Card className="min-h-[100vh] w-full max-w-[15rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-white">
      <div className="mb-2 p-4">
        <p>{user.email}</p>
      </div>
      <List>
        <Link to="/dashboard">
          <ListItem>
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5" />
            </ListItemPrefix>
            Home
          </ListItem>
        </Link>

        <Link to="/links">
          <ListItem>
            <ListItemPrefix>
              <LinkIcon className="h-5 w-5" />
            </ListItemPrefix>
            Links
          </ListItem>
        </Link>
        <Link to="/qrcodes">
          <ListItem>
            <ListItemPrefix>
              <QrCodeIcon className="h-5 w-5" />
            </ListItemPrefix>
            QR Codes
            {/* <ListItemSuffix></ListItemSuffix> */}
          </ListItem>
        </Link>
        <Link to="/bio">
          <ListItem>
            <ListItemPrefix>
              <NewspaperIcon className="h-5 w-5" />
            </ListItemPrefix>
            Link-in-bio
          </ListItem>
        </Link>

        <div onClick={handleLogout}>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </div>
      </List>
    </Card>
  );
}
