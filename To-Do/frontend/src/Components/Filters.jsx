import React, { useEffect, useState } from "react";
import All from "../assets/material-symbols-light--all-inbox.png";
import Starred from "../assets/ic--round-star.png";
import Today from "../assets/material-symbols-light--today.png";
import Week from "../assets/tabler--calendar-week.png";
import Delete from "../assets/Delete.png";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setTodo } from "../Store/Reducers/TodoFilterSlice";
import { setActiveDeletedFilter } from "../Store/Reducers/ActiveDeletedFilter";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import global from "../Components/Global";

function Filters(props) {
  const userInfo = useSelector((state) => state.UserSlice);

  const dispatch = useDispatch();
  const apiUrl = global.REACT_APP_API_BASE_URL;

  const [isActive, setIsActive] = useState({
    isAllActive: true,
    isStarredActive: false,
    isTodayActive: false,
    isWeekActive: false,
    isDeletedActive: false,
  });

  useEffect(() => {
    dispatch(setActiveDeletedFilter(isActive));
  }, [isActive]);

  const [count, setCount] = useState({
    allCount: "",
    starredCount: "",
    todayCount: "",
    weekCount: "",
    deletedCount: "",
  });
  const closeHandler = () => {
    props.setShow(false);
  };

  const toggleFilter = (filter) => {
    setIsActive((prevState) => ({
      isAllActive: filter === "all" ? !prevState.isAllActive : false,
      isStarredActive:
        filter === "starred" ? !prevState.isStarredActive : false,
      isTodayActive: filter === "today" ? !prevState.isTodayActive : false,
      isWeekActive: filter === "week" ? !prevState.isWeekActive : false,
      isDeletedActive:
        filter === "deleted" ? !prevState.isDeletedActive : false,
    }));
  };

  useEffect(() => {
    getTodoData();
  }, [isActive]);

  const getTodoData = () => {
    let filterType;
    if (isActive.isAllActive) filterType = "all";
    else if (isActive.isStarredActive) filterType = "starred";
    else if (isActive.isTodayActive) filterType = "today";
    else if (isActive.isWeekActive) filterType = "week";
    else if (isActive.isDeletedActive) filterType = "deleted";

    if (filterType) {
      if (userInfo.userId != "") {
        const url = apiUrl + "filters/" + filterType;

        axios
          .post(url, {
            userId: userInfo.userId,
          })
          .then((res) => {
            if (res.data.status === false) {
              toast.info(res.data.message);
            } else {
              dispatch(setTodo(res.data));
              setCount((prevCount) => ({
                ...prevCount,
                [`${filterType}Count`]: res.data.length,
              }));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <div>
      <div className="filter-top">
        <h2 id="filters-heading">Filters</h2>
        <div className="close">
          <i onClick={closeHandler} className="ri-close-fill"></i>
        </div>
      </div>
      <ul id="filters-list">
        <li
          className={isActive.isAllActive ? "li-active" : ""}
          onClick={() => toggleFilter("all")}
        >
          <span>
            <img src={All} alt="all-icon" className="icon" />
          </span>
          <span className="fl-text">All</span>
          <span className="count-badge">{count.allCount}</span>
        </li>

        <li
          className={isActive.isStarredActive ? "li-active" : ""}
          onClick={() => toggleFilter("starred")}
        >
          <span>
            <img src={Starred} alt="starred-icon" className="icon" />
          </span>
          <span className="fl-text">Starred</span>
          <span className="count-badge">{count.starredCount}</span>
        </li>

        <li
          className={isActive.isTodayActive ? "li-active" : ""}
          onClick={() => toggleFilter("today")}
        >
          <span>
            <img src={Today} alt="today-icon" className="icon" />
          </span>
          <span className="fl-text">Today</span>
          <span className="count-badge">{count.todayCount}</span>
        </li>

        <li
          className={isActive.isWeekActive ? "li-active" : ""}
          onClick={() => toggleFilter("week")}
        >
          <span>
            <img src={Week} alt="week-icon" className="icon" />
          </span>
          <span className="fl-text">Week</span>
          <span className="count-badge">{count.weekCount}</span>
        </li>

        <li
          className={isActive.isDeletedActive ? "li-active" : ""}
          onClick={() => toggleFilter("deleted")}
        >
          <span>
            <img src={Delete} alt="delete-icon" className="icon" />
          </span>
          <span className="fl-text">Deleted</span>
          <span className="count-badge">{count.deletedCount}</span>
        </li>
      </ul>
    </div>
  );
}
export default Filters;
