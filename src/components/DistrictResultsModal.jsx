import { useNavigate, useParams } from "react-router-dom";
import Modal from "./Modal.jsx";
import Results from "./Results.jsx";
import ResultsList from "./ResultsList.jsx";
import { getDistrict } from "../lib/progress.js";

// Rendered as nested routes under /nafo/:district so the district page stays
// mounted behind the popup (and stays visible through the blurred backdrop).
function DistrictResultsModal({ children }) {
  const { district } = useParams();
  const navigate = useNavigate();
  const info = getDistrict(district);

  return (
    <Modal
      label={info ? `Results — ${info.name}` : "Results"}
      onClose={() => navigate(`/nafo/${district}`)}
    >
      {children}
    </Modal>
  );
}

export function DistrictResultsOverviewModal() {
  return (
    <DistrictResultsModal>
      <Results />
    </DistrictResultsModal>
  );
}

export function DistrictResultsListModal() {
  return (
    <DistrictResultsModal>
      <ResultsList />
    </DistrictResultsModal>
  );
}
