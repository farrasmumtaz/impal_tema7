import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function AdminDashboard() {
    const [courses, setCourses] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingId, setEditingId] = useState(null);
    const token = localStorage.getItem("token");
    const API = import.meta.env.VITE_API_URL;
    const fetchCourses = useCallback(async () => {

        try {

            const res = await axios.get(`${API}/courses`);

            setCourses(res.data);

        } catch (err) {

            console.error(err);

        }
    }, [API]);

    useEffect(() => {
        const fetchCourses = async () => {
            const res = await axios.get(`${API}/courses`);
            setCourses(res.data);
        };
        fetchCourses();
    }, [API]);

    const resetForm = () => {

        setEditingId(null);

        setTitle("");

        setDescription("");

    };
    const handleAddCourse = async () => {

        if (!title || !description) {
            return alert("Semua field wajib diisi");
        }

        try {

            await axios.post(
                `${API}/admin/courses`,
                {
                    title,
                    description
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
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

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleUpdate = async () => {

        if (!title || !description) {
            return alert("Semua field wajib diisi");
        }

        try {

            await axios.put(
                `${API}/admin/courses/${editingId}`,
                {
                    title,
                    description
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
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

        const firstConfirm = window.confirm(
            `Yakin ingin menghapus course "${title}" ?`
        );

        if (!firstConfirm) return;

        const secondConfirm = window.confirm(
            "Course akan dihapus permanen. Lanjutkan?"
        );

        if (!secondConfirm) return;

        try {

            await axios.delete(
                `${API}/admin/courses/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Course berhasil dihapus");

            fetchCourses();

        } catch (err) {

            console.error(err);

            alert("Gagal hapus course");

        }
    };

    const handleLogout = () => {

        const confirm1 = window.confirm(
            "Apakah Anda yakin ingin logout?"
        );

        if (!confirm1) return;

        const confirm2 = window.confirm(
            "Anda akan keluar dari panel admin. Lanjutkan?"
        );

        if (!confirm2) return;

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

        </div>
    );
}