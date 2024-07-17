import React from "react";
import { useSelector } from "react-redux";
function ProfilePage() {
  const userInfo = useSelector((state) => state.UserSlice);
  const todoData = useSelector((state) => state.TodoFilterSlice);
  console.log(todoData);
  return (
    <div id="profile-page-main-container">
      <div id="profile-header">
        <section id="profile-header-banner">
          {/* <img src="" alt="profile-banner" /> */}
        </section>
        <section id="profile-header-info">
          <section id="phi-pic">
            {/* <img src="" alt="profile-pic" /> */}
          </section>
          <section id="phi-user-info">
            <h1>{userInfo?.name}</h1>
            <h3>@{userInfo.username}</h3>
          </section>
        </section>
      </div>
      <div id="profile-body">
        <section id="task-matrices">
          <div id="task-created">
            <h2>Task Created</h2>
            <h3>10</h3>
          </div>
          <div id="task-completed">
            <h2>Task Completed</h2>
            <h3>8</h3>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProfilePage;
