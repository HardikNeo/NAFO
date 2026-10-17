import Modal from "./Modal.jsx";
import NAFO from "./NAFO.jsx";

export default function ResultsModal({ onClose }) {
  return (
    <Modal label="Results" onClose={onClose}>
      <NAFO />
    </Modal>
  );
}
