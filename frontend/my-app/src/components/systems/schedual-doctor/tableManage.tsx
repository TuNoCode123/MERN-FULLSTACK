import Table from "react-bootstrap/Table";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { useEffect } from "react";
import {
  selectLanguage,
  selectUserInfor,
} from "../../../redux/reducer/reducer-login";
import servicesSystem from "../../../services/system";
import {
  getAllSchedualPatient,
  IlistPatient,
  selectListDoctorSystem,
  selectListPatient,
} from "../../../redux/reducer/reducer-excuteUser";
import { languages } from "../../../constants/languages";
import { CHOSE } from "../../../constants/path";
import { toast } from "react-toastify";

function TableManage() {
  const dispath = useAppDispatch();
  const doctorLogin = useAppSelector(selectUserInfor);
  const listPatient = useAppSelector(selectListPatient);
  const language = useAppSelector(selectLanguage);

  const hanlderOnclick = async (item: IlistPatient, type: string) => {
    const data = {
      date: item.date,
      doctorId: item.doctorId,
      patientId: item.patientId,
    };
    const res = await servicesSystem.confirmTreatedForPatient(data, type);
    if (res.errCode == 0) {
      toast.success(res.message);
      dispath(getAllSchedualPatient(doctorLogin?.data.id));
    }
  };
  useEffect(() => {
    dispath(getAllSchedualPatient(doctorLogin?.data.id));
  }, []);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Number</th>
          <th>Gender</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {listPatient &&
          listPatient.data.length > 0 &&
          listPatient.data.map((item, index) => {
            return (
              <>
                {" "}
                <tr key={index}>
                  <td>{item.doctorBooking.email}</td>
                  <td>{item.doctorBooking.firstName}</td>
                  <td>{item.doctorBooking.lastName}</td>
                  <td>{item.doctorBooking.phoneNumber}</td>
                  <td>
                    {language == languages.vi
                      ? item.doctorBooking.genderAllcode.valueVi
                      : item.doctorBooking.genderAllcode.valueEn}
                  </td>
                  <td className="d-flex gap-3">
                    <button
                      className="btn btn-warning"
                      onClick={() => hanlderOnclick(item, CHOSE.delete)}
                    >
                      Hủy Lịch
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => hanlderOnclick(item, CHOSE.CONFIRM)}
                    >
                      Khám Xong
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
      </tbody>
    </Table>
  );
}

export default TableManage;
