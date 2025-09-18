
import { Link } from 'react-router-dom';
import PrimaryButton from './PrimaryButton'; // استدعاء مكون الزر الرئيسي

function Header() {
    return (
        <header className="bg-white p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
                {/* Page Title */}
                <h1 className="text-2xl font-bold text-gray-800">Course Managment</h1>

                {/*Add New Course */}

                <Link to="/add-course">
                <PrimaryButton>+ Add New Course</PrimaryButton>
                </Link>
            </div>
        </header>
    );
}

export default Header;