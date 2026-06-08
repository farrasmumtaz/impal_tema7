import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function AdminDashboard() {

    const [courses, setCourses] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingId, setEditingId] = useState(null);

    const API = import.meta.env.VITE_API_URL;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(transactions.length / itemsPerPage);
    const paginatedTransactions = transactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const fetchCourses = useCallback(async () => {
        try {
            const res = await axios.get(`${API}/courses`);
            setCourses(res.data);
        } catch (err) {
            console.error(err);
        }
    }, [API]);

    const fetchTransactions = useCallback(async () => {
        const token = localStorage.getItem("token");
        const url = `${API}/admin/transactions`;
        console.log("Fetching transactions dari:", url); // ← cek URL yang dipanggil
        try {
            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTransactions(res.data);
        } catch (err) {
            console.error("Status:", err.response?.status);
            console.error("URL:", err.config?.url);
        }
    }, [API]);

    useEffect(() => {
        fetchCourses();
        fetchTransactions();
    }, [fetchCourses, fetchTransactions]);

    const resetForm = () => {
        setEditingId(null);
        setTitle("");
        setDescription("");
    };

    const handleAddCourse = async () => {
        const token = localStorage.getItem("token");
        if (!title || !description) return alert("Semua field wajib diisi");
        try {
            await axios.post(
                `${API}/admin/courses`,
                { title, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Course berhasil ditambahkan");
            resetForm();
            fetchCourses();
        } catch (err) {
            console.error(err);
            alert("Gagal tambah course");
        }
    };

    const handleEdit = (course) => {
        setEditingId(course.course_id);
        setTitle(course.title);
        setDescription(course.description || "");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem("token");
        if (!title || !description) return alert("Semua field wajib diisi");
        try {
            await axios.put(
                `${API}/admin/courses/${editingId}`,
                { title, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Course berhasil diupdate");
            resetForm();
            fetchCourses();
        } catch (err) {
            console.error(err);
            alert("Gagal update");
        }
    };

    const handleDelete = async (id, title) => {
        const token = localStorage.getItem("token");
        if (!window.confirm(`Yakin ingin menghapus course "${title}" ?`)) return;
        if (!window.confirm("Course akan dihapus permanen. Lanjutkan?")) return;
        try {
            await axios.delete(`${API}/admin/courses/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Course berhasil dihapus");
            fetchCourses();
        } catch (err) {
            console.error(err);
            alert("Gagal hapus course");
        }
    };

    const handleLogout = () => {
        if (!window.confirm("Apakah Anda yakin ingin logout?")) return;
        if (!window.confirm("Anda akan keluar dari panel admin. Lanjutkan?")) return;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    };
    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#071028",
                color: "white",
                padding: "30px"
            }}
        >
            <h1
                style={{
                    fontSize: "38px",
                    marginBottom: "25px",
                    fontWeight: "bold"
                }}
            >
                Admin Dashboard
            </h1>
            <button
                onClick={handleLogout}
                className="logout-btn"
            >
                Logout
            </button>
            <div
                style={{
                    background: "#111c44",
                    padding: "25px",
                    borderRadius: "16px",
                    marginBottom: "40px",
                    border: editingId
                        ? "2px solid orange"
                        : "2px solid transparent"
                }}
            >

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >

                    <h2>
                        {
                            editingId
                                ? "Edit Course"
                                : "Tambah Course"
                        }
                    </h2>

                    {
                        editingId && (
                            <div
                                style={{
                                    background: "orange",
                                    color: "black",
                                    padding: "8px 14px",
                                    borderRadius: "8px",
                                    fontWeight: "bold"
                                }}
                            >
                                MODE EDIT
                            </div>
                        )
                    }

                </div>



                <input
                    type="text"
                    placeholder="Judul course"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "14px",
                        marginTop: "15px",
                        borderRadius: "10px",
                        border: "none",
                        fontSize: "16px",
                        background: "#0f172a",
                        color: "white",
                        outline: "none"
                    }}
                />



                <textarea
                    placeholder="Deskripsi course"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "14px",
                        marginTop: "15px",
                        borderRadius: "10px",
                        border: "none",
                        fontSize: "16px",
                        minHeight: "140px",
                        resize: "vertical",
                        background: "#0f172a",
                        color: "white",
                        outline: "none"
                    }}
                />



                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                        marginTop: "20px"
                    }}
                >

                    {
                        editingId ? (
                            <>
                                <button
                                    onClick={handleUpdate}
                                    style={{
                                        padding: "12px 24px",
                                        background: "orange",
                                        border: "none",
                                        borderRadius: "10px",
                                        cursor: "pointer",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Update Course
                                </button>

                                <button
                                    onClick={resetForm}
                                    style={{
                                        padding: "12px 24px",
                                        background: "#444",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "10px",
                                        cursor: "pointer",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Batal Edit
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleAddCourse}
                                style={{
                                    padding: "12px 24px",
                                    background: "#00d4ff",
                                    border: "none",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                    fontWeight: "bold"
                                }}
                            >
                                Tambah Course
                            </button>
                        )
                    }

                </div>

            </div>



            {/* COURSE LIST */}
            <div>

                <h2
                    style={{
                        marginBottom: "20px"
                    }}
                >
                    Daftar Course
                </h2>

                {
                    courses.map((course) => (

                        <div
                            key={course.course_id}
                            style={{
                                background: "#111c44",
                                padding: "25px",
                                borderRadius: "16px",
                                marginBottom: "20px"
                            }}
                        >

                            <h3
                                style={{
                                    fontSize: "24px",
                                    marginBottom: "10px"
                                }}
                            >
                                {course.title}
                            </h3>

                            <p
                                style={{
                                    color: "#c7d2fe",
                                    lineHeight: "1.7",
                                    marginBottom: "20px"
                                }}
                            >
                                {course.description}
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px"
                                }}
                            >

                                <button
                                    onClick={() => handleEdit(course)}
                                    style={{
                                        padding: "10px 18px",
                                        background: "orange",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(
                                            course.course_id,
                                            course.title
                                        )
                                    }
                                    style={{
                                        padding: "10px 18px",
                                        background: "red",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))
                }

            </div>
            <div style={{ marginTop: "50px" }}>

                <h2
                    style={{
                        marginBottom: "20px"
                    }}
                >
                    Daftar Transaksi
                </h2>

                <div
                    style={{
                        background: "#111c44",
                        borderRadius: "16px",
                        overflowX: "auto",
                        padding: "20px"
                    }}
                >

                    <table
                        style={{
                            width: "100%",
                            color: "white",
                            borderCollapse: "collapse",
                            tableLayout: "fixed", // ← tambah ini
                        }}
                    >
                        <thead>
                            <tr>
                                <th style={{ width: "5%", padding: "12px 8px", textAlign: "left" }}>ID</th>
                                <th style={{ width: "10%", padding: "12px 8px", textAlign: "left" }}>User</th>
                                <th style={{ width: "25%", padding: "12px 8px", textAlign: "left" }}>Email</th>
                                <th style={{ width: "10%", padding: "12px 8px", textAlign: "left" }}>Paket</th>
                                <th style={{ width: "12%", padding: "12px 8px", textAlign: "left" }}>Jumlah</th>
                                <th style={{ width: "13%", padding: "12px 8px", textAlign: "left" }}>Tanggal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedTransactions.map((trx) => (
                                <tr key={trx.transaksi_id} style={{ borderTop: "1px solid #1e2d5a" }}>
                                    <td style={{ padding: "12px 8px" }}>{trx.transaksi_id}</td>
                                    <td style={{ padding: "12px 8px" }}>{trx.username}</td>
                                    <td style={{ padding: "12px 8px", wordBreak: "break-all" }}>{trx.email}</td>
                                    <td style={{ padding: "12px 8px" }}>{trx.nama_paket}</td>
                                    <td style={{ padding: "12px 8px" }}>
                                        Rp {Number(trx.jumlah_bayar).toLocaleString("id-ID")}
                                    </td>
                                    <td style={{ padding: "12px 8px" }}>
                                        {new Date(trx.tanggal_transaksi).toLocaleDateString("id-ID")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        marginTop: "20px",
                        flexWrap: "wrap"
                    }}>
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            style={{ padding: "8px 12px", background: currentPage === 1 ? "#1e2d5a" : "#00d4ff", color: currentPage === 1 ? "#555" : "black", border: "none", borderRadius: "8px", cursor: currentPage === 1 ? "not-allowed" : "pointer", fontWeight: "bold" }}
                        >«</button>

                        <button
                            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            style={{ padding: "8px 12px", background: currentPage === 1 ? "#1e2d5a" : "#00d4ff", color: currentPage === 1 ? "#555" : "black", border: "none", borderRadius: "8px", cursor: currentPage === 1 ? "not-allowed" : "pointer", fontWeight: "bold" }}
                        >‹</button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                            .reduce((acc, page, idx, arr) => {
                                if (idx > 0 && page - arr[idx - 1] > 1) acc.push("...");
                                acc.push(page);
                                return acc;
                            }, [])
                            .map((item, idx) =>
                                item === "..." ? (
                                    <span key={`e-${idx}`} style={{ color: "#555", padding: "0 4px" }}>...</span>
                                ) : (
                                    <button
                                        key={item}
                                        onClick={() => setCurrentPage(item)}
                                        style={{ padding: "8px 12px", background: currentPage === item ? "#00d4ff" : "#1e2d5a", color: currentPage === item ? "black" : "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", minWidth: "36px" }}
                                    >{item}</button>
                                )
                            )
                        }

                        <button
                            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            style={{ padding: "8px 12px", background: currentPage === totalPages ? "#1e2d5a" : "#00d4ff", color: currentPage === totalPages ? "#555" : "black", border: "none", borderRadius: "8px", cursor: currentPage === totalPages ? "not-allowed" : "pointer", fontWeight: "bold" }}
                        >›</button>

                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            style={{ padding: "8px 12px", background: currentPage === totalPages ? "#1e2d5a" : "#00d4ff", color: currentPage === totalPages ? "#555" : "black", border: "none", borderRadius: "8px", cursor: currentPage === totalPages ? "not-allowed" : "pointer", fontWeight: "bold" }}
                        >»</button>

                        <span style={{ color: "#c7d2fe", fontSize: "14px", marginLeft: "8px" }}>
                            Halaman {currentPage} dari {totalPages} ({transactions.length} transaksi)
                        </span>
                    </div>
                )}

            </div>
        </div>
    );
}