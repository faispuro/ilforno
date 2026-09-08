import API from './api';

export const trackEvent = async (type) => {
  try {
    const response = await API.post('/analytics/track', { type });
    return response.data;
  } catch (error) {
    console.error('Error registrando evento de analíticas:', error);
  }
};

export const getDashboardMetrics = async () => {
  try {
    const response = await API.get('/analytics/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo métricas del dashboard:', error);
    throw error;
  }
};

export const getAnalyticsStats = async () => {
  try {
    const data = await getDashboardMetrics();

    return {
      views: Number(data?.visitasTotales ?? 0),
      clicks: Number(data?.pedirWhatsapp ?? 0),
      conversionRate: `${Number(data?.tasaConversion ?? 0).toFixed(1)}%`,
    };
  } catch (error) {
    console.error('Error calculando estadísticas de analytics:', error);
    throw error;
  }
};