import styles from "./table-head.module.css";

function TableHead() {
  return (
    <thead>
      <tr>
        <th>STT</th>
        <th>Avatar</th>
        <th>Full Name</th>
        <th>EMAIL (username)</th>
        <th>PHONE</th>
        <th>Profile Status</th>
        <th>ACTION</th>
      </tr>
    </thead>
  );
}

export default TableHead;
