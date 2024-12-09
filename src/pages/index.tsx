import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Dashboard from "@/dashboard/Dashboard";
import withAuth from "../../lib/wiithAuth"

const ProtectedDashboard = withAuth(Dashboard);


export default function Home() {
  return (
    <>
    <ProtectedDashboard />;
    </>
  );
}
