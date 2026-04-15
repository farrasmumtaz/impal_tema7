import DashboardLayout from "../layout/DashboardLayout";

export default function Dashboard() {

const getToday = () => {
  const today = new Date();

  return today.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

  return (
    <DashboardLayout>
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400">{getToday()}</p>
          <p className="text-gray-400 text-sm">
            Lanjutkan belajarmu — kamu sudah 62% lebih dekat ke tujuan
          </p>
        </div>
        <button className="bg-cyan-500 px-4 py-2 rounded-lg text-black font-semibold">
          ▶ Lanjutkan Belajar
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Pelajaran" value="12" />
        <StatCard title="Progress" value="57%" />
        <StatCard title="Membership" value="Pro" />
        <StatCard title="Waktu Belajar" value="24j" />
      </div>

      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2 bg-[#16233a] p-5 rounded-xl">
          <h2 className="font-semibold mb-4">Progres Belajar</h2>

          <ProgressItem name="UI/UX Design" percent={78} />
          <ProgressItem name="ReactJS" percent={55} />
          <ProgressItem name="Machine Learning" percent={34} />
          <ProgressItem name="Cloud AWS" percent={62} />
        </div>

        <div className="bg-[#16233a] p-5 rounded-xl">
          <h2 className="font-semibold mb-4">Lanjutkan Belajar</h2>

          <button className="w-full bg-cyan-500 py-2 rounded-lg text-black font-semibold">
            ▶ Lanjutkan Sekarang
          </button>
        </div>

      </div>

    </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-[#16233a] p-4 rounded-xl">
      <p className="text-sm text-gray-400">{title}</p>
      <h3 className="text-xl font-bold mt-1">{value}</h3>
    </div>
  );
}

function ProgressItem({ name, percent }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{name}</span>
        <span className="text-cyan-400">{percent}%</span>
      </div>
      <div className="w-full bg-gray-700 h-2 rounded-full">
        <div
          className="bg-cyan-400 h-2 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}