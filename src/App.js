import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetData } from "./components/GetData/GetData";
import Contribution from "./components/Contribution/Contribution";
import Table from "./components/Table";

const App = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  console.log("data", data);

  useEffect(() => {
    GetData(dispatch);
  }, []);

  return (
    <div>
      <Contribution />
      {/* <Table /> */}
    </div>
  );
};

export default App;
