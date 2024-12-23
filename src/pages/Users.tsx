import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { URLS } from "../common/constants/urls";
import { CREATE_SINGLE_REQUEST, useUsers } from "../common/services/useUsers";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import UserModal from "../components/modal/UserModal";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useDeleteUser } from "../common/services/useSingleUser";
import { queryClient } from "../common/services/queryClient";
import Toast from "../components/common/Toast";

const User: React.FC = () => {
  const columns = [
    {
      name: "Email",
      selector: (row: any) => row.email,
      sortable: true,
    },
    {
      name: "First name",
      selector: (row: any) => row.first_name,
      sortable: true,
    },
    {
      name: "Last name",
      selector: (row: any) => row.last_name,
      sortable: true,
    },
    {
      name: "Avatar",
      selector: (row: any) => (
        <img src={row.avatar} style={{ width: "50px", height: "50px" }} />
      ),
      sortable: false,
    },
    {
      cell: (row: any) => <Link to={`/user/${row.id}`}>View</Link>,
    },
    {
      cell: (row: any) => (
        <span
          onClick={() => {
            setSelectedUser(row);
            setIsEdit(true);
            setShowModal(true);
          }}
        >
          <BsFillPencilFill />
        </span>
      ),
    },
    {
      cell: (row: any) => (
        <span
          className="m-1"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setDeleteId(row.id);
            mutateDelete({ id: row.id });
          }}
        >
          <BsFillTrashFill />
        </span>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [selectedUser, setSelectedUser] = useState<any>({});

  const [deleteId, setDeleteId] = useState<number>();

  const { mutate: mutateDelete, isSuccess: isDeleted } = useDeleteUser(
    URLS.DELETE_USER + `/${deleteId}`,
  );

  const handleClose = () => {
    setShowModal(false);
    setIsEdit(false);
    setSelectedUser({} as CREATE_SINGLE_REQUEST);
  };

  const {
    data: userApiData,
    isSuccess,
    isFetching: isFetching,
  } = useUsers(URLS.USERS, pageNo, recordPerPage);

  useEffect(() => {
    if (userApiData?.data) {
      setData(userApiData.data);
      setTotalRows(userApiData.total);
    }
  }, [isSuccess, userApiData, isFetching]);

  useEffect(() => {
    if (isDeleted) {
      Toast("User deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["USERS"] });
    }
  }, [isDeleted]);

  const handlePageChange = (page: number) => {
    setPageNo(page);
  };

  const handlePerRowsChange = (
    numberOfRecordPerPage: number,
    pageNumber: number,
  ) => {
    setRecordPerPage(numberOfRecordPerPage);
    setPageNo(pageNumber);
  };

  return (
    <>
      {showModal && (
        <UserModal
          show={showModal}
          onHide={handleClose}
          title={"User"}
          isEdit={isEdit}
          selectedUser={selectedUser}
          userId={selectedUser.id}
        />
      )}
      <div style={{ width: "70%", margin: "20px auto" }}>
        <div className="d-flex justify-content-between">
          <h2>Users</h2>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add User
          </Button>
        </div>
        <DataTable
          columns={columns}
          data={data}
          progressPending={isFetching}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          paginationPerPage={recordPerPage}
          highlightOnHover
        />
      </div>
    </>
  );
};

export default User;
