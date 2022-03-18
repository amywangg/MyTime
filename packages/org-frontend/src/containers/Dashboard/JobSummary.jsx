import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoJobs from "../../components/NoJobs";
import Loading from "../../components/Loading";
import Posting from "../../components/Posting";
import { PostingContext } from "../../context/PostingContext";
import { AuthContext } from "../../context/AuthContext";

function JobSummary() {
  const [filteredPostings, setFilteredPostings] = useState([]);
  const navigate = useNavigate();
  const { postings, postingLoading } = useContext(PostingContext);
  const { currentUser } = useContext(AuthContext);

  const onPostingClick = (id) => {
    navigate(`/postings/${id}`);
  };

  useEffect(() => {
    if (!postingLoading) {
      const pendingPostings = [];
      postings.map((posting) => {
        let isFound = false;
        posting.timeslots.map((time) => {
          if (
            time.applicants.some(
              (applicant) => applicant.status === "selected"
            ) &&
            !isFound
          ) {
            isFound = true;
            pendingPostings.push(posting);
          }
        });
      });
      setFilteredPostings(pendingPostings);
    }
  }, [postingLoading]);

  return (
    <div className="bg-white rounded-xl shadow-md flex flex-col p-8 w-full mb-10 h-1/2 overflow-auto">
      <p className="inline-block font-semibold text-xl mb-1">Upcoming Jobs</p>
      <p className="text-subText text-xs flex-wrap mb-4">
        Check up on what's coming next
      </p>
      {postingLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      ) : filteredPostings.length === 0 ? (
        <div className="h-full flex place-items-center justify-center w-full bg-ghost rounded-lg">
          <p className="inline-block align-middle text-center font-semibold text-gray-600 ">
            No complete jobs yet!
            <br /> Go to{" "}
            <a className="text-primary" href="/postings/create">
              create posting
            </a>{" "}
            to get started
          </p>
        </div>
      ) : (
        <div className="h-full overflow-auto">
          {filteredPostings.map((posting, i) => (
            <Posting
              route="/"
              item={posting}
              org={currentUser}
              key={i}
              br={i !== filteredPostings.length - 1}
              onClick={() => onPostingClick(posting.id)}
              action={null}
            />
          ))}
        </div>
      )}
    </div>
  );
}

JobSummary.propTypes = {};

export default JobSummary;
