import "./DashBoard.scss";
import React, { PureComponent, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getOverview } from "../../../services/apiService";

const DashBoard = (props) => {
  const [dataOverView, setDataOverView] = useState([]);

  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetchDataOverView();
  }, []);

  const fetchDataOverView = async () => {
    let res = await getOverview();
    if (res && res.EC === 0) {
      setDataOverView(res.DT);
      // process dataChart
      let Qz = 0;
      let Qs = 0;
      let As = 0;

      Qz = res?.DT?.others?.countQuiz ?? 0;
      Qs = res?.DT?.others?.countQuestions ?? 0;
      As = res?.DT?.others?.countAnswers ?? 0;

      const data = [
        {
          name: "Quizzes",
          Qz: Qz,
        },
        {
          name: "Question",
          Qs: Qs,
        },
        {
          name: "Answers",
          As: As,
        },
      ];

      setDataChart(data);
    }
  };
  return (
    <div className="dashboard-container">
      <div className="title">Analytics DashBoard</div>
      <div className="content">
        {/* content-left */}
        <div className="content-left">
          <div className="left-child">
            <span className="text-1">Total Users</span>
            <span className="text-2">
              {dataOverView && dataOverView.users && dataOverView.users.total
                ? dataOverView.users.total
                : 0}
            </span>
          </div>
          <div className="left-child">
            <span className="text-1"> Total Quizzes</span>
            <span className="text-2">
              {dataOverView && dataOverView.others && dataOverView.others.countQuiz
                ? dataOverView.others.countQuiz
                : 0}
            </span>
          </div>
          <div className="left-child">
            <span className="text-1"> Total Questions</span>
            <span className="text-2">
              {dataOverView && dataOverView.others && dataOverView.others.countQuestions
                ? dataOverView.others.countQuestions
                : 0}
            </span>
          </div>
          <div className="left-child">
            <span className="text-1">Total Answers</span>
            <span className="text-2">
              {dataOverView && dataOverView.others && dataOverView.others.countAnswers
                ? dataOverView.others.countAnswers
                : 0}
            </span>
          </div>
        </div>
        {/* content-right */}
        <div className="content-right">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={dataChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              {/* <YAxis /> */}
              <Tooltip />
              <Legend />
              <Bar
                dataKey="Qz"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="Qs"
                fill="#d70e0e"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="As"
                fill="#82ca9d"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
