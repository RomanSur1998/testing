import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import "../../src/components/Table.css";
import { GetData } from "./GetData/GetData";

const Table = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  console.log("data", data);

  useEffect(() => {
    GetData(dispatch);
  }, []);

  const renderTable = () => {
    const today = new Date();
    const daysInWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    const startDate = new Date(today.getTime() - 50 * 7 * 24 * 60 * 60 * 1000);
    const endDate = today;

    const tableRows = [];
    const currentDate = startDate;

    for (let i = 0; i < 7; i++) {
      const weekData = [];
      const weekStartDate = new Date(
        currentDate.getTime() + i * 24 * 60 * 60 * 1000
      );
      weekData.push(<td key={daysInWeek[i]}>{daysInWeek[i]}</td>);
      for (let j = 0; j < 50; j++) {
        const date = new Date(
          weekStartDate.getTime() + j * 7 * 24 * 60 * 60 * 1000
        );
        const dateString = date.toISOString().slice(0, 10);
        const contribution = data[dateString] || 0;
        let contributionLevel = "";
        if (contribution === 0) {
          contributionLevel = <div className="square empty"></div>;
        } else if (contribution >= 1 && contribution <= 9) {
          contributionLevel = <div className="square level-1"></div>;
        } else if (contribution >= 10 && contribution <= 19) {
          contributionLevel = <div className="square level-2"></div>;
        } else if (contribution >= 20 && contribution <= 29) {
          contributionLevel = <div className="square level-3"></div>;
        } else {
          contributionLevel = <div className="square level-4"></div>;
        }

        weekData.push(<td key={dateString}>{contributionLevel}</td>);
      }
      tableRows.push(<tr key={i}>{weekData}</tr>);
    }

    return tableRows;
  };

  return (
    <div className="container">
      <div className="frame">
        <table>
          <thead>
            <tr>
              <th colSpan="2"></th>
              <td colSpan="4">Авг.</td>
              <td colSpan="4">Сен.</td>
              <td colSpan="4">Окт.</td>
              <td colSpan="4">Нов.</td>
              <td colSpan="4">Дек.</td>
              <td colSpan="4">Янв.</td>
              <td colSpan="4">Фев.</td>
              <td colSpan="4">Март</td>
              <td colSpan="4">Апр.</td>
              <td colSpan="4">Май</td>
              <td colSpan="4">Июnь</td>
              <td colSpan="4">Июль</td>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
