import React from "react";
import User from "./item";

const USERS_PER_PAGE = 15;

interface SampleUser {
  title: string;
  time: number;
  key: string;
  bpm: number;
  path: string;
  [key: string]: any;
}

interface SampleProps {
  users: SampleUser[];
  page: number;
}

const Sample: React.FC<SampleProps> = ({ users, page }) => {
  const startIndex = (page - 1) * USERS_PER_PAGE;
  const selectedUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  return (
    <React.Fragment>
      {selectedUsers.map((user, index) => (
        <User key={index} user={user} />
      ))}
    </React.Fragment>
  );
};

export default Sample;
