import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function AdminDashboard() {

    const [courses, setCourses] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingId, setEditingId] = useState(null);

    const API = import.meta.env.VITE_API_URL;

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

    const approveTransaction = async (id) => {
        const token = localStorage.getItem("token");
        if (!window.confirm("Verifikasi transaksi ini?")) return;
        if (!window.confirm("Membership user akan diaktifkan. Lanjutkan?")) return;
        try {
            await axios.put(
                `${API}/admin/transactions/${id}/approve`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Transaksi berhasil diverifikasi");
            fetchTransactions();
        } catch (err) {
            console.error(err);
            alert("Gagal verifikasi transaksi");
        }
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
                            borderCollapse: "collapse"
                        }}
                    >

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Paket</th>
                                <th>Jumlah</th>
                                <th>Status</th>
                                <th>Tanggal</th>
                                <th>Aksi</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                transactions.map((trx) => (

                                    <tr key={trx.transaksi_id}>

                                        <td>{trx.transaksi_id}</td>

                                        <td>{trx.username}</td>

                                        <td>{trx.email}</td>

                                        <td>{trx.nama_paket}</td>

                                        <td>
                                            Rp {Number(trx.jumlah_bayar).toLocaleString("id-ID")}
                                        </td>

                                        <td>

                                            {
                                                trx.status_pembayaran === "paid"
                                                    ? "✅ Paid"
                                                    : "⏳ Pending"
                                            }

                                        </td>

                                        <td>
                                            {
                                                new Date(
                                                    trx.tanggal_transaksi
                                                ).toLocaleDateString("id-ID")
                                            }
                                        </td>

                                        <td>

                                            {
                                                trx.status_pembayaran !== "paid" && (

                                                    <button
                                                        onClick={() =>
                                                            approveTransaction(
                                                                trx.transaksi_id
                                                            )
                                                        }
                                                        style={{
                                                            background: "green",
                                                            color: "white",
                                                            border: "none",
                                                            padding: "8px 12px",
                                                            borderRadius: "8px",
                                                            cursor: "pointer"
                                                        }}
                                                    >
                                                        Approve
                                                    </button>

                                                )
                                            }

                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>
        </div>
    );
}