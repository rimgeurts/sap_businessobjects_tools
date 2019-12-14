import React from "react";
import Layout from "./MainLayout";
import ScheduleTable from "../components_new/ScheduleTable";

const ScheduleLayout = props => {
  return (
    <Layout>
      <ScheduleTable />
    </Layout>
  );
};

export default ScheduleLayout;