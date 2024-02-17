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

const App: React.FC = () => {
  const [alerts, setAlerts] = useState([]);
  const [customLabel, setCustomLabel] = useState("");
  const [customRoad, setCustomRoad] = useState("");
  const [customId, setCustomId] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [customPriority, setCustomPriority] = useState("");
  const [formData, setFormData] = useState({
    road: 'JOHN',
    label: 'DOE',
    id: '01/01/1990',
    code: 'M',
    priority: '01/01/2025'
  });

  const handleAlertButtonClick = () => {
    const newAlert = {
      time: new Date().getTime(),
      visible: true,
      label: customLabel,
      road: customRoad,
      id: customId,
      code: customCode,
      priority: customPriority,
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
    }, 1000);
  };

  useNuiEvent<ReturnData>('showNotification', (data) => {
    setFormData((prevData: ReturnData) => {
      const updatedData: ReturnData = { ...prevData };
      for (const key in data) {
        if (data.hasOwnProperty(key) && key in updatedData) {
          updatedData[key as keyof ReturnData] = data[key as keyof ReturnData] || ''; // https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
        }
      }
      return updatedData;
    });
    const newAlert = {
      time: new Date().getTime(),
      visible: true,
      label: formData.label,
      road: formData.road,
      id: formData.id,
      code: formData.code,
      priority: formData.priority,
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
    }, 1000);
  });

  return (
    <div className="nui-wrapper">
      <div>
        <label>
          Label:
          <input type="text" value={customLabel} onChange={(e) => setCustomLabel(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Road:
          <input type="text" value={customRoad} onChange={(e) => setCustomRoad(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          ID:
          <input type="text" value={customId} onChange={(e) => setCustomId(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Code:
          <input type="text" value={customCode} onChange={(e) => setCustomCode(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Priority:
          <input type="text" value={customPriority} onChange={(e) => setCustomPriority(e.target.value)} />
        </label>
      </div>
      <button onClick={handleAlertButtonClick}>Show Custom Alert</button>
      {alerts.map((alert) => (
        alert.visible && <Alert {...alert} key={alert.time} />
      ))}
    </div>
  );
};

export default App;
