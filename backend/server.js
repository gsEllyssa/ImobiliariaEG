import contratoRotas from './routes/contratoRotas.js';
import pagamentoRotas from './routes/pagamentoRotas.js';
import imovelRotas from './routes/imovelRotas.js';
import reciboRotas from './routes/reciboRotas.js';
import inquilinoRotas from './routes/inquilinoRotas.js';

app.use('/api/contratos', contratoRotas);
app.use('/api/pagamentos', pagamentoRotas);
app.use('/api/imoveis', imovelRotas);
app.use('/api/recibos', reciboRotas);
app.use('/api/inquilinos', inquilinoRotas);

app.use(debugRoutes);


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🟢 Conectado ao MongoDB'))
  .catch(err => console.error('🔴 Erro ao conectar no MongoDB', err));

app.use('/api/tenants', tenantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
