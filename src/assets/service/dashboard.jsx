import api from "./api";

export const dashboardService = {
  buscarTop5: async () => {
    const response = await api.get("/dash/top-5");
    return response.data;
  },

  buscarVendasPorIntervalo: async (dataInicio, dataFim) => {
    const response = await api.get(
      `/dash/vendas/quantidade/${dataInicio}/${dataFim}`
    );
    return response.data;
  },

  buscarLucroSemana: async () => {
    const response = await api.get("/dash/total-lucro-semana");
    return response.data;
  },

  buscarFaturamentoTotal: async () => {
    const response = await api.get("/dash/faturamento-total");
    return response.data;
  },

  buscarTicketMedio: async () => {
    const response = await api.get("/dash/ticket-medio");
    return response.data;
  },
};