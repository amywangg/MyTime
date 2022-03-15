import React, { useContext, useState, useEffect } from "react";
import Page from "../../components/Page";
import Loading from "../../components/Loading";
import { PostingContext } from "../../context/PostingContext";
import Posting from "../../components/Posting";
import NoJobs from "../../components/NoJobs";
import { useNavigate, useParams } from "react-router-dom";

const arraySearch = (array, keyword) => {
  const searchTerm = keyword.toLowerCase();
  return array.filter((value) => {
    return (
      value.title.toLowerCase().match(new RegExp(searchTerm, "g")) ||
      value.name.toLowerCase().match(new RegExp(searchTerm, "g"))
    );
  });
};

function Search() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [filteredPostings, setFilteredPostings] = useState([]);
  const navigate = useNavigate();
  const { postings, updateSave, postingLoading } = useContext(PostingContext);
  const { params } = useParams();

  useEffect(() => {
    setSearchLoading(true);
    let searchResults = [];
    if (params !== "all") {
      setSearch(params.replace("-", " "));
      if (params.includes("-")) {
        params.split("-").map((param) => {
          searchResults.push(...arraySearch(postings, param));
        });
      } else {
        searchResults = arraySearch(postings, params);
      }
      searchResults = searchResults.filter(
        (v, i, a) =>
          a.findIndex((t) => ["name", "title"].every((k) => t[k] === v[k])) ===
          i
      );
    } else {
      searchResults = [...postings];
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
    setSearchLoading(false);
  }, [postingLoading, params, postings, sortBy]);

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
            className="flex justify-center cursor-pointer self-center items-center rounded-full h-10 w-10 hover:bg-gray-300"
          >
            <i className="fa-solid fa-bookmark" />
          </div>
        ) : (
          <div
            onClick={() => updateSave(id, true)}
            className="flex justify-center cursor-pointer self-center items-center rounded-full h-10 w-10 hover:bg-gray-300"
          >
            <i className="fa-regular fa-bookmark" />
          </div>
        )}
      </div>
    );
  };

  return (
    <Page>
      <div className="relative bg-white rounded-xl shadow-md flex flex-col p-5 h-26 w-full mb-8 mt-3">
        <p className="inline-block font-semibold text-sm text-gray-500 mb-2">
          Update Your Search Query
        </p>
        <div className="flex justify-between">
          <input
            value={search}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                navigate(
                  `../browse/search/${
                    search !== "" ? search.replace(" ", "-") : "all"
                  }`
                );
              }
            }}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="input-basic text-xs rounded-lg mt-2 mr-2"
            id="keyword"
            autoComplete="none"
            placeholder="Title, Company, Keywords..."
          />
          <button
            onClick={() =>
              navigate(
                `../browse/search/${
                  search !== "" ? search.replace(" ", "-") : "all"
                }`
              )
            }
            className="rounded-lg border-[1px] h-[34px] mt-2 border-primary text-primary px-6 text-xs py-0 hover:bg-primary hover:text-white"
          >
            Search
          </button>
        </div>
      </div>

      <div className="relative bg-white rounded-xl shadow-md flex flex-col p-6 w-full min-h-0 flex-grow">
        <div className="flex justify-between">
          <p className="inline-block font-semibold text-xl">
            {params === "all"
              ? "Showing All Postings"
              : `Search Results for "${params.replace("-", " ")}"`}
          </p>
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
          Query generated {filteredPostings.length} results
        </p>
        {postingLoading || searchLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loading />
          </div>
        ) : filteredPostings.length > 0 && filteredPostings[0] != null ? (
          <div className="h-[90%] overflow-auto mt-3">
            {/* <div className="grid grid-cols-2 gap-x-4 gap-y-2"> */}
            {filteredPostings.map((post) => (
              <Posting
                key={post.title}
                item={post}
                onClick={() => navigate(`../browse/postings/${post.id}`)}
                action={<SaveAction saved={post.timeslots} id={post.id} />}
              />
            ))}
          </div>
        ) : (
          // </div>
          <NoJobs
            message1="Your query didn't hold any results"
            message2="Try changing your search terms!"
          />
        )}
        <button
          onClick={() => navigate("../browse")}
          className="text-gray-600 mt-2 mb-[-10px] hover:text-primary underline text-[13px] font-semibold"
        >
          Go Back
        </button>
      </div>
    </Page>
  );
}

Search.propTypes = {};

export default Search;
