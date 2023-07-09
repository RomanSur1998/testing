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

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedContribution, setSelectedContribution] = useState(null);
  const [showDateContribution, setShowDateContribution] = useState(false);

  const renderTable = () => {
    const today = new Date();
    const daysInWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    const startDate = new Date(today.getTime() - 50 * 7 * 24 * 60 * 60 * 1000);
    const endDate = today;

    const tableRows = [];
    const currentDate = startDate;

    const handleCellClick = (dateString, contribution) => {
      setSelectedDate(dateString);
      setSelectedContribution(contribution);
      setShowDateContribution(true);
    };

    for (let i = 0; i < 7; i++) {
      const weekData = [];
      const weekStartDate = new Date(
        currentDate.getTime() + i * 24 * 60 * 60 * 1000
      );
      weekData.push(<td key={daysInWeek[i]}>{daysInWeek[i]}</td>);
      for (let j = 0; j < 51; j++) {
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

        weekData.push(
          <td
            key={dateString}
            onClick={() => handleCellClick(dateString, contribution)}
          >
            {contributionLevel}
          </td>
        );
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
              <th colSpan="4"></th>
              <td colSpan="4">Авг.</td>
              <td colSpan="4">Сен.</td>
              <td colSpan="4">Окт.</td>
              <td colSpan="4">Ноя.</td>
              <td colSpan="4">Дек.</td>
              <td colSpan="4">Янв.</td>
              <td colSpan="4">Фев.</td>
              <td colSpan="4">Мар.</td>
              <td colSpan="4">Апр.</td>
              <td colSpan="4">Май</td>
              <td colSpan="4">Июнь</td>
              <td colSpan="4">Июль</td>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
        <div className="ContributionContainer">
          <div className="ContributionLevelLine">
            <h5>Меньше</h5>
            <div className="square empty"></div>
            <div className="square level-1"></div>
            <div className="square level-2"></div>
            <div className="square level-3"></div>
            <div className="square level-4"></div>
            <h5>Больше</h5>
          </div>
        </div>
      </div>
      {showDateContribution && (
        <div className="DateContibution">
          <div className="TextContibution">
            {selectedContribution}:contribution
          </div>
          <div className="TextContibution">{selectedDate}</div>
        </div>
      )}
    </div>
  );
};

export default Table;
