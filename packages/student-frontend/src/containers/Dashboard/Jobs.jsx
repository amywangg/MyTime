import React, { useState, useContext, useEffect } from "react";
import { PostingContext } from "../../context/PostingContext";
import { useNavigate } from "react-router-dom";
import NoJobs from "../../components/NoJobs";
import Tabs from "../../components/Tabs/Tabs";
import Loading from "../../components/Loading";
import Posting from "../../components/Posting";
import { AuthContext } from "../../context/AuthContext";

function Jobs() {
  const [tab, setTab] = useState("Upcoming");
  const navigate = useNavigate();
  const [filteredPostings, setFilteredPostings] = useState([]);
  const {
    postings,
    completePostings,
    postingLoading,
    generatePdf,
    updateStatus,
  } = useContext(PostingContext);

  useEffect(() => {
    let searchResults = [];
    if (tab === "Upcoming") {
      searchResults = postings.filter((post) =>
        post.timeslots.some((time) => time.student_status?.status == "selected")
      );
    } else {
      searchResults = completePostings.filter((post) =>
        post.timeslots.some(
          (time) =>
            time.student_status?.status == "selected" ||
            time.student_status?.status === "signed" ||
            time.student_status?.status === "generated"
        )
      );
    }
    setFilteredPostings(searchResults);
  }, [postingLoading, postings, tab]);

  return (
    <div className="bg-white rounded-xl shadow-md flex flex-col p-8 w-full flex-grow overflow-auto">
      <div className="flex justify-between">
        <div>
          <p className="inline-block font-semibold text-xl mb-2">Your Jobs</p>
          <p className="text-subText text-xs flex-wrap mb-4">
            {tab === "Upcoming"
              ? "Look back at all the hard work you put in"
              : "If forms have been generated mark as signed, MyTime can only generate for up to 3 spaces"}
          </p>
        </div>
      </div>

      <Tabs setTab={setTab} tab={tab} tabs={["Upcoming", "Completed"]} />
      {postingLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      ) : filteredPostings.length > 0 ? (
        <div className="h-[90%] overflow-auto mt-5">
          <div className="flex flex-col">
            {filteredPostings.map((post) => (
              <Posting
                key={post.title}
                item={post}
                onClick={() =>
                  navigate(
                    `${
                      tab === "Upcoming"
                        ? "../browse/postings"
                        : "../postings/complete"
                    }/${post.id}`
                  )
                }
                action={
                  tab === "Completed" ? (
                    <div className="flex justify-end items-center">
                      {post.timeslots.some(
                        (time) => time.student_status?.status == "selected"
                      ).length > 0 ? (
                        <p className="text-xs">Pending Signature</p>
                      ) : (
                        <button
                          className="rounded-lg border-[1px] h-[30px] border-primary text-primary px-3 text-xs py-0 hover:bg-primary hover:text-white"
                          onClick={() => generatePdf(post)}
                        >
                          + Generate Form
                        </button>
                      )}
                    </div>
                  ) : null
                }
              />
            ))}
          </div>
        </div>
      ) : (
        <NoJobs
          message1="No postings!"
          message2="Go to browse to apply for a posting"
        />
      )}
    </div>
  );
}

Jobs.propTypes = {};

export default Jobs;
