import React, { useContext, useState, useEffect } from "react";
import NoJobs from "../../components/NoJobs";
import Page from "../../components/Page";
import Tabs from "../../components/Tabs";
import { useNavigate } from "react-router-dom";
import { PostingContext } from "../../context/PostingContext";
import Posting from "../../components/Posting";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/AuthContext";

function OpenAction({
  applicants,
  onClick,
  index,
  appHover,
  setAppHover,
  tab,
}) {
  return (
    <div className="flex mr-4 justify-center align-middle">
      {applicants.length > 0 ? (
        <span
          onMouseOver={() => setAppHover(index)}
          onMouseLeave={() => setAppHover(null)}
          className="relative mt-3.5 flex justify-center items-center h-5 w-5 hover:cursor-pointer text-[10px] font-semibold text-center bg-red-500 text-white rounded mr-4"
        >
          {applicants.length}
          {appHover === index && (
            <span className="absolute rounded-md py-1 px-2 z-10 left-[-110px] bottom-0 mt-4 inline-block bg-gray-600">
              {applicants.length > 0 &&
                `${applicants.length} ${
                  tab === "Open" ? " new applicant" : " pending action"
                }${applicants.length !== 1 ? "s" : ""}`}
            </span>
          )}
        </span>
      ) : null}
      {tab === "Pending Action" && applicants.length === 0 ? (
        <div>
          <span
            onMouseOver={() => setAppHover(index)}
            onMouseLeave={() => setAppHover(null)}
            className="relative flex justify-center items-center h-full"
          >
            {appHover === index && (
              <span className="absolute text-white text-[10px] rounded-md py-1 px-2 z-10 left-[-120px] top-0 mt-3 inline-block bg-gray-600">
                No pending signatures
              </span>
            )}
            <button
              className="text-gray-600 hover:text-primary underline text-[13px] font-semibold"
              onClick={onClick}
            >
              Close
            </button>
          </span>
        </div>
      ) : (
        <button
          className="text-gray-600 hover:text-primary underline text-[13px] font-semibold"
          onClick={onClick}
        >
          View
        </button>
      )}
    </div>
  );
}

function Postings() {
  const [tab, setTab] = useState("Open");
  const [filteredPostings, setFilteredPostings] = useState([]);
  const [appHover, setAppHover] = useState(null);
  const navigate = useNavigate();
  const {
    postings,
    closedPostings,
    completePostings,
    postingLoading,
    closePosting,
  } = useContext(PostingContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!postingLoading) {
      if (tab === "Open") {
        setFilteredPostings(postings);
      } else if (tab === "Pending Action") {
        const pendingPostings = [];
        completePostings.map((posting) => {
          let isFound = false;
          posting.timeslots.map((time) => {
            if (
              time.applicants.some(
                (applicant) =>
                  applicant.status === "selected" ||
                  applicant.status === "signed"
              ) &&
              !isFound
            ) {
              isFound = true;
              pendingPostings.push(posting);
            }
          });
        });
        setFilteredPostings(pendingPostings);
      } else {
        console.log(closedPostings);
        setFilteredPostings(closedPostings);
      }
    }
  }, [postingLoading, tab]);

  const onPostingClick = (id, close) => {
    if (close) {
      closePosting(id);
    } else {
      tab === "Open"
        ? navigate(`/postings/${id}`)
        : navigate(`/postings/pending/${id}`);
    }
  };

  return (
    <Page title="My Postings">
      <div className="relative bg-white rounded-xl shadow-md flex flex-col p-6 w-full flex-grow">
        <div className="flex justify-between mb-2">
          <p className="text-subText text-sm mb-4">
            Manage your postings here - new or old
          </p>
          <button
            className="rounded-lg border-[1px] h-[30px] border-primary text-primary px-3 text-xs py-0 hover:bg-primary hover:text-white"
            onClick={() => navigate("/postings/create")}
          >
            + New Posting
          </button>
        </div>
        <Tabs
          tabs={["Open", "Pending Action", "Closed"]}
          setTab={setTab}
          tab={tab}
        />
        <p className="text-xs text-gray-500 ml-2 mt-1">
          {tab === "Open"
            ? "Edit postings and select applicants"
            : tab === "Pending Action"
            ? "The posting date has passed, sign off on complete jobs"
            : "Postings which have no tasks and are fully complete"}
        </p>
        {postingLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loading />
          </div>
        ) : filteredPostings.length === 0 ? (
          <NoJobs
            message1="No Postings Yet!"
            message2="Click New Posting to add a posting"
          />
        ) : (
          <div className="mt-4 overflow-auto">
            {filteredPostings.map((posting, i) => {
              const notif = posting.timeslots.filter((time) =>
                time.applicants.some(
                  (applicant) =>
                    applicant.status ===
                    (tab === "Open" ? "applied" : "selected")
                )
              );
              return (
                <Posting
                  item={posting}
                  org={currentUser}
                  key={i}
                  br={i !== filteredPostings.length - 1}
                  onClick={() => onPostingClick(posting.id)}
                  action={
                    <OpenAction
                      applicants={notif}
                      onClick={() =>
                        onPostingClick(
                          posting.id,
                          tab === "Pending Action" && notif.length === 0
                            ? true
                            : false
                        )
                      }
                      index={i}
                      setAppHover={setAppHover}
                      appHover={appHover}
                      tab={tab}
                    />
                  }
                />
              );
            })}
          </div>
        )}
      </div>
    </Page>
  );
}

Postings.propTypes = {};

export default Postings;
