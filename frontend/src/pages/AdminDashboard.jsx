import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function AdminDashboard() {

    const [courses, setCourses] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [editingId, setEditingId] = useState(null);

    const token = localStorage.getItem("token");

    const API = import.meta.env.VITE_API_URL;



    // ================= GET COURSES =================
    const fetchCourses = useCallback(async () => {

        try {

            const res = await axios.get(`${API}/courses`);

            setCourses(res.data);

        } catch (err) {

            console.error(err);

        }

    }, [API]);



    useEffect(() => {

        const loadCourses = async () => {
            await fetchCourses();
        };

        loadCourses();

    }, [fetchCourses]);




    // ================= ADD COURSE =================
    const handleAddCourse = async () => {

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

            setTitle("");
            setDescription("");

            fetchCourses();

        } catch (err) {
            console.error(err);
            alert("Gagal tambah course");
        }
    };




    // ================= DELETE COURSE =================
    const handleDelete = async (id) => {

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
            alert("Gagal hapus");
        }
    };




    // ================= EDIT COURSE =================
    const handleEdit = (course) => {

        setEditingId(course.course_id);

        setTitle(course.title);

        setDescription(course.description || "");
    };




    // ================= UPDATE COURSE =================
    const handleUpdate = async () => {

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

            setEditingId(null);

            setTitle("");
            setDescription("");

            fetchCourses();

        } catch (err) {
            console.error(err);
            alert("Gagal update");
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

            <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
                Admin Dashboard
            </h1>



            {/* FORM */}
            <div
                style={{
                    background: "#111c44",
                    padding: "20px",
                    borderRadius: "10px",
                    marginBottom: "30px"
                }}
            >

                <h2>
                    {
                        editingId
                            ? "Edit Course"
                            : "Tambah Course"
                    }
                </h2>

                <input
                    type="text"
                    placeholder="Judul course"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "10px",
                        borderRadius: "8px"
                    }}
                />

                <textarea
                    placeholder="Deskripsi"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "10px",
                        borderRadius: "8px",
                        height: "120px"
                    }}
                />



                {
                    editingId ? (
                        <button
                            onClick={handleUpdate}
                            style={{
                                marginTop: "15px",
                                padding: "12px 20px",
                                background: "orange",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer"
                            }}
                        >
                            Update Course
                        </button>
                    ) : (
                        <button
                            onClick={handleAddCourse}
                            style={{
                                marginTop: "15px",
                                padding: "12px 20px",
                                background: "#00d4ff",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer"
                            }}
                        >
                            Tambah Course
                        </button>
                    )
                }

            </div>




            {/* LIST COURSES */}
            <div>

                <h2>Daftar Course</h2>

                {
                    courses.map((course) => (

                        <div
                            key={course.course_id}
                            style={{
                                background: "#111c44",
                                padding: "20px",
                                borderRadius: "10px",
                                marginTop: "15px"
                            }}
                        >

                            <h3>{course.title}</h3>

                            <p>{course.description}</p>

                            <button
                                onClick={() => handleEdit(course)}
                                style={{
                                    marginRight: "10px",
                                    padding: "10px",
                                    background: "orange",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer"
                                }}
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(course.course_id)}
                                style={{
                                    padding: "10px",
                                    background: "red",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    color: "white"
                                }}
                            >
                                Delete
                            </button>

                        </div>

                    ))
                }

            </div>

        </div>
    );
}