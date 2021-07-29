import React, { useState, useEffect } from "react";
import api from "../../api";
import { StartPage } from "../StartPage";
import { usePagination, useSearch } from "../../utils";
import { Pagination, TableOptions } from "../../components";

const AssessmentList = (props) => {
  const { path } = props.match;
  const [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const dispatch = useDispatch();
  const [perPage, setPerPage] = useState(10);

  const { filteredData, loading } = useSearch({
    searchQuery,
    retrieve: list,
  });

  const _DATA = usePagination(filteredData, perPage);

  const handleChange = (e, p) => {
    _DATA.jump(p);
  };

  const handlePerPageChange = (e) => {
    e.preventDefault();
    setPerPage(e.target.value);
    _DATA.jump(1);
  };

  const getListData = () => {
    api
      .get("/users/assessments")
      .then((res) => {
        let listData = res.data.assessments
          // .filter(({ isDeleted }) => isDeleted === false)
          .map(({ user: { firstName, lastName, ...user }, ...u }) => {
            return {
              select: false,
              id: u._id,
              user: {
                fullName: `${firstName || ""} ${lastName || ""}`,
                ...user,
              },
              ...u,
            };
          });
        return setList(listData);
      })
      .catch((err) => {
        console.log(err);
        return setList([]);
      });
  };

  useEffect(getListData, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  Date.prototype.getWeek = function () {
    return [new Date(this.setDate(this.getDate() - this.getDay()))].concat(
      String(Array(6))
        .split(",")
        .map(function () {
          return new Date(this.setDate(this.getDate() + 1));
        }, this)
    );
  };

  const check = () => {
    const currentWeek = new Date().getWeek();
    const aDate =
      list.length > 0 ? new Date(list[list.length - 1].createdDate) : null;
    if (!aDate) {
      return true;
    }
    const startDate = currentWeek[0];
    const endDate = currentWeek[6];

    return (
      aDate?.getTime() <= endDate.getTime() &&
      aDate?.getTime() >= startDate.getTime()
    );
  };

  return (
    <div className="container-fluid">
      <StartPage
        content="assessments"
        contents="assessments"
        contenttitle="Assessments"
      />
      {/* end page title */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <TableOptions
                path={path}
                perPage={perPage}
                handlePerPageChange={handlePerPageChange}
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                hideNewButton={check()}
                name="Assessment"
              />
              <div className="table-responsive">
                <table className="table align-middle table-nowrap">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Track</th>
                      <th>Correct answers</th>
                      <th>Total questions</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={8} align="center">
                          Loading...
                        </td>
                      </tr>
                    ) : _DATA.currentData() &&
                      _DATA.currentData().length <= 0 ? (
                      <tr>
                        <td colSpan={8} align="center">
                          No Data Found
                        </td>
                      </tr>
                    ) : (
                      _DATA.currentData().map(
                        (
                          {
                            _id: id,
                            user,
                            track,
                            result,

                            isDeleted = false,
                            select,
                          },
                          i
                        ) => {
                          return (
                            <tr key={i}>
                              <td>{user?.fullName}</td>
                              <td>{track?.name}</td>
                              <td>{result?.correctAnswers}</td>
                              <td>{result?.totalQuestions}</td>
                              <td>{result.status ? result.status : result}</td>
                            </tr>
                          );
                        }
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <ul className="pagination pagination-rounded justify-content-between mb-2">
                <div className="d-flex align-items-center">
                  {_DATA.entries()}
                </div>
                <Pagination
                  count={_DATA.maxPage}
                  page={_DATA.currentPage}
                  onChange={handleChange}
                />
              </ul>
            </div>
          </div>
        </div>

        {/* end row */}
      </div>
    </div>
  );
};

export default AssessmentList;
