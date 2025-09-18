// AdminPage.jsx
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CoursesTable from '../components/CoursesTable';

function AdminPage() {
  return (
    // flex-grow make the main content take up the remaining space
    <div className="flex h-screen bg-gray-50">
      {/* 1. Sidebar */}
      <Sidebar />
      
      {/* 2. main content  */}
      <main className="flex-grow flex flex-col">
        {/* 1. Header */}
        <Header />
        
        {/* Table */}
        <CoursesTable />
      </main>
    </div>
  );
}

export default AdminPage;