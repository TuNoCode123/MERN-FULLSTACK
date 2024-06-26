import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FaUpload } from "react-icons/fa";
import "./system.scss";
import { useEffect, useState } from "react";
import {
  b64toBlob,
  convertFileToBase64,
  generateImageFromBuffer,
} from "../../util/convertBase64";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { banner } from "./systemLanguge";
import { FormattedMessage } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { selectLanguage } from "../../redux/reducer/reducer-login";
import servicesSystem from "../../services/system";
import { CHOSE, allcode } from "../../constants/path";
import { TiDelete } from "react-icons/ti";
import {
  IallCode,
  IallCode1,
  IallCodeData,
  Iuser,
} from "../../constants/interface";
import { Buffer } from "buffer";
import TableUser from "./admin/tableUser";
import {
  getListUsers,
  selectIsLoading,
  selectListUser,
} from "../../redux/reducer/reducer-excuteUser";
import { toast } from "react-toastify";
import Identifier from "./admin/model-indentify";
const ManageUser = () => {
  const [preImg, setPreImg] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<Partial<Iuser<string>>>();
  const [choseUsers, setChoseUser] = useState<Iuser<string>>();
  const currentLanguage = useAppSelector(selectLanguage);
  // const isLoading = useAppSelector(selectIsLoading);
  // const listUser = useAppSelector(selectListUser);
  const [preList, setPreList] = useState<Partial<Iuser<String>[]>>();
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>(CHOSE.CREATE);
  const [rpLanguage, setRpLanguage] = useState<IallCode<IallCodeData>[]>([]);
  const dispath = useAppDispatch();
  const getUserViaTypes = async () => {
    const rsGender = servicesSystem.getUserViaType(allcode.gender);
    const rsPositon = servicesSystem.getUserViaType(allcode.position);
    const rsRole = servicesSystem.getUserViaType(allcode.role);
    const results: any = await Promise.all([rsGender, rsPositon, rsRole]);
    setRpLanguage(results);
  };
  useEffect(() => {
    getUserViaTypes();
  }, [currentLanguage]);
  const handlerOnchangerImg = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event && event.target && event.target.files != null) {
      const file = event.target.files[0];
      const Base64file: any = await convertFileToBase64(file);
      setUser({ ...user, image: Base64file });
      setPreImg(Base64file);
    }
  };
  const hanlderConvertInitial = () => {
    setUser({
      email: "",
      passWord: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender:
        currentLanguage == "en"
          ? rpLanguage[0]?.data[0]?.valueEn
          : rpLanguage[0]?.data[0]?.valueVi,
    });
    setAction(CHOSE.CREATE);
    setPreImg(false);
  };
  const createOrEditOrDeleteUser = async (
    type?: String,
    userTable?: Iuser<string>
  ) => {
    if (type == CHOSE.CREATE) {
      console.log(user);
      if (!user) return toast.error("empty input");
      if (!user.email || !user.passWord) {
        return toast.error("empty email or passWord");
      }
      const response = await servicesSystem.createUswer(user);
      if (response.errCode == 0) {
        toast.success(response.message);
        setUser({
          email: "",
          passWord: "",
          firstName: "",
          lastName: "",
          address: "",
          phoneNumber: "",
          gender:
            currentLanguage == "en"
              ? rpLanguage[0]?.data[0]?.valueEn
              : rpLanguage[0]?.data[0]?.valueVi,
          image: "",
          roleId:
            currentLanguage == "en"
              ? rpLanguage[1]?.data[0]?.valueEn
              : rpLanguage[1]?.data[0]?.valueVi,
          positionId:
            currentLanguage == "en"
              ? rpLanguage[2]?.data[0]?.valueEn
              : rpLanguage[2]?.data[0]?.valueVi,
          // spectialId?: string;
        });
        setPreImg(false);
      }
      dispath(getListUsers());
    }
    if (type == CHOSE.EDIT) {
      setAction(CHOSE.EDIT);

      const image = userTable?.image;
      if (image) {
        const imageBase64 = Buffer.from(image, "base64").toString("binary");
        setPreImg(imageBase64);
        setUser({ ...userTable, image: imageBase64 });
        return;
      }
      setUser({ ...userTable });
    }
    if (type == CHOSE.PERFORM_EDIT) {
      if (!user) return toast.error("empty input");
      if (!user.email) {
        return toast.error("empty email");
      }
      const response = await servicesSystem.update(user);
      if (response.errCode == 0) {
        toast.success(` Edit ${response.message}`);
      }
      dispath(getListUsers());
      hanlderConvertInitial();
    }
    if (type == CHOSE.DELETE) {
      if (userTable) {
        const { id } = userTable;
        if (id) {
          const response = await servicesSystem.delete(id);
          if (response.errCode == 0) {
            toast.success(`Delete / ${userTable.email} /${response.message}`);
          }
          dispath(getListUsers());
        }
      }
      setShow(false);
    }
  };
  const chooseUser = (userTable?: Iuser<string>) => {
    setChoseUser(userTable);
    setShow(true);
  };

  return (
    <div className="user-container">
      <div className="user-content">
        <div className="user-title">Manage Users</div>
        <Form>
          <Row className="mb-3">
            <Form.Group className="mb-3 col-3" controlId="formGridEmail">
              <Form.Label>
                <FormattedMessage id={banner.form.input1} />
              </Form.Label>
              <Form.Control
                type="email"
                placeholder={
                  action == CHOSE.EDIT ? `${user?.email}` : "Enter email"
                }
                disabled={action == CHOSE.EDIT ? true : false}
                value={user?.email}
                onChange={(event) =>
                  setUser({ ...user, email: event.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3 col-3" controlId="formGridPassword">
              <Form.Label>
                <FormattedMessage id={banner.form.input2} />
              </Form.Label>
              <Form.Control
                type="password"
                placeholder={action == CHOSE.EDIT ? `Don't Edit` : "passWord"}
                value={user?.passWord}
                onChange={(event) =>
                  setUser({ ...user, passWord: event.target.value })
                }
                disabled={action == CHOSE.EDIT ? true : false}
              />
            </Form.Group>

            <Form.Group className="mb-3 col-3" controlId="formGridAddress1">
              <Form.Label>
                <FormattedMessage id={banner.form.input3} />
              </Form.Label>
              <Form.Control
                placeholder="First Name"
                value={user?.firstName}
                onChange={(event) =>
                  setUser({ ...user, firstName: event.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3 col-3" controlId="formGridAddress2fdas">
              <Form.Label>
                <FormattedMessage id={banner.form.input4} />
              </Form.Label>
              <Form.Control
                placeholder="Last Name"
                value={user?.lastName}
                onChange={(event) =>
                  setUser({ ...user, lastName: event.target.value })
                }
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group
              className="mb-3 col-3"
              controlId="formGridAddress1fdsaf"
            >
              <Form.Label>
                <FormattedMessage id={banner.form.input5} />
              </Form.Label>
              <Form.Control
                placeholder="Phone Number"
                value={user?.phoneNumber}
                onChange={(event) =>
                  setUser({ ...user, phoneNumber: event.target.value })
                }
              />
            </Form.Group>

            <Form.Group
              className="mb-3 col-9"
              controlId="formGridAddress2fasdf"
            >
              <Form.Label>
                <FormattedMessage id={banner.form.input6} />
              </Form.Label>
              <Form.Control
                placeholder="Apartment, studio, or floor"
                value={user?.address}
                onChange={(event) =>
                  setUser({ ...user, address: event.target.value })
                }
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group className="col-3" controlId="formGridCity">
              <Form.Label>
                <FormattedMessage id={banner.form.input7} />
              </Form.Label>
              <Form.Select
                value={user?.gender}
                onChange={(event) =>
                  setUser({ ...user, gender: event.target.value })
                }
              >
                {currentLanguage == "en" ? (
                  <>
                    {rpLanguage &&
                      rpLanguage.length > 0 &&
                      rpLanguage[0]?.data?.map((item, index) => {
                        return (
                          <>
                            <option key={index} value={item.key}>
                              {item.valueEn}
                            </option>
                          </>
                        );
                      })}
                  </>
                ) : (
                  <>
                    {rpLanguage &&
                      rpLanguage.length > 0 &&
                      rpLanguage[0].data?.map((item, index) => {
                        return (
                          <>
                            <option key={index} value={item.key}>
                              {item.valueVi}
                            </option>
                          </>
                        );
                      })}
                  </>
                )}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>
                <FormattedMessage id={banner.form.input8} />
              </Form.Label>
              <Form.Select
                defaultValue={
                  rpLanguage && rpLanguage.length > 0
                    ? rpLanguage[1]?.data[1].key
                    : ""
                }
                value={user?.positionId}
                onChange={(event) =>
                  setUser({ ...user, positionId: event.target.value })
                }
              >
                {currentLanguage == "en" ? (
                  <>
                    {rpLanguage &&
                      rpLanguage.length > 0 &&
                      rpLanguage[1]?.data?.map((item, index) => {
                        return (
                          <>
                            <option key={index} value={item.key}>
                              {item.valueEn}
                            </option>
                          </>
                        );
                      })}
                  </>
                ) : (
                  <>
                    {rpLanguage &&
                      rpLanguage.length > 0 &&
                      rpLanguage[1].data?.map((item, index) => {
                        return (
                          <>
                            <option key={index} value={item.key}>
                              {item.valueVi}
                            </option>
                          </>
                        );
                      })}
                  </>
                )}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>
                <FormattedMessage id={banner.form.input12} />
              </Form.Label>
              <Form.Select
                defaultValue={
                  rpLanguage && rpLanguage.length > 0
                    ? rpLanguage[2]?.data[1].key
                    : ""
                }
                value={user?.roleId}
                onChange={(event) =>
                  setUser({ ...user, roleId: event.target.value })
                }
              >
                {currentLanguage == "en" ? (
                  <>
                    {rpLanguage &&
                      rpLanguage.length > 0 &&
                      rpLanguage[2]?.data?.map((item, index) => {
                        return (
                          <>
                            <option key={index} value={item.key}>
                              {item.valueEn}
                            </option>
                          </>
                        );
                      })}
                  </>
                ) : (
                  <>
                    {rpLanguage &&
                      rpLanguage.length > 0 &&
                      rpLanguage[2].data?.map((item, index) => {
                        return (
                          <>
                            <option key={index} value={item.key}>
                              {item.valueVi}
                            </option>
                          </>
                        );
                      })}
                  </>
                )}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>
                <FormattedMessage id={banner.form.input9} />
              </Form.Label>
              <Form.Control
                type="file"
                id="file"
                hidden
                onChange={handlerOnchangerImg}
              />
              <div className="user-img">
                <div className="img-input">
                  <label htmlFor="file">
                    <div className="label-img">Post Avata</div>
                    <FaUpload />
                  </label>
                </div>
                <div className="preview-img">
                  <div className="img">
                    {preImg ? (
                      <img src={`${preImg}`} onClick={() => setIsOpen(true)} />
                    ) : (
                      <span className="alt-img">Your Img?</span>
                    )}
                  </div>
                </div>
              </div>
            </Form.Group>
          </Row>
          <Row className="user-submit">
            <Button
              variant={action == CHOSE.CREATE ? "primary" : "dark"}
              type="button"
              onClick={() =>
                action == CHOSE.CREATE
                  ? createOrEditOrDeleteUser(CHOSE.CREATE)
                  : createOrEditOrDeleteUser(CHOSE.PERFORM_EDIT)
              }
              className="col-1"
            >
              <FormattedMessage
                id={
                  action == CHOSE.CREATE
                    ? banner.form.input10
                    : banner.form.input11
                }
              />
            </Button>

            {action == CHOSE.EDIT ? (
              <>
                <div className="col-1 dl">
                  <TiDelete
                    title="Delete Edit"
                    onClick={hanlderConvertInitial}
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </Row>
        </Form>
        <div className="user-table col-12 mt-3">
          <TableUser
            show={show}
            setShow={setShow}
            createOrEditOrDeleteUser={createOrEditOrDeleteUser}
            choseUser={chooseUser}
          />
        </div>
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={`${preImg}`}
          onCloseRequest={() => setIsOpen(false)}
        />
      )}
      <Identifier
        createOrEditOrDeleteUser={createOrEditOrDeleteUser}
        show={show}
        setShow={setShow}
        choseUsers={choseUsers}
      />
    </div>
  );
};
export default ManageUser;
