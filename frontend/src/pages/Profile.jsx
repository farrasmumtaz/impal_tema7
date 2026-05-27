import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { API_URL } from "../api";

export default function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    nama_depan: "",
    nama_belakang: "",
    email: "",
    no_telp: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);

  // GET PROFILE
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile({
          username: data.username || "",
          nama_depan: data.nama_depan || "",
          nama_belakang: data.nama_belakang || "",
          email: data.email || "",
          no_telp: data.no_telp || "",
          bio: data.bio || "",
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // SAVE
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API_URL}/user/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profile),
        }
      );

      const data = await res.json();

      alert(data.message);

    } catch (err) {
      console.error(err);
      alert("Gagal update profile");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-white p-10">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="px-8 py-7 text-white">

        {/* TITLE */}
        <div className="mb-6">
          <p className="text-[#6C7A96] text-sm">
            Pengaturan Profile
          </p>

          <h1 className="text-4xl font-bold mt-1">
            Profile Saya
          </h1>
        </div>

        {/* PROFILE CARD */}
        <div
          className="
            bg-[#121F3D]
            rounded-[30px]
            p-7
            flex
            items-center
            justify-between
            border
            border-white/5
          "
        >

          <div className="flex items-center gap-5">

            {/* AVATAR */}
            <div
              className="
                w-24
                h-24
                rounded-full
                bg-cyan-400
                flex
                items-center
                justify-center
                text-[#08152E]
                text-3xl
                font-bold
              "
            >
              {profile.username?.charAt(0)?.toUpperCase()}
            </div>

            {/* INFO */}
            <div>

              <h2 className="text-3xl font-bold">
                {profile.username}
              </h2>

              <p className="text-[#8A9AB7] mt-1">
                {profile.email}
              </p>

              <div
                className="
                  mt-4
                  inline-flex
                  items-center
                  gap-2
                  px-5
                  py-2
                  rounded-full
                  bg-cyan-400/10
                  border
                  border-cyan-400/20
                  text-cyan-300
                  text-sm
                "
              >
                {profile.nama_depan} {profile.nama_belakang}
              </div>

            </div>

          </div>

        </div>

        {/* FORM */}
        <div
          className="
            mt-6
            bg-[#121F3D]
            rounded-[30px]
            p-7
            border
            border-white/5
          "
        >

          <div
            className="
              inline-flex
              items-center
              gap-3
              bg-cyan-400
              text-[#08152E]
              font-semibold
              px-6
              py-3
              rounded-2xl
              mb-8
            "
          >
            👤 Informasi Pribadi
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 gap-6">

            <div>
              <label className="text-[#8A9AB7] text-sm">
                Nama Depan
              </label>

              <input
                type="text"
                name="nama_depan"
                value={profile.nama_depan}
                onChange={handleChange}
                className="
                  mt-2
                  w-full
                  bg-[#08152E]
                  border
                  border-white/5
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-cyan-400
                "
              />
            </div>

            <div>
              <label className="text-[#8A9AB7] text-sm">
                Nama Belakang
              </label>

              <input
                type="text"
                name="nama_belakang"
                value={profile.nama_belakang}
                onChange={handleChange}
                className="
                  mt-2
                  w-full
                  bg-[#08152E]
                  border
                  border-white/5
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-cyan-400
                "
              />
            </div>

          </div>

          {/* USERNAME */}
          <div className="mt-6">
            <label className="text-[#8A9AB7] text-sm">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              className="
                mt-2
                w-full
                bg-[#08152E]
                border
                border-white/5
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:border-cyan-400
              "
            />
          </div>

          {/* EMAIL */}
          <div className="mt-6">
            <label className="text-[#8A9AB7] text-sm">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="
                mt-2
                w-full
                bg-[#08152E]
                border
                border-white/5
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:border-cyan-400
              "
            />
          </div>

          {/* PHONE */}
          <div className="mt-6">
            <label className="text-[#8A9AB7] text-sm">
              Nomor Telepon
            </label>

            <input
              type="text"
              name="no_telp"
              value={profile.no_telp}
              onChange={handleChange}
              className="
                mt-2
                w-full
                bg-[#08152E]
                border
                border-white/5
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:border-cyan-400
              "
            />
          </div>

          {/* BIO */}
          <div className="mt-6">
            <label className="text-[#8A9AB7] text-sm">
              Deskripsi
            </label>

            <textarea
              rows="5"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              className="
                mt-2
                w-full
                bg-[#08152E]
                border
                border-white/5
                rounded-2xl
                px-5
                py-4
                outline-none
                resize-none
                focus:border-cyan-400
              "
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSave}
            className="
              mt-8
              bg-cyan-400
              hover:bg-cyan-300
              transition
              text-[#08152E]
              font-bold
              px-8
              py-4
              rounded-2xl
            "
          >
            Simpan Perubahan
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
}