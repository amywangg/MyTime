import React, { useContext, useState, useEffect } from "react";
import NoJobs from "../../components/NoJobs";
import Page from "../../components/Page";
import Tabs from "../../components/Tabs";
import { useNavigate } from "react-router-dom";
import { PostingContext } from "../../context/PostingContext";
import Button from "../../components/Button";
import Posting from "../../components/Posting";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/AuthContext";

function OpenAction() {
  return (
    <div className="flex py-4 mr-2">
      <Button label="Edit" />
    </div>
  );
}

function Postings() {
  const [tab, setTab] = useState("Open");
  const [filteredPostings, setFilteredPostings] = useState([]);
  const navigate = useNavigate();
  const { postings, updatePosting, postingLoading } =
    useContext(PostingContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!postingLoading) {
      setFilteredPostings(
        postings.filter((posting) => posting.status === "open")
      );
      console.log(postings);
    }
  }, [postingLoading]);

  return (
    <Page title="My Postings">
      <div className="relative bg-white rounded-lg flex flex-col p-6 w-full flex-grow">
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
          filteredPostings.map((posting, i) => (
            <Posting
              item={posting}
              org={currentUser}
              key={i}
              br={i !== filteredPostings.length - 1}
              // onClick={() => onPostingClick(filteredPostings.id)}
              action={<OpenAction />}
            />
          ))
        )}
      </div>
    </Page>
  );
}

Postings.propTypes = {};

export default Postings;
