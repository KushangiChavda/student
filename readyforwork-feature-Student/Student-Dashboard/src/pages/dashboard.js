import React from "react";
// import { useDispatch, useSelector } from "react-redux";

import { StartPage } from "./StartPage";

// const CountCard = ({ name, count, icon }) => {
//   return (
//     <div className="col-md-3 col-sm-6">
//       <div className="card mini-stats-wid">
//         <div className="card-body">
//           <div className="media">
//             <div className="media-body">
//               <p className="text-muted fw-medium">{name}</p>
//               <h4 className="mb-0">{count}</h4>
//             </div>
//             <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
//               <span className="avatar-title">
//                 <i className={`${icon} font-size-24`} />
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const Dashboard = (props) => {
  // const { usersCount: count } = useSelector(
  //   (state) => state.userProviderReducer
  // );
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!count || count === 0) {
  //     api
  //       .get("/users/count")
  //       .then((res) => {
  //         return dispatch(setCount(res.data.count));
  //       })
  //       .catch((err) => {
  //         return dispatch(setCount(0));
  //       });
  //   } // eslint-disable-next-line
  // }, []);
  // eslint-disable-next-line
  // function getRandomInt(max) {
  //   return Math.floor(Math.random() * 100);
  // }
  // let cards = [
  //   { name: "Users", count: count, icon: "bx bx-user" },
  //   // { name: "Courses", count: getRandomInt(), icon: 'bx bx-book' },
  //   // { name: "Testimonials", count: getRandomInt(), icon: 'bx bx-message-square-dots'},
  //   // { name: "Services", count: getRandomInt(), icon: 'bx bx-grid' },
  //   // { name: "Blogs", count: getRandomInt(), icon: 'bx bx-book-content' },
  //   // { name: "Questions", count: getRandomInt(), icon: 'bx bx-help-circle' },
  // ];

  return (
    <div className="container-fluid">
      <StartPage
        content="dashboard"
        contents="dashboard"
        contenttitle="Dashboard"
      />
      <div className="row">
        {/* User Count */}
        {/* {cards.map((card, key) => (
          <CountCard key={key} {...card} />
        ))} */}
        {/*             

            
            <div className="col-md-3">
                <div className="card mini-stats-wid">
                    <div className="card-body">
                        <div className="media">
                            <div className="media-body">
                                <p className="text-muted fw-medium">Users</p>
                                <h4 className="mb-0">{count}</h4>
                            </div>
                            <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                                <span className="avatar-title">
                                    <i className="bx bx-user font-size-24" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

             */}
      </div>
      {/* end row */}
    </div>
  );
};

export default Dashboard;
