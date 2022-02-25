import React, { useState } from "react";
import Listing from "../../components/Listing/Listing";
import NoJobs from "../../components/NoJobs";
import partnership from "../../assets/partnership.png";
import { useNavigate } from "react-router-dom";

function PartnerAction({ onClick }) {
  return (
    <div className="flex py-4 mr-2">
      <img className="h-5 w-5 mr-4" src={partnership} alt="partnership" />
      <button
        className="text-gray-600 underline text-xs mb-2"
        onClick={onClick}
      >
        Remove
      </button>
    </div>
  );
}

function PendingAction({ onAcceptClick, onRejectClick }) {
  return (
    <div className="flex py-4 mr-2">
      <button
        className="text-primary underline text-xs mb-4 mr-4"
        onClick={onAcceptClick}
      >
        Accept
      </button>
      <button
        className="text-gray-600 underline text-xs mb-4"
        onClick={onRejectClick}
      >
        Reject
      </button>
    </div>
  );
}

function RejectedAction({ onReconsiderClick }) {
  return (
    <div className="flex py-4 mr-2">
      <button
        className="text-primary underline text-xs mb-4 mr-4"
        onClick={onReconsiderClick}
      >
        Reconsider
      </button>
    </div>
  );
}

function Orgs({ tab, orgs, updateOrgSchool }) {
  const navigate = useNavigate();

  const onOrgClick = (id) => {
    navigate(`/org/${id}`);
  };

  const filteredOrgs =
    tab === "Partners"
      ? orgs.filter((org) => org.status === "verified")
      : tab === "Pending"
      ? orgs.filter((org) => org.status === "")
      : orgs.filter((org) => org.status === "rejected");
  // const filteredOrgs = orgs.filter((org) => org.verified === false);
  return (
    <div className="bg-white rounded-lg flex flex-col p-2 w-full flex-grow pt-8 overflow-auto">
      {filteredOrgs.length !== 0 ? (
        filteredOrgs.map((org, i) => (
          <Listing
            item={org}
            key={i}
            br={i !== filteredOrgs.length - 1}
            onClick={() => onOrgClick(org.id)}
            action={
              tab === "Pending" ? (
                <PendingAction
                  onAcceptClick={() => updateOrgSchool(org.id, "verified")}
                  onRejectClick={() => updateOrgSchool(org.id, "rejected")}
                />
              ) : tab === "Partners" ? (
                <PartnerAction
                  onClick={() => updateOrgSchool(org.id, "rejected")}
                />
              ) : (
                <RejectedAction
                  onReconsiderClick={() => updateOrgSchool(org.id, "")}
                />
              )
            }
          />
        ))
      ) : (
        <NoJobs
          message2={
            tab === "Partners"
              ? "Head over to the pending tab to verify..."
              : tab === "Rejected" && " "
          }
        />
      )}
    </div>
  );
}

Orgs.propTypes = {};

export default Orgs;
