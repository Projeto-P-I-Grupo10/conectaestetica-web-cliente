import Chart from "react-apexcharts";

import { Users, BookOpen, DollarSign, TrendingUp, Wallet } from "lucide-react";

import SidebarAdmin from "../assets/components-admin/SidebarAdmin";

export default function AdminDashboard() {
  // DADOS MOCKADOS
  const cursosMaisVendidos = [320, 280, 190, 160, 80];

  const cursosMenosVendidos = [12, 18, 25, 30, 40];

  // KPIS
  const kpis = [
    
    {
      titulo: "Receita Total",
      valor: "R$ 28.900",
      icon: <DollarSign size={24} />,
    },
    
    {
      titulo: "Receita líquida",
      valor: "R$ 2.800",
      icon: <Wallet size={24} />,
    },
    
    {
      titulo: "Margem de lucro",
      valor: "34,8%",
      icon: <TrendingUp size={24} />,
    },
    {
      titulo: "Variação da receita líquida",
      valor: "R$ 100.000",
      icon: <TrendingUp size={24} />,
    },
  ];
  
  const barOptionsMaisVendidos = {
    chart: {
      toolbar: {
        show: false,
      },

      background: "transparent",
    },

    dataLabels: {
      enabled: false,
    },

    plotOptions: {
      bar: {
        borderRadius: 12,
        columnWidth: "45%",
      },
    },

    grid: {
      borderColor: "#ece7e2",
    },

    xaxis: {
      categories: [
        "Skin Care",
        "Botox",
        "Massoterapia",
        "Limpeza",
        "Bem-estar",
      ],

      labels: {
        style: {
          colors: "#8b8b8b",
        },
      },
    },

    yaxis: {
      labels: {
        style: {
          colors: "#8b8b8b",
        },
      },
    },

    colors: ["#c9a46c"],
  };

  const barOptionsMenosVendidos = {
    chart: {
      toolbar: {
        show: false,
      },

      background: "transparent",
    },

    dataLabels: {
      enabled: false,
    },

    plotOptions: {
      bar: {
        borderRadius: 12,
        columnWidth: "45%",
      },
    },

    grid: {
      borderColor: "#ece7e2",
    },

    xaxis: {
      categories: [
        "Peeling",
        "Argiloterapia",
        "Drenagem",
        "Laser Facial",
        "Spa Premium",
      ],

      labels: {
        style: {
          colors: "#8b8b8b",
        },
      },
    },

    yaxis: {
      labels: {
        style: {
          colors: "#8b8b8b",
        },
      },
    },

    colors: ["#d8c2a0"],
  };

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <SidebarAdmin />

      <div className="ml-72 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div
            className="
              bg-white
              border
              border-[#ece7e2]
              rounded-[2.5rem]
              p-8
              shadow-sm
              mb-10
            "
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1
                  className="
                    text-4xl
                    font-light
                    text-[#3d2b1f]
                    mb-3
                  "
                >
                  Dashboard Administrativa
                </h1>

                <p className="text-gray-500 text-lg">
                  Acompanhe os resultados da plataforma em tempo real
                </p>
              </div>
            </div>
          </div>

          {/* KPIS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            {kpis.map((item, index) => (
              <div
                key={index}
                className="
                  bg-white
                  border
                  border-[#ece7e2]
                  rounded-4xl
                  p-7
                  shadow-sm
                  hover:shadow-md
                  transition-all
                "
              >
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-[#c9a46c]/15
                      flex
                      items-center
                      justify-center
                      text-[#c9a46c]
                    "
                  >
                    {item.icon}
                  </div>
                </div>

                <p
                  className="
                    text-gray-500
                    mb-3
                    min-h-12
                    leading-relaxed
                  "
                >
                  {item.titulo}
                </p>

                <h2
                  className="
                    text-3xl
                    xl:text-4xl
                    font-semibold
                    text-[#3d2b1f]
                  "
                >
                  {item.valor}
                </h2>
              </div>
            ))}
          </div>

          {/* GRÁFICOS */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* MAIS VENDIDOS */}
            <section
              className="
                bg-white
                border
                border-[#ece7e2]
                rounded-4xl
                p-8
                shadow-sm
              "
            >
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-[#c9a46c]/15
                    flex
                    items-center
                    justify-center
                    text-[#c9a46c]
                  "
                >
                  <BookOpen size={26} />
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-[#3d2b1f]">
                    Cursos mais vendidos
                  </h2>

                  <p className="text-gray-500">Cursos com maior procura</p>
                </div>
              </div>

              <Chart
                options={barOptionsMaisVendidos}
                series={[
                  {
                    name: "Vendas",
                    data: cursosMaisVendidos,
                  },
                ]}
                type="bar"
                height={350}
              />
            </section>

            {/* MENOS VENDIDOS */}
            <section
              className="
                bg-white
                border
                border-[#ece7e2]
                rounded-4xl
                p-8
                shadow-sm
              "
            >
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-[#c9a46c]/15
                    flex
                    items-center
                    justify-center
                    text-[#c9a46c]
                  "
                >
                  <TrendingUp size={26} />
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-[#3d2b1f]">
                    Cursos menos vendidos
                  </h2>

                  <p className="text-gray-500">Cursos com menor desempenho</p>
                </div>
              </div>

              <Chart
                options={barOptionsMenosVendidos}
                series={[
                  {
                    name: "Vendas",
                    data: cursosMenosVendidos,
                  },
                ]}
                type="bar"
                height={350}
              />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
