import "./patentSchedualManage.scss";
import TableManage from "./tableManage";
const PatientSchedualManage = () => {
  return (
    <div className="manage-container">
      <div className="manage-header">Patient Schedual Manager</div>
      <div className="manage-table">
        <TableManage />
      </div>
    </div>
  );
};
export default PatientSchedualManage;
