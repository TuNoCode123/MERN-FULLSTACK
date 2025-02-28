import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { allcode, typeDoctorInfor } from "../../../../constants/path";
import servicesSystem from "../../../../services/system";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../redux/hook";
import { selectLanguage } from "../../../../redux/reducer/reducer-login";
import { ParSerToDataSelect } from "../../../../util/cloneObject";
import Select, { SingleValue } from "react-select";
import { IOptions1 } from "../../../systems/doctor";
import _ from "lodash";
type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;
export interface Ibooking {
  doctorId: number | undefined;
  date: string | undefined;
  timeType: string | undefined;
}
export interface User {
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  address: string;
  genderName: string;
}
export interface IdataBookng extends User {
  inforBooking: Ibooking;
  inforDoctor: {
    fullName: string | undefined;
    position: string | undefined;
    id: any;
  };
  calender: {
    time: string;
  };
  language: string;
}
const BodyModal = ({
  handlerSubmit,
}: {
  handlerSubmit: (data: User) => void;
}) => {
  const language = useAppSelector(selectLanguage);
  const [option, setOption] = useState<IOptions1[]>();
  const [selected, setSelected] = useState<IOptions1 | null>(null);
  const [user, setUser] = useState<User>({
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    address: "",
    genderName: "",
  });
  const hanlderChangeSelect = (option: IOptions1 | null) => {
    if (option?.value && option?.label) {
      const clone = _.cloneDeep(user);
      setUser({ ...clone, gender: option?.value, genderName: option.label });
    }
    setSelected(option);
  };
  const hanlderOnchange = (
    event: React.ChangeEvent<FormControlElement>,
    type: keyof User
  ) => {
    const clone = _.cloneDeep(user);
    clone[type] = event.target.value;
    setUser(clone);
  };
  const getGenders = async () => {
    const res = await servicesSystem.getUserViaType(allcode.gender);
    const tmp = ParSerToDataSelect(res, typeDoctorInfor.PROVINCE, language);
    setOption(tmp);
  };
  useEffect(() => {
    getGenders();
  }, [language]);
  return (
    <>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={user.email}
              onChange={(event) => hanlderOnchange(event, "email")}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter FirstName"
              value={user.firstName}
              onChange={(event) => hanlderOnchange(event, "firstName")}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter LastName"
              value={user.lastName}
              onChange={(event) => hanlderOnchange(event, "lastName")}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter PhoneNumber"
              value={user.phoneNumber}
              onChange={(event) => hanlderOnchange(event, "phoneNumber")}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Genders</Form.Label>

            <Select
              value={selected}
              placeholder="Select Gender ...."
              onChange={hanlderChangeSelect}
              options={option}
              // name={typeDoctorInfor.PRICE}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              placeholder="1234 Main St"
              value={user.address}
              onChange={(event) => hanlderOnchange(event, "address")}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="col-4">
            <button
              className="btn btn-primary"
              onClick={() => handlerSubmit(user)}
              type="button"
            >
              XÁC NHẬN ĐẶT LỊCH
            </button>
          </Form.Group>
        </Row>
      </Form>
    </>
  );
};

export default BodyModal;
