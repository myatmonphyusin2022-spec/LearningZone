import Navbar from "@/components/Navbar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Navbar />

      {/* Show arrow on all pages except Home */}
      {location.pathname !== "/" && (
        <button
          onClick={() => navigate(-1)}
          style={{
            position: "fixed",
            top: "90px",
            left: "20px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "none",
            background: "#4f46e5",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <IoArrowBack size={20} />
        </button>
      )}

      <Outlet />
    </>
  );
}
