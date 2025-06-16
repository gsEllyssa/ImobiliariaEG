import React from 'react';
import '@/styles/modules/Inicio.scss';

function Inicio() {
  return (
    <>
      <Menu />
      <div className="content">
        <form className="filtro">
          <input type="date" />
          <select><option>Status</option></select>
          <select><option>M. Pagamento</option></select>
          <select><option>Imóvel</option></select>
          <input type="text" placeholder="Pesquisar" />
        </form>
        <section className="secao">
          <h1>Pagamentos</h1>
          <table className="tabela">
            <thead>
              <tr>
                <th></th>
                <th>NOME</th>
                <th>STATUS</th>
                <th>VALOR</th>
                <th>M. PAGAMENTO</th>
                <th>DATA</th>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox" /></td>
                <td>Padaria Braz LTDA</td>
                <td><i className="fa-solid fa-circle-check"></i> <span>Aprovada</span></td>
                <td>R$1.500,00</td>
                <td>Dinheiro</td>
                <td>31/Out/2024, 16:00 PM</td>
                <td></td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>Yara Lacerda Moraes</td>
                <td><i className="fa-solid fa-clock"></i> <span>Pendente</span></td>
                <td>R$1.500,00</td>
                <td>Dinheiro</td>
                <td>31/Out/2024, 16:00 PM</td>
                <td></td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>Cauan Oliveira Castro</td>
                <td><i className="fa-solid fa-circle-minus"></i> <span>Vencido</span></td>
                <td>R$1.500,00</td>
                <td>Dinheiro</td>
                <td>31/Out/2024, 16:00 PM</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="secao">
          <h1>Inquilinos</h1>
          <table className="tabela">
            <thead>
              <tr>
                <th></th>
                <th>NOME</th>
                <th>CONTRATO</th>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox" /></td>
                <td>Padaria Braz LTDA</td>
                <td><i className="fa-solid fa-circle-check"></i> <span>Ativo</span></td>
                <td></td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>Yara Lacerda Moraes</td>
                <td><i className="fa-solid fa-clock"></i> <span>Pendente</span></td>
                <td></td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>Cauan Oliveira Castro</td>
                <td><i className="fa-solid fa-circle-minus"></i> <span>Vencido</span></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="secao">
          <h1>Imóveis</h1>
          <table className="tabela">
            <thead>
              <tr>
                <th></th>
                <th>CEP</th>
                <th>STATUS</th>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox" /></td>
                <td>35160-133</td>
                <td><i className="fa-solid fa-circle-check"></i> <span>Disponível</span></td>
                <td></td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>18744-771</td>
                <td><i className="fa-solid fa-clock"></i> <span>Em Reforma</span></td>
                <td></td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>89721-882</td>
                <td><i className="fa-solid fa-circle-minus"></i> <span>Ocupado</span></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}

export default Inicio;