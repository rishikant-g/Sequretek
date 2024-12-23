import { Link, useParams } from "react-router-dom";
import { useSingleUser } from "../common/services/useSingleUser";
import { URLS } from "../common/constants/urls";
import { Card, ListGroup } from "react-bootstrap";
import { SmallLoader } from "../components/common/Loader";

const User: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useSingleUser(URLS.SINGLE_USER, id, {
    retry: false,
  });
  console.log("data", data);

  return (
    <div className="d-flex align-item-center justify-content-center p-5">
      {isLoading ? (
        <SmallLoader />
      ) : Object.keys(data?.data || {})?.length ? (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={data?.data?.avatar} />
          <Card.Body>
            <Card.Title>{data?.data?.first_name}</Card.Title>
            <Card.Text>{data?.data?.last_name}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>{data?.data?.email}</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Link to="/users">Back</Link>
          </Card.Body>
        </Card>
      ) : (
        <>
          No user found! &nbsp;&nbsp;
          <Link to="/users">Back</Link>
        </>
      )}
    </div>
  );
};
export default User;
