import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { useState, CSSProperties } from "react";
import {
  getAllSpeciality,
  selectIsLoading,
  selectIsLoadingFetchAll,
  selectSpeciality,
} from "../../../redux/reducer/reducer-speciality";
import { RiPencilFill } from "react-icons/ri";
import { BsEraserFill } from "react-icons/bs";
import { SyncLoader } from "react-spinners";
import { CHOSE } from "../../../constants/path";
import { Iclinic1, Ispeciality1 } from "../../../constants/interface";
import {
  getAllClinic,
  selectClinic,
  selectIsLoadingFetchAllClinic,
} from "../../../redux/reducer/reducer-clinic";
const TableClinic = ({
  handlerActions,
}: {
  handlerActions: (action: any, item?: Iclinic1) => void;
}) => {
  const dispath = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoadingFetchAllClinic);
  const listClinic = useAppSelector(selectClinic);
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  useEffect(() => {
    dispath(getAllClinic());
  }, []);

  return (
    <>
      {isLoading ? (
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
      ) : (
        <>
          {" "}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Speciality Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listClinic &&
                listClinic?.data.length > 0 &&
                listClinic.data.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{item?.id}</td>
                        <td>{item?.nameClinic}</td>
                        <td className="action">
                          <span className="fix">
                            <RiPencilFill
                              onClick={() => handlerActions(CHOSE.update, item)}
                            />
                          </span>
                          <span className="erase">
                            <BsEraserFill
                              onClick={() => handlerActions(CHOSE.delete, item)}
                            />
                          </span>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default TableClinic;
