import MarkdownIt from "markdown-it";
import { useEffect, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import Select from "react-select";
import "./doctor.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  fetchAllDoctor,
  fetchAllDoctorSystem,
  selectListDoctor,
  selectListDoctorSystem,
} from "../../redux/reducer/reducer-excuteUser";
import { cloneToRenderList } from "../../util/cloneObject";
const mdParser = new MarkdownIt();
const Doctor = () => {
  const listDoctor = useAppSelector(selectListDoctorSystem);
  const dispath = useAppDispatch();
  const [contentHtml, setContentHtml] = useState<string>("");
  const [contentText, setContentText] = useState<string>("");
  const [contentIntro, setContentIntro] = useState<string>("");
  const options =
    listDoctor && listDoctor.rows.length > 0
      ? cloneToRenderList(listDoctor.rows)
      : [{ value: -1, label: "" }];
  const [selectedOption, setSelectedOption] = useState<{
    value: number | undefined;
    label: string | undefined;
  } | null>();
  const handleEditorChange = ({ html, text }: { html: any; text: any }) => {
    setContentHtml(html);
    setContentText(text);
  };

  const handleSubmitAddInforDoctor = () => {
    console.log(contentHtml, contentText, contentIntro, selectedOption?.value);
  };
  useEffect(() => {
    dispath(fetchAllDoctorSystem());
  }, []);
  return (
    <>
      <div className="d-container">
        <div className="d-tittle">Create Information Doctor</div>
        <div className="d-content">
          <div className="d-content-left">
            <Select
              placeholder="Select Doctor ...."
              onChange={setSelectedOption}
              options={options}
            />
          </div>
          <div className="d-content-right">
            <textarea
              name="postContent"
              rows={5}
              cols={80}
              placeholder="Enter Introduce Doctor ..."
              className="form-control"
              value={contentIntro}
              onChange={(event) => setContentIntro(event.target.value)}
            />
          </div>
        </div>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
        <button
          className="btn btn-primary mt-3 mb-3"
          onClick={handleSubmitAddInforDoctor}
        >
          Submit
        </button>
      </div>
    </>
  );
};
export default Doctor;
