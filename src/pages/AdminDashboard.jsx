import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import { BookOpen, DollarSign, TrendingUp, Wallet, LineChart } from "lucide-react";

import SidebarAdmin from "../assets/components-admin/SidebarAdmin";
import { dashboardService } from "../assets/service/dashboard";

export default function AdminDashboard() {
  const [faturamentoTotal, setFaturamentoTotal] = useState(0);
  const [ticketMedio, setTicketMedio] = useState(0);
  const [lucroSemana, setLucroSemana] = useState({
    lucroSemanaPassada: 0,
    lucroSemanaAtual: 0,
  });

  const [vendasPorDia, setVendasPorDia] = useState([]);
  const [top5, setTop5] = useState([]);

  useEffect(() => {
    buscarDadosDashboard();
  }, []);

  async function buscarDadosDashboard() {
  try {
    const hoje = new Date();
    const dataFim = hoje.toISOString().split("T")[0];

    const dataInicio = new Date();
    dataInicio.setDate(hoje.getDate() - 7);
    const dataInicioFormatada = dataInicio.toISOString().split("T")[0];

    const [faturamento, ticket, vendasIntervalo, top5Cursos] =
      await Promise.all([
        dashboardService.buscarFaturamentoTotal(),
        dashboardService.buscarTicketMedio(),
        dashboardService.buscarVendasPorIntervalo(dataInicioFormatada, dataFim),
        dashboardService.buscarTop5(),
      ]);

    setFaturamentoTotal(faturamento.faturamentoTotal || 0);
    setTicketMedio(ticket.ticketMedio || 0);
    setVendasPorDia(vendasIntervalo || []);
    setTop5(top5Cursos || []);

    try {
      const lucro = await dashboardService.buscarLucroSemana();

      setLucroSemana({
        lucroSemanaPassada: lucro.lucroSemanaPassada || 0,
        lucroSemanaAtual: lucro.lucroSemanaAtual || 0,
      });
    } catch (erroLucro) {
      console.error("Erro somente no lucro semanal:", erroLucro);

      setLucroSemana({
        lucroSemanaPassada: 0,
        lucroSemanaAtual: 0,
      });
    }
  } catch (error) {
    console.error("Erro ao buscar dados da dashboard:", error);
  }
}

  function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function calcularVariacaoPercentual(atual, passado) {
    if (!passado || passado === 0) {
      return atual > 0 ? 100 : 0;
    }

    return ((atual - passado) / passado) * 100;
  }

  const variacaoLucroPercentual = calcularVariacaoPercentual(
    lucroSemana.lucroSemanaAtual,
    lucroSemana.lucroSemanaPassada
  );
  const variacaoPositiva = variacaoLucroPercentual >= 0;

  const datasVendas = vendasPorDia.map((item) => {
    const data = new Date(item.dataCompra);

    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
  });

  const quantidadeVendas = vendasPorDia.map((item) => item.qtdCompras || 0);

  const nomesCursosMaisVendidos = top5.map((curso) => curso.nomeCurso);
  const cursosMaisVendidos = top5.map((curso) => curso.totalVendas || 0);

  
  const kpis = [
    {
      titulo: "Faturamento total",
      valor: formatarMoeda(faturamentoTotal),
      icon: <DollarSign size={24} />,
    },
    {
      titulo: "Ticket médio",
      valor: formatarMoeda(ticketMedio),
      icon: <Wallet size={24} />,
    },
    {
      titulo: "Lucro da semana",
      valor: formatarMoeda(lucroSemana.lucroSemanaAtual),
      icon: <TrendingUp size={24} />,
    },
    {
  titulo: "Variação semanal",
  valor: `${variacaoPositiva ? "+" : ""}${variacaoLucroPercentual.toFixed(1)}%`,
  icon: <TrendingUp size={24} />,
  positiva: variacaoPositiva,
},
  ];

  const lineOptionsVendasPorDia = {
    chart: {
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 5,
    },
    grid: {
      borderColor: "#ece7e2",
    },
    xaxis: {
      categories: datasVendas,
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

  const barOptionsTop5 = {
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
      categories: nomesCursosMaisVendidos,
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
          <div className="bg-white border border-[#ece7e2] rounded-[2.5rem] p-8 shadow-sm mb-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-4xl font-light text-[#3d2b1f] mb-3">
                  Dashboard Administrativa
                </h1>

                <p className="text-gray-500 text-lg">
                  Acompanhe os resultados da plataforma em tempo real
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            {kpis.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-[#ece7e2] rounded-4xl p-7 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#c9a46c]/15 flex items-center justify-center text-[#c9a46c]">
                    {item.icon}
                  </div>
                </div>

                <p className="text-gray-500 mb-3 min-h-12 leading-relaxed">
                  {item.titulo}
                </p>

                <h2
  className={`text-3xl xl:text-4xl font-semibold ${
    item.titulo === "Variação semanal"
      ? item.positiva
        ? "text-green-600"
        : "text-red-600"
      : "text-[#3d2b1f]"
  }`}
>
  {item.valor}
</h2>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <section className="bg-white border border-[#ece7e2] rounded-4xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#c9a46c]/15 flex items-center justify-center text-[#c9a46c]">
                  <LineChart size={26} />
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-[#3d2b1f]">
                    Quantidade de vendas por dia
                  </h2>

                  <p className="text-gray-500">
                    Vendas realizadas nos últimos 7 dias
                  </p>
                </div>
              </div>

              <Chart
                options={lineOptionsVendasPorDia}
                series={[
                  {
                    name: "Vendas",
                    data: quantidadeVendas,
                  },
                ]}
                type="line"
                height={350}
              />
            </section>

            <section className="bg-white border border-[#ece7e2] rounded-4xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#c9a46c]/15 flex items-center justify-center text-[#c9a46c]">
                  <BookOpen size={26} />
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-[#3d2b1f]">
                    Top 5 cursos mais vendidos
                  </h2>

                  <p className="text-gray-500">
                    Cursos com maior quantidade de vendas
                  </p>
                </div>
              </div>

              <Chart
                options={barOptionsTop5}
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
          </div>
        </div>
      </div>
    </main>
  );
}