export default function Footer() {
  return (
    <footer className="bg-[#6B4A3A] text-white px-10 py-10">

      {/* CONTEÚDO PRINCIPAL */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* LOGO + DESCRIÇÃO */}
        <div>
          <h2 className="text-xl font-semibold text-yellow-300">
            ConectaEstética
          </h2>
          <p className="text-sm mt-2 text-gray-200">
            Curadoria digital especializada em soluções financeiras e estratégicas
            para o ecossistema de beleza e saúde.
          </p>

          {/* ÍCONES (pode trocar depois) */}
          <div className="flex gap-3 mt-4 text-sm">
            <span>🔊</span>
            <span>✉️</span>
          </div>
        </div>

        {/* PARA VOCÊ */}
        <div>
          <h3 className="text-sm font-semibold mb-3">PARA VOCÊ</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>Conta digital</li>
            <li>Créditos</li>
            <li>Investimentos</li>
            <li>Seguros</li>
            <li>Cartões</li>
          </ul>
        </div>

        {/* PARA SEU NEGÓCIO */}
        <div>
          <h3 className="text-sm font-semibold mb-3">PARA SEU NEGÓCIO</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>Crie sua loja on-line</li>
            <li>Empréstimos</li>
            <li>Vendedores</li>
            <li>Investimento Business</li>
          </ul>
        </div>

        {/* CONTATO */}
        <div>
          <h3 className="text-sm font-semibold mb-3">CONTATO</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>Telefone: 0800 555 0123</li>
            <li>Email: atelier@conecta.com</li>
            <li>Atendimento: Seg – Sex, 09h às 18h</li>
          </ul>
        </div>

      </div>

      {/* LINHA */}
      <div className="border-t border-white/20 mt-8 pt-4 flex flex-col md:flex-row justify-between text-xs text-gray-300">
        <span>© 2024 Digital Atelier. All rights reserved</span>

        <div className="flex gap-4 mt-2 md:mt-0">
          <span>Termos de uso</span>
          <span>Privacidade</span>
        </div>
      </div>

    </footer>
  );
}