import './AboutPage.css';

export default function AboutPage() {
  return (
    <div className="about-page">

      <div className="about-hero">
        <h1>Sobre o <span>CarroBom</span></h1>
        <p>Conectando pessoas aos melhores veículos do mercado desde 2020.</p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <div className="about-icon">🚗</div>
          <h3>Nossa Missão</h3>
          <p>
            Facilitar a compra e venda de veículos usados com transparência,
            segurança e praticidade. Acreditamos que encontrar o carro ideal
            deve ser uma experiência simples e confiável.
          </p>
        </div>

        <div className="about-card">
          <div className="about-icon">🔍</div>
          <h3>O que oferecemos</h3>
          <p>
            Uma plataforma intuitiva com mais de 5.000 anúncios ativos,
            filtros avançados de busca, histórico de manutenção e avaliação
            de preço de mercado em tempo real.
          </p>
        </div>

        <div className="about-card">
          <div className="about-icon">🛡️</div>
          <h3>Segurança em 1° lugar</h3>
          <p>
            Todos os anunciantes passam por verificação de identidade.
            Utilizamos criptografia de ponta a ponta para proteger seus
            dados e transações.
          </p>
        </div>
      </div>

      <div className="about-stats">
        <div className="stat">
          <strong>5.200+</strong>
          <span>Veículos anunciados</span>
        </div>
        <div className="stat">
          <strong>12.000+</strong>
          <span>Usuários cadastrados</span>
        </div>
        <div className="stat">
          <strong>98%</strong>
          <span>Satisfação dos clientes</span>
        </div>
        <div className="stat">
          <strong>4 anos</strong>
          <span>No mercado</span>
        </div>
      </div>

      <div className="about-creator">
        <div className="creator-avatar">RP</div>
        <div className="creator-info">
          <span className="creator-label">Criador &amp; Desenvolvedor</span>
          <h2>Rodrigo Petrelli Glir</h2>
          <p>
            Desenvolvedor full-stack apaixonado por tecnologia e automóveis.
            Criou o CarroBom em 2020 com o objetivo de modernizar o mercado
            de veículos usados no Brasil, unindo design intuitivo e
            tecnologia de ponta.
          </p>
          <div className="creator-tags">
            <span>Node.js</span>
            <span>React</span>
            <span>MySQL</span>
            <span>UI/UX</span>
          </div>
        </div>
      </div>

    </div>
  );
}
