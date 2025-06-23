"use client";
import Sidebar from "../../components/Sidebar";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { getProgresoGlobal } from "../../lib/api/api";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts"; // 🔥 IMPORTANTE: aquí importamos echarts

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
    top: 20,
    textStyle: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#fff',
    },
  },
  tooltip: {
    trigger: 'item',
    formatter: "{b}: {c}%",
  },
  graphic: [
    {
      type: 'text',
      left: 'center',
      top: 'middle',
      style: {
        text: `${progreso.total}%`,
        fontSize: 48,
        fontWeight: 'bold',
        fill: '#fff',
      }
    }
  ],
  series: [
    {
      type: "pie",
      radius: ["50%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#222",
        borderWidth: 4,
      },
      color: ['#34d399', '#4b5563'],
      label: { show: false },
      data: [
        { name: "Completado", value: progreso.total },
        { name: "Pendiente", value: 100 - progreso.total },
      ],
    },
  ],
};


  const optionsPorMundo = {
    title: {
      text: "Progreso por Mundo",
      left: "center",
      top: 20,
      textStyle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
      },
    },
    tooltip: {
      trigger: 'axis',
      formatter: "{b}: {c}%",
    },
    xAxis: {
      type: "category",
      data: Object.keys(progreso.mundos || {}),
      axisLabel: {
        color: '#fff',
        fontWeight: 'bold'
      }
    },
    yAxis: {
      type: "value",
      max: 100,
      axisLabel: {
        formatter: '{value}%',
        color: '#fff',
        fontWeight: 'bold'
      }
    },
    grid: { top: 80, bottom: 40, left: 40, right: 40 },
    series: [
      {
        data: Object.values(progreso.mundos || {}),
        type: "bar",
        barWidth: '50%',
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#60A5FA' },
            { offset: 1, color: '#2563EB' }
          ])
        },
        label: {
          show: true,
          position: "top",
          formatter: "{c}%",
          color: '#fff',
          fontWeight: 'bold'
        }
      }
    ]
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364]">
        <Sidebar />
        <main className="flex-1 p-10 md:ml-64 w-full">
          <h1 className="text-5xl font-extrabold text-white mb-12 flex items-center gap-4">
            📊 Tu Progreso
          </h1>

          {loading ? (
            <div className="text-center text-white text-xl animate-pulse">
              🔄 Cargando progreso...
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 h-[calc(100vh-200px)]">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 flex items-center justify-center">
                <ReactECharts option={optionsTotal} style={{ height: "90%", width: "100%" }} />
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 flex items-center justify-center">
                <ReactECharts option={optionsPorMundo} style={{ height: "90%", width: "100%" }} />
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
