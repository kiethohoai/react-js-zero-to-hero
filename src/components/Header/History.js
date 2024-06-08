import { useEffect, useState } from "react";
import { getHistory } from "../../services/apiService";

const History = (props) => {
  const [dataHistory, setDataHistory] = useState([]);

  useEffect(() => {
    handleTabHistory();
  }, []);

  const handleTabHistory = async () => {
    // alert("ME");
    let res = await getHistory();
    if (res && res.EC === 0) {
      setDataHistory(res.DT.data);
    }
  };

  return (
    <>
      <table className="table table-striped table-borderless">
        <thead>
          <tr>
            <th className="text-center">Order</th>
            <th className="text-center">Quiz History</th>

            <th className="text-center">QuizId</th>
            <th className="text-center">UserID</th>

            <th className="text-center">Total Question</th>
            <th className="text-center">Total Correct</th>
          </tr>
        </thead>
        <tbody>
          {dataHistory &&
            dataHistory.length > 0 &&
            dataHistory.map((item, index) => {
              return (
                <tr key={`his-${index}`}>
                  <td className="text-center">{item.id}</td>
                  <td>
                    {item.quizHistory.id} - {item.quizHistory.name} <br />
                    {item.quizHistory.description}
                  </td>
                  <td className="text-center">{item.quiz_id}</td>
                  <td className="text-center">{item.participant_id}</td>

                  <td className="text-center">{item.total_questions}</td>
                  <td className="text-center">{item.total_correct}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default History;
