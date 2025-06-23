"use client";
import Sidebar from "../../components/Sidebar";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { getProgresoGlobal } from "../../lib/api/api";
import ReactECharts from "echarts-for-react";

export default function ProgresoPage() {
  const { usuario } = useUser();
  const [progreso, setProgreso] = useState<{ total: number; mundos: { [key: string]: number } }>({
    total: 0,
    mundos: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!usuario) return;
    async function cargarProgreso() {
      try {
        const data = await getProgresoGlobal(usuario!.id);
        setProgreso(data);
      } catch (error) {
        console.error("Error al cargar progreso:", error);
      } finally {
        setLoading(false);
      }
    }
    cargarProgreso();
  }, [usuario]);

  const optionsTotal = {
    title: {
      text: "Progreso Total",
      left: "center",
    },
    tooltip: {
      formatter: "{b}: {c}%",
    },
    series: [
      {
        type: "pie",
        radius: "50%",
        data: [
          { name: "Completado", value: progreso.total },
          { name: "Pendiente", value: 100 - progreso.total },
        ],
        label: {
          formatter: "{b}: {d}%",
        },
      },
    ],
  };

  const optionsPorMundo = {
    title: { text: "Progreso por Mundo", left: "center" },
    xAxis: {
      type: "category",
      data: Object.keys(progreso.mundos || {}),
    },
    yAxis: { type: "value", max: 100 },
    series: [
      {
        data: Object.values(progreso.mundos || {}),
        type: "bar",
        label: { show: true, position: "top", formatter: "{c}%" },
        itemStyle: { color: "#60A5FA" },
      },
    ],
  };


  return (
    // <ProtectedRoute>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 p-6 md:ml-64 w-full min-h-screen">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">Tu Progreso</h1>

          {loading ? (
            <p className="text-center">Cargando progreso...</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-white rounded-xl shadow-md p-6 h-96">
                <ReactECharts option={optionsTotal} style={{ height: "100%" }} />
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 h-96">
                <ReactECharts option={optionsPorMundo} style={{ height: "100%" }} />
              </div>
            </div>
          )}
        </main>
      </div>
    // </ProtectedRoute>
  );
}
