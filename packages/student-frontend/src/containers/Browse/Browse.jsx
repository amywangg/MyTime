import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Page from "../../components/Page";
import Loading from "../../components/Loading";
import { PostingContext } from "../../context/PostingContext";
import Posting from "../../components/Posting";
import NoJobs from "../../components/NoJobs";
import { useNavigate } from "react-router-dom";

function Browse() {
  const [suggestedPostings, setSuggestedPostings] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { postings, postingLoading, updateSave } = useContext(PostingContext);

  useEffect(() => {
    setSuggestedPostings(
      postings.filter(
        (posting) =>
          posting.name === "Sick Kids Foundation" ||
          posting.name.includes("SAVIS")
      )
    );
  }, [postingLoading]);

  const SaveAction = ({ saved, id }) => {
    let isSaved = false;
    saved.map((x) => {
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

  return (
    <Page title="Make a difference today">
      <div className="relative bg-white rounded-xl shadow-md flex flex-col p-5 h-26 w-full mb-8 mt-3">
        <p className="inline-block font-semibold text-sm text-gray-500 mb-2">
          Hi {currentUser !== undefined && currentUser?.first_name}, where would
          you like to give back today?
        </p>
        <div className="flex justify-between">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="input-basic text-xs rounded-lg mt-2 mr-2"
            id="keyword"
            autoComplete="none"
            placeholder="Title, Company, Keywords..."
          />
          <button
            onClick={() =>
              navigate(`search/${search ? search.replace(" ", "-") : "all"}`)
            }
            className="rounded-lg border-[1px] h-[34px] mt-2 border-primary text-primary px-6 text-xs py-0 hover:bg-primary hover:text-white"
          >
            Search
          </button>
        </div>
      </div>

      <div className="relative bg-white rounded-xl shadow-md flex flex-col p-6 w-full min-h-0 flex-grow">
        <p className="inline-block font-semibold text-xl mb-2">Explore</p>

        <p className="text-xs text-subText mt-1">
          Based on your interests we've compiled postings
        </p>
        {postingLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loading />
          </div>
        ) : suggestedPostings.length > 0 ? (
          <div className="h-[90%] overflow-auto mt-3">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {suggestedPostings.map((post, index) => (
                <Posting
                  explore={true}
                  key={post.title}
                  item={post}
                  onClick={() => navigate(`postings/${post.id}`)}
                  action={<SaveAction saved={post.timeslots} id={post.id} />}
                />
              ))}
            </div>
          </div>
        ) : (
          <NoJobs
            message1="No organizations have postings"
            message2="Check back later!"
          />
        )}
        <button
          onClick={() => navigate("search/all")}
          className="text-gray-600 mt-2 mb-[-10px] hover:text-primary underline text-[13px] font-semibold"
        >
          See More
        </button>
      </div>
    </Page>
  );
}

Browse.propTypes = {};

export default Browse;
