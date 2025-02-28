import _, { toSafeInteger } from "lodash";
import MarkdownIt from "markdown-it";
import { CSSProperties, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import MdEditor from "react-markdown-editor-lite";
import servicesSystem from "../../../services/system";
import { toast } from "react-toastify";
import { convertFileToBase64 } from "../../../util/convertBase64";
import Lightbox from "react-image-lightbox";
import { FaUpload } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { SyncLoader } from "react-spinners";
import TableSpeciality from "./table-Clinic";
import { Iclinic1, Ispeciality1 } from "../../../constants/interface";
import { CHOSE } from "../../../constants/path";
import { FaDeleteLeft } from "react-icons/fa6";
import ServiceSpeciality from "../../../services/service-speciality";
import { useSelector } from "react-redux";
import Identifier from "./model-Clinic";
import {
  createClinic,
  getAllClinic,
  resetCreate,
  selectIsDataClinic,
  selectIsLoading,
  selectIsLoadingActions,
  selectIsLoadingFetchAllClinic,
  selectResActions,
  updateClinic,
} from "../../../redux/reducer/reducer-clinic";
import TableClinic from "./table-Clinic";

const mdParser = new MarkdownIt();
type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;
export interface Iclinic {
  id?: number;
  nameClinic: string;
  contentHtml: string;
  contentText: string;
  images?: any;
  createdAt?: any;
  updatedAt?: any;
  [key: string]: string | number | File | undefined | null;
}
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const ManageClinic = () => {
  const [inforClinic, setInforClinic] = useState<Iclinic>({
    nameClinic: "",
    contentHtml: "",
    contentText: "",
  });
  const [actions, setActions] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const [preImg, setPreImg] = useState<any>();
  const [show, setShow] = useState(false);
  const handleEditorChangeIntro = ({
    html,
    text,
  }: {
    html: any;
    text: any;
  }) => {
    if (!inforClinic) return;
    let clone = _.cloneDeep(inforClinic);
    clone["contentHtml"] = html;
    clone["contentText"] = text;
    setInforClinic(clone);
  };
  const hanlderOnChange = async (
    event: React.ChangeEvent<FormControlElement>,
    type: string
  ) => {
    if (type == "images") {
      let clone = _.cloneDeep(inforClinic);
      const target = event.target as FormControlElement;
      if (target instanceof HTMLInputElement && target.type === "file") {
        if (!target.files) return;
        const tmp = target.files[0];
        const convertFileBase64 = await convertFileToBase64(tmp);
        setPreImg(convertFileBase64);
        clone[type] = tmp;
        setInforClinic(clone);
        return;
      }
    }
    let clone = _.cloneDeep(inforClinic);
    clone[type] = event.target.value;
    setInforClinic(clone);
  };
  const dispath = useAppDispatch();

  const handlerActions = (action: any, data?: Iclinic1) => {
    if (data) {
      if (action == CHOSE.update) {
        setActions(action);
        const {
          createdAt,
          updatedAt,
          nameClinic,
          clinicDoctor,
          image,
          ...restObject
        } = data;
        setPreImg(data?.image);
        setInforClinic({ ...restObject, nameClinic: data.nameClinic });
        return;
      }
      setInforClinic({ ...inforClinic, id: data.id });
      setShow(true);
    }
  };
  const data = useAppSelector(selectIsDataClinic);
  const handlerChangerAction = () => {
    setInforClinic({
      nameClinic: "",
      contentHtml: "",
      contentText: "",
      images: null,
    });
    setPreImg(null);
    setActions(CHOSE.CREATE);
  };
  if (data.errCode == 0) {
    toast.success(data.message);
    setInforClinic({
      nameClinic: "",
      contentHtml: "",
      contentText: "",
      images: null,
    });
    setPreImg(null);
    dispath(resetCreate());
  }
  const load = useSelector(selectIsLoadingActions);
  const isLoading = useSelector(selectIsLoading);
  // const isLoadingFtchALL = useAppSelector(selectIsLoadingFetchAllClinic);
  const selectResAction = useSelector(selectResActions);
  if (selectResAction?.errCode == 0) {
    toast.success(selectResAction.message);
    handlerChangerAction();
    dispath(resetCreate());
  }
  const hanldeOnclick = async (action?: string) => {
    if (action == CHOSE.update) {
      console.log(inforClinic);
      await dispath(
        updateClinic({
          ...inforClinic,
          action,
        })
      );

      await dispath(getAllClinic());
      return;
    } else if (action == CHOSE.delete) {
      await dispath(
        updateClinic({
          id: inforClinic.id,
          action,
        })
      );
      setShow(false);
      await dispath(getAllClinic());
      return;
    }

    await dispath(createClinic(inforClinic));
    await dispath(getAllClinic());
  };

  return (
    <>
      {!isLoading && !load ? (
        <>
          {" "}
          <div className="speciality-container">
            <div>
              <div className="row">
                <div className="col-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Name Clinic</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name Clinic"
                      value={inforClinic?.nameClinic}
                      onChange={(event) => hanlderOnChange(event, "nameClinic")}
                    />
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="file"
                      placeholder="Password"
                      onChange={(event) => hanlderOnChange(event, "images")}
                      hidden
                      id="img"
                    />
                    <div className="user-img">
                      <div className="img-input">
                        <label htmlFor="img">
                          <div className="label-img">Post Avata</div>
                          <FaUpload />
                        </label>
                      </div>
                      <div className="preview-img">
                        <div className="img">
                          {preImg ? (
                            <img
                              src={`${preImg}`}
                              onClick={() => setIsOpen(true)}
                            />
                          ) : (
                            <span className="alt-img">Your Img?</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div>
                <MdEditor
                  style={{ height: "200px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={handleEditorChangeIntro}
                  value={inforClinic.contentText}
                />
              </div>
              <div className="col-2 mt-2 speciality-submit ">
                {" "}
                {actions != CHOSE.update ? (
                  <>
                    <div>
                      <button
                        className="btn btn-primary"
                        onClick={() => hanldeOnclick()}
                      >
                        Submit
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="submit-right d-flex align-items-center gap-3">
                      <button
                        className="btn btn-dark"
                        onClick={() => hanldeOnclick(CHOSE.update)}
                      >
                        Edit
                      </button>
                      <FaDeleteLeft
                        style={{
                          cursor: "pointer",
                          color: "red",
                          width: "20px",
                          height: "20px",
                        }}
                        onClick={handlerChangerAction}
                      />
                    </div>
                  </>
                )}
              </div>
              {isOpen && (
                <Lightbox
                  mainSrc={`${preImg}`}
                  onCloseRequest={() => setIsOpen(false)}
                />
              )}
            </div>
            <div
              className="table-speciality"
              style={{ margin: "20px 0px 50px 0px" }}
            >
              <TableClinic handlerActions={handlerActions} />
            </div>
            <div style={{ visibility: "hidden" }}>.</div>
          </div>
          <Identifier
            show={show}
            setShow={setShow}
            hanldeOnclick={hanldeOnclick}
          />
        </>
      ) : (
        <>
          <div className="loading-data">
            <SyncLoader
              color={"#36d7b7"}
              loading={true}
              cssOverride={override}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </>
      )}
    </>
  );
};
export default ManageClinic;
