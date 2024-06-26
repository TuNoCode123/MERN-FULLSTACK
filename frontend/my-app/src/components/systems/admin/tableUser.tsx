import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  getListUsers,
  selectIsLoading,
  selectListUser,
} from "../../../redux/reducer/reducer-excuteUser";
import { RiPencilFill } from "react-icons/ri";
import { BsEraserFill } from "react-icons/bs";
import "./tableUser.scss";
import { CHOSE } from "../../../constants/path";
import { Iuser } from "../../../constants/interface";
import ClipLoader from "react-spinners/ClipLoader";
import { useState, CSSProperties } from "react";
import { SyncLoader } from "react-spinners";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const TableUser = ({
  createOrEditOrDeleteUser,
  show,
  setShow,
  choseUser,
}: {
  createOrEditOrDeleteUser: (
    type?: String,
    user?: Iuser<string>,
    index?: number
  ) => void;
  choseUser: (user?: Iuser<string>) => void;
  setShow: React.SetStateAction<any>;
  show: boolean;
}) => {
  const dispath = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  useEffect(() => {
    dispath(getListUsers());
  }, []);
  const listUser = useAppSelector(selectListUser);
  return (
    <>
      {" "}
      {isLoading == true ? (
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
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listUser &&
              listUser.length > 0 &&
              listUser.map((item, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{item?.email}</td>
                      <td>{item?.firstName}</td>
                      <td>{item?.lastName}</td>
                      <td>{item?.address}</td>
                      <td className="action">
                        <span className="fix">
                          <RiPencilFill
                            onClick={() =>
                              createOrEditOrDeleteUser(CHOSE.EDIT, item)
                            }
                          />
                        </span>
                        <span className="erase">
                          <BsEraserFill
                            onClick={() =>
                              // createOrEditOrDeleteUser(CHOSE.DELETE, item)
                              choseUser(item)
                            }
                          />
                        </span>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </Table>
      )}
    </>
  );
};
export default TableUser;
