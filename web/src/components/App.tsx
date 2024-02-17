import React, { useState } from "react";
import "./App.css";
import { debugData } from "../utils/debugData";
import { useNuiEvent } from "../hooks/useNuiEvent";
import Alert from "./Alert";

debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

interface ReturnData {
  label: string;
  code: string;
  id: string;
  road: string;
  priority: string;
}

interface AlertData extends ReturnData { // i cannot find the stackoverflow forum where i found this snippet :C
  time: number;
  visible: boolean;
}

const App: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  useNuiEvent<ReturnData>('showNotification', (data) => {
    const newAlert: AlertData = {
      time: new Date().getTime(),
      visible: true,
      label: data.label,
      road: data.road,
      id: data.id,
      code: data.code,
      priority: data.priority,
    };

    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

    setTimeout(() => {
      setAlerts((prevAlerts) => {
        const index = prevAlerts.findIndex((alert) => alert.time === newAlert.time);
        if (index !== -1) {
          const updatedAlerts = [...prevAlerts];
          updatedAlerts[index].visible = false;
          return updatedAlerts;
        }
        return prevAlerts;
      });
    }, 15000);
  });

  return (
    <div className="nui-wrapper">
      {alerts.map((alert) => (
        alert.visible && <Alert {...alert} key={alert.time} />
      ))}
    </div>
  );
};

export default App;
