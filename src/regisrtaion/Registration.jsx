import React, { useState } from "react";
import { signUpWithEmail, mapAuthError } from "../lib/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";
const MyButton = ({ children, disabled, ...restProps }) => {
  return (
    <button
      className="bg-[#ff9500] hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 w-full disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={!!disabled}
      {...restProps}
    >
      {children}
    </button>
  );
};

function Registration() {
  const db = getFirestore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [rePass, setRePass] = useState("");

  const [isStudent, setIsStudent] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminId, setAdminId] = useState("");

  const [errors, setErrors] = useState({
    nameErr: "",
    emailErr: "",
    passErr: "",
    rePassErr: "",
    adminIdErr: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitErr, setSubmitErr] = useState("");
  const [submitOk, setSubmitOk] = useState("");

  ///////////////// ids//////////////////////////
  const ALLOWED_ADMIN_IDS = new Set(["11", "22", "33", "44", "55"]);
  const isAdminIdAllowed = (val) => ALLOWED_ADMIN_IDS.has(String(val).trim());

  const emailRegex = /\S+@\S+\.\S+/;
  const passRegex = /^.{6,}$/;















  /////////////// Handle Form Input /////////////////////////////////////





  const handleform = (e) => {
    const { name, value, checked } = e.target;

    if (name === "username") {
      setName(value);
      setErrors((p) => ({ ...p, nameErr: value ? "" : "Name is required" }));
    }

    if (name === "useremail") {
      setEmail(value);
      setErrors((p) => ({
        ...p,
        emailErr: !value
          ? "Email is required"
          : !emailRegex.test(value)
            ? "Invalid email format"
            : "",
      }));
    }

    if (name === "userpass") {
      setPass(value);
      setErrors((p) => ({
        ...p,
        passErr: !value
          ? "Password is required"
          : !passRegex.test(value)
            ? "Password must be at least 6 characters"
            : "",
      }));
    }

    if (name === "repass") {
      setRePass(value);
      setErrors((p) => ({
        ...p,
        rePassErr: !value ? "Please re-enter password" : value !== pass ? "Passwords do not match" : "",
      }));
    }

    if (name === "roleStudent") {
      setIsStudent(!!checked);
    }

    if (name === "roleAdmin") {
      setIsAdmin(!!checked);
      if (checked) {
        if (!adminId.trim()) {
          setErrors((p) => ({ ...p, adminIdErr: "Please enter Admin ID" }));
        } else if (!isAdminIdAllowed(adminId)) {
          setErrors((p) => ({ ...p, adminIdErr: "Admin ID is not allowed" }));
        } else {
          setErrors((p) => ({ ...p, adminIdErr: "" }));
        }
      } else {
        setAdminId("");
        setErrors((p) => ({ ...p, adminIdErr: "" }));
      }
    }

    if (name === "adminId") {
      setAdminId(value);
      setErrors((p) => ({
        ...p,
        adminIdErr: !value.trim()
          ? "Please enter Admin ID"
          : !isAdminIdAllowed(value)
            ? "Admin ID is not allowed"
            : "",
      }));
    }
  };















  /////////////// Handle Submit when press on Register Button /////////////////////////////////////
  
const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitErr("");
  setSubmitOk("");

  if (!name || !email || !pass || !rePass) {
    setSubmitErr("Please fill all required fields.");
    return;
  }
  if (errors.nameErr || errors.emailErr || errors.passErr || errors.rePassErr) {
    setSubmitErr("Please fix the errors first.");
    return;
  }
  if (isAdmin) {
    if (!adminId.trim()) {
      setErrors((p) => ({ ...p, adminIdErr: "Please enter Admin ID" }));
      return;
    }
    if (!isAdminIdAllowed(adminId)) {
      setErrors((p) => ({ ...p, adminIdErr: "Admin ID is not allowed" }));
      return;
    }
  }

  try {
    setIsLoading(true);

    const user = await signUpWithEmail({
      email,
      password: pass,
      displayName: name,
    });

    /////// User Role
    await setDoc(
      doc(db, "users", user.uid),
      {
        displayName: name,
        email,
        role: isAdmin ? "admin" : "student",
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );

    setSubmitOk("Email has been sent. Please check your inbox.");
        /////////////// Should Active Email Before signin  
       ///////////////  await signOut(getAuth());
  } catch (e) {
    setSubmitErr(mapAuthError(e?.code));
  } finally {
    setIsLoading(false);
  }
};


  const hasErrors = Object.values(errors).some(Boolean);
  const requiredFilled = name && email && pass && rePass && (!isAdmin || adminId);
  const isAdminIdValid = !isAdmin || isAdminIdAllowed(adminId);
  const disableSubmit = hasErrors || !requiredFilled || !isAdminIdValid || isLoading;


  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="oklch(98.5% 0 0) shadow-lg p-8 rounded-2xl w-96 text-white">
        <h3 className="text-center mb-6 text-black font-bold text-2xl">Register</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              name="username"
              value={name}
              onChange={handleform}
              placeholder="Enter your name"
              className="shadow appearance-none border oklch(96.7% 0.001 286.375) rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-gray-900 bg-oklch(96.7% 0.001 286.375) placeholder:text-gray-500"
            />
            {errors.nameErr && <p className="text-red-500 text-xs italic mt-2">{errors.nameErr}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">Email</label>
            <input
              type="text"
              name="useremail"
              value={email}
              onChange={handleform}
              placeholder="Enter your email"
              className="shadow appearance-none border oklch(96.7% 0.001 286.375) rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-gray-900 bg-oklch(96.7% 0.001 286.375) placeholder:text-gray-500"
            />
            {errors.emailErr && <p className="text-red-500 text-xs italic mt-2">{errors.emailErr}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              name="userpass"
              value={pass}
              onChange={handleform}
              placeholder="Enter your password"
              className="shadow appearance-none border oklch(96.7% 0.001 286.375) rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-gray-900 bg-oklch(96.7% 0.001 286.375) placeholder:text-gray-500"
            />
            {errors.passErr && <p className="text-red-500 text-xs italic mt-2">{errors.passErr}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">Re-enter Password</label>
            <input
              type="password"
              name="repass"
              value={rePass}
              onChange={handleform}
              placeholder="Re-enter your password"
              className="shadow appearance-none border oklch(96.7% 0.001 286.375) rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-gray-900 bg-oklch(96.7% 0.001 286.375) placeholder:text-gray-500"
            />
            {errors.rePassErr && <p className="text-red-500 text-xs italic mt-2">{errors.rePassErr}</p>}
          </div>

          <div className="mb-4">
            <span className="block text-gray-400 text-sm font-bold mb-2">Role</span>
            <div className="flex items-center gap-6">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  name="roleStudent"
                  checked={isStudent}
                  onChange={handleform}
                  className="rounded"
                />
                <span className="text-gray-700">Student</span>
              </label>

              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  name="roleAdmin"
                  checked={isAdmin}
                  onChange={handleform}
                  className="rounded"
                />
                <span className="text-gray-700">Admin</span>
              </label>
            </div>
          </div>

          {isAdmin && (
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-bold mb-2">Admin ID</label>
              <input
                type="text"
                name="adminId"
                value={adminId}
                onChange={handleform}
                placeholder="Enter Admin ID"
                className="shadow appearance-none border oklch(96.7% 0.001 286.375) rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-gray-900 bg-oklch(96.7% 0.001 286.375) placeholder:text-gray-500"
              />
              {errors.adminIdErr && <p className="text-red-500 text-xs italic mt-2">{errors.adminIdErr}</p>}
            </div>
          )}

          <MyButton type="submit" disabled={disableSubmit}>
            {isLoading ? "Loading..." : "Register"}
          </MyButton>
            <div className="flex items-center justify-center mt-4"></div>
              <span className="text-gray-600 mr-2">Already have an account?</span>
              <Link to="/login" className="text-black hover:text-black cursor-pointer">Login</Link>
          {submitErr && <p className="text-red-500 text-xs italic mt-3">{submitErr}</p>}
          {submitOk && <p className="text-green-600 text-sm mt-3">{submitOk}</p>}
        </form>
      </div>
    </div>
  );
}

export default Registration;
