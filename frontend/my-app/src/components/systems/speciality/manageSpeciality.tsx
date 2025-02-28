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
import {
  createSpeciality,
  getAllSpeciality,
  resetCreate,
  selectIsData,
  selectIsLoading,
  selectIsLoadingActions,
  selectResActions,
  updateSpeciality,
} from "../../../redux/reducer/reducer-speciality";
import TableSpeciality from "./tableSpeciality";
import { Ispeciality1 } from "../../../constants/interface";
import { CHOSE } from "../../../constants/path";
import { FaDeleteLeft } from "react-icons/fa6";
import ServiceSpeciality from "../../../services/service-speciality";
import { useSelector } from "react-redux";
import Identifier from "./model-indentify";
const mdParser = new MarkdownIt();
type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;
export interface Ispeciality {
  id?: number;
  name: string;
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
const ManageSpeciality = () => {
  const [inforSpeciality, setInforSpeciality] = useState<Ispeciality>({
    name: "",
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
    if (!inforSpeciality) return;
    let clone = _.cloneDeep(inforSpeciality);
    clone["contentHtml"] = html;
    clone["contentText"] = text;
    setInforSpeciality(clone);
  };
  const hanlderOnChange = async (
    event: React.ChangeEvent<FormControlElement>,
    type: string
  ) => {
    if (type == "images") {
      let clone = _.cloneDeep(inforSpeciality);
      const target = event.target as FormControlElement;
      if (target instanceof HTMLInputElement && target.type === "file") {
        if (!target.files) return;
        const tmp = target.files[0];
        const convertFileBase64 = await convertFileToBase64(tmp);
        setPreImg(convertFileBase64);
        clone[type] = tmp;
        setInforSpeciality(clone);
        return;
      }
    }
    let clone = _.cloneDeep(inforSpeciality);
    clone[type] = event.target.value;
    setInforSpeciality(clone);
  };
  const dispath = useAppDispatch();

  const handlerActions = (action: any, data?: Ispeciality1) => {
    if (data) {
      if (action == CHOSE.update) {
        setActions(action);
        const {
          createdAt,
          updatedAt,
          nameSpeciality,
          specialityDoctor,
          image,
          ...restObject
        } = data;
        setPreImg(data?.image);
        setInforSpeciality({ ...restObject, name: nameSpeciality });
        return;
      }
      setInforSpeciality({ ...inforSpeciality, id: data.id });
      setShow(true);
    }
  };
  const data = useAppSelector(selectIsData);
  const handlerChangerAction = () => {
    setInforSpeciality({
      name: "",
      contentHtml: "",
      contentText: "",
      images: null,
    });
    setPreImg(null);
    setActions(CHOSE.CREATE);
  };
  if (data.errCode == 0) {
    toast.success(data.message);
    setInforSpeciality({
      name: "",
      contentHtml: "",
      contentText: "",
      images: null,
    });
    setPreImg(null);
    dispath(resetCreate());
  }
  const load = useSelector(selectIsLoadingActions);
  const isLoading = useSelector(selectIsLoading);
  const selectResAction = useSelector(selectResActions);
  if (selectResAction?.errCode == 0) {
    toast.success(selectResAction.message);
    handlerChangerAction();
    dispath(resetCreate());
  }
  const hanldeOnclick = async (action?: string) => {
    if (action == CHOSE.update) {
      await dispath(
        updateSpeciality({
          ...inforSpeciality,
          action,
        })
      );

      await dispath(getAllSpeciality());
      return;
    } else if (action == CHOSE.delete) {
      await dispath(
        updateSpeciality({
          id: inforSpeciality.id,
          action,
        })
      );
      setShow(false);
      await dispath(getAllSpeciality());
      return;
    }
    await dispath(createSpeciality(inforSpeciality));
    await dispath(getAllSpeciality());
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
                    <Form.Label>Name Speciality</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name Speciality"
                      value={inforSpeciality?.name}
                      onChange={(event) => hanlderOnChange(event, "name")}
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
                  value={inforSpeciality.contentText}
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
              <TableSpeciality handlerActions={handlerActions} />
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
export default ManageSpeciality;
