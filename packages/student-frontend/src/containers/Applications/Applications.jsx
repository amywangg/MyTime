import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Page from "../../components/Page";
import Loading from "../../components/Loading";
import { PostingContext } from "../../context/PostingContext";
import Posting from "../../components/Posting";
import NoJobs from "../../components/NoJobs";
import { useNavigate } from "react-router-dom";
import Tabs from "../../components/Tabs/Tabs";

function Application() {
  const [filteredPostings, setFilteredPostings] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [tab, setTab] = useState("Applied");
  const navigate = useNavigate();
  const { postings, postingLoading, updateSave } = useContext(PostingContext);

  useEffect(() => {
    let searchResults = [];
    if (tab === "Applied") {
      searchResults = postings.filter((post) =>
        post.timeslots.some(
          (time) =>
            time.student_status?.status !== "" && time.student_status?.status
        )
      );
    } else {
      searchResults = postings.filter((post) =>
        post.timeslots.some((time) => time?.student_status?.saved === "true")
      );
    }

    if (sortBy === "organization") {
      searchResults.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
      setFilteredPostings(searchResults);
    } else if (sortBy === "date") {
      searchResults.sort((a, b) => new Date(b.date) - new Date(a.date));
      setFilteredPostings(searchResults);
    } else if (sortBy === "title") {
      searchResults.sort((a, b) =>
        a.title > b.title ? 1 : b.title > a.title ? -1 : 0
      );
      setFilteredPostings(searchResults);
    } else {
      setFilteredPostings(searchResults);
    }
  }, [postingLoading, postings, sortBy, tab]);

  const SaveAction = ({ timeslots, id }) => {
    let isSaved = false;
    timeslots.map((x) => {
      if (x.student_status?.saved && x.student_status.saved === "true") {
        isSaved = true;
      }
    });
    return (
      <div className="flex flex-col justify-center items-middle h-full mr-4">
        {isSaved ? (
          <div
            onClick={() => updateSave(id, false)}
            className="flex cursor-pointer justify-center self-center items-center rounded-full h-10 w-10 hover:bg-gray-300"
          >
            <i className="fa-solid fa-bookmark" />
          </div>
        ) : (
          <div
            onClick={() => updateSave(id, true)}
            className="flex cursor-pointer justify-center self-center items-center rounded-full h-10 w-10 hover:bg-gray-300"
          >
            <i className="fa-regular fa-bookmark" />
          </div>
        )}
      </div>
    );
  };

  const StatusAction = ({ timeslots }) => {
    let status = "applied";
    for (var i = 0; i < timeslots.length; i++) {
      if (timeslots[i].student_status?.status === "rejected") {
        status = "rejected";
        break;
      } else if (timeslots[i].student_status?.status === "selected") {
        status = "selected";
        break;
      }
    }
    return (
      <div className="flex flex-col justify-center items-middle h-full mr-4">
        {status === "applied" ? (
          <i className="text-yellow-400 fa-solid fa-circle-exclamation" />
        ) : status === "selected" ? (
          <i className="text-green-400 fa-solid fa-circle-check" />
        ) : (
          <i className="text-red-400 fa-solid fa-circle-xmark" />
        )}
      </div>
    );
  };

  return (
    <Page title="My Applications">
      <div className="relative bg-white rounded-xl shadow-md flex flex-col p-6 w-full min-h-0 flex-grow">
        <div className="flex justify-between">
          <Tabs tab={tab} tabs={["Applied", "Saved"]} setTab={setTab} />
          <select
            className="text-subText w-32 border-transparent focus:border-transparent focus:ring-0 outline-none border-none focus:border-none focus:outline-none focus:appearance-none appearance-none py-[2px] mr-2 px-4 text-sm font-semibold text-left hover:text-primary hover:border-primary"
            aria-current="page"
            name="sort by"
            onChange={(e) =>
              setSortBy(e.target.value === "Sort By" ? null : e.target.value)
            }
          >
            <option value="Sort By">None</option>
            <option value="title">Title</option>
            <option value="date">Date</option>
            <option value="organization">Organization</option>
          </select>
        </div>

        <p className="text-xs text-subText mt-1">
          Here are your applied postings that are currently active
        </p>
        {postingLoading || !filteredPostings ? (
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
                  onClick={() => navigate(`../browse/postings/${post.id}`)}
                  action={
                    tab === "Applied" ? (
                      <StatusAction timeslots={post.timeslots} />
                    ) : (
                      <SaveAction timeslots={post.timeslots} id={post.id} />
                    )
                  }
                />
              ))}
            </div>
          </div>
        ) : (
          <NoJobs
            message1="You haven't applied to any jobs"
            message2="Get started by browsing!"
          />
        )}
      </div>
    </Page>
  );
}

Application.propTypes = {};

export default Application;
