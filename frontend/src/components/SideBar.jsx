import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Jelajahi",
      path: "/courses",
    },
    {
      name: "Membership",
      path: "/membership",
    },
  ];

  return (
    <aside
      className="
        fixed
        left-0
        top-0
        h-screen
        w-[260px]
        bg-[#08152E]
        border-r border-white/5
        flex
        flex-col
        justify-between
        px-6
        py-8
      "
    >

      {/* TOP */}
      <div>

        {/* LOGO */}
        <Link to="/dashboard">
          <h1
            className="
              text-[32px]
              font-black
              text-cyan-400
              tracking-tight
            "
          >
            StudYuk
          </h1>
        </Link>

        {/* MENU */}
        <nav className="mt-12 space-y-3">

          {menus.map((menu) => {
            const active = location.pathname === menu.path;

            return (
              <Link
                key={menu.path}
                to={menu.path}
                className={`
                  flex
                  items-center
                  justify-between
                  px-5
                  py-4
                  rounded-2xl
                  transition
                  border

                  ${
                    active
                      ? "bg-cyan-400/10 border-cyan-400/40 text-cyan-400"
                      : "border-transparent text-[#8A9AB7] hover:bg-white/5"
                  }
                `}
              >

                <div className="flex items-center gap-4">

                  <div
                    className={`
                      w-3
                      h-3
                      rounded-sm
                      border

                      ${
                        active
                          ? "border-cyan-400"
                          : "border-[#5C6B8A]"
                      }
                    `}
                  />

                  <span className="text-lg font-semibold">
                    {menu.name}
                  </span>

                </div>

                {active && (
                  <div
                    className="
                      w-2.5
                      h-2.5
                      rounded-full
                      bg-cyan-400
                      shadow-[0_0_12px_#22d3ee]
                    "
                  />
                )}

              </Link>
            );
          })}

        </nav>

      </div>

      {/* PROFILE */}
      <Link
        to="/profile"
        className="
          border-t
          border-white/5
          pt-6
          hover:bg-white/5
          rounded-2xl
          transition
        "
      >

        <div className="flex items-center gap-4 px-2 py-2">

          {/* AVATAR */}
          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-cyan-400
              flex
              items-center
              justify-center
              text-[#08152E]
              font-bold
              text-xl
            "
          >
            J
          </div>

          {/* INFO */}
          <div>

            <p className="text-white font-semibold text-lg leading-none">
              jason12
            </p>

            <p className="text-[#7C8AA5] text-sm mt-1">
              Premium
            </p>

          </div>

        </div>

      </Link>

    </aside>
  );
}