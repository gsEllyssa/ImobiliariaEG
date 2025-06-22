cat > services/inquilinoService.js << 'EOF'
import api from './api';

export const criarInquilino = async (dados) => {
  const response = await api.post('/inquilinos', dados);
  return response.data;
};

export const listarInquilinos = async () => {
  const response = await api.get('/inquilinos');
  return response.data;
};
EOF
