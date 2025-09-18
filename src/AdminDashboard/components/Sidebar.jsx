
const HomeIcon = () => <span>🏠</span>;
const CoursesIcon = () => <span>📚</span>;
const StudentsIcon = () => <span>👨‍🎓</span>;
const SettingsIcon = () => <span>⚙️</span>;


function Sidebar() {
  // Links menu
  const navLinks = [
    { icon: <HomeIcon />, text: "Home" },
    { icon: <CoursesIcon />, text: "Courses", active: true }, // active: true تجعل هذا الرابط هو النشط
    { icon: <StudentsIcon />, text: "Students" },
    { icon: <SettingsIcon />, text: "Settings" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-5">
      {/* Logo*/}
<div className="flex shrink-0 items-center justify-center">
    <img alt="Your Company" className="h-8 w-auto rounded-md " src="/images/logo.png"/>
    
    </div>
      {/* Links*/}
      <nav>
        <ul>
          {navLinks.map((link) => (
            <li key={link.text} className="mb-2">
              <a
                href="#"
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  link.active
                    ? "bg-orange-50 text-orange-500 font-bold" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="mr-3">{link.icon}</span>
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;