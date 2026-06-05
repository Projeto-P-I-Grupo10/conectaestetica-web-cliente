import api from "./api";

export const dashboardService = {
  buscarTop5: async () => {
    const response = await api.get("/dash/top5");
    return response.data;
  },

  buscarVendasPorIntervalo: async (dataInicio, dataFim) => {
    const response = await api.get(
      `/dash/qtdVendasNumDeterminadoIntervalo/${dataInicio}/${dataFim}`
    );
    return response.data;
  },

  buscarLucroSemana: async () => {
    const response = await api.get("/dash/totalLucroSemena");
    return response.data;
  },

  buscarFaturamentoTotal: async () => {
    const response = await api.get("/dash/faturamentoTotal");
    return response.data;
  },

  buscarTicketMedio: async () => {
    const response = await api.get("/dash/ticketMedio");
    return response.data;
  },
};