import { FormattedMessage } from "react-intl";
import "./moreInfor.scss";
const MoreInfor = ({ id }: { id: string }) => {
  return (
    <>
      <div className="title2-content">
        <div className="t2-child1">
          {" "}
          <FormattedMessage id={id} />
        </div>
        <div className="t2-child2">
          <FormattedMessage id={"main.anymore"} />
        </div>
      </div>
    </>
  );
};
export default MoreInfor;
