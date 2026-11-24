export type Trimester = 1 | 2 | 3;
export type ProjectCategory = 'HTML' | 'JavaScript' | 'Google AI';
export type ProjectKind = 'web' | 'js-raw' | 'github-repo';

export interface RawSourceFile {
  name: string;
  rawUrl: string;
  isJson?: boolean;
  fallbackContent?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  trimester: Trimester;
  category: ProjectCategory;
  kind: ProjectKind;
  url: string;
  authors: 'Miguel Bespalhok' | 'Miguel & Alifer';
  description: string;
  rawFiles?: RawSourceFile[];
  fallbackCode?: string;
}

export interface CourseItem {
  id: string;
  title: string;
  subtitle: string;
  topics: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  src: string;
  alt: string;
}

const ASSET_BASE = 'https://miguel09231309.github.io/portfolio';

export const SCHOOL_INFO = {
  name: 'Colégio Unidade Polo',
  city: 'Arapongas, PR',
  address: 'Rua Pavão, 831 — Centro, Arapongas - PR, 86700-215',
  year: 2026,
  logoUrl: `${ASSET_BASE}/simbolo.png`,
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=Rua%20Pavao%2C%20831%2C%20Centro%2C%20Arapongas%20-%20PR&t=&z=16&ie=UTF8&iwloc=&output=embed',
  mapsExternalUrl:
    'https://www.google.com/maps/search/?api=1&query=Rua+Pav%C3%A3o%2C+831+-+Centro%2C+Arapongas+-+PR%2C+86700-215',
};

export const PROFILE_INFO = {
  name: 'Miguel Bespalhok',
  role: 'Desenvolvedor Front-End',
  bio: 'Estudante e desenvolvedor apaixonado por criar interfaces modernas, acessíveis e funcionais. No Colégio Unidade Polo, aplico HTML, CSS, JavaScript e React para construir aplicações educacionais, jogos e sistemas com Inteligência Artificial.',
  linkedinUrl: 'https://www.linkedin.com/in/miguel-bespalhok-5565802a1/?skipRedirect=true',
  githubUrl: 'https://github.com/Miguel09231309',
};

export const COURSES: CourseItem[] = [
  {
    id: 'tds',
    title: 'Técnico em Desenvolvimento de Sistemas',
    subtitle: 'Base completa de engenharia web e lógica de programação',
    topics: [
      'HTML, CSS e JavaScript moderno',
      'Desenvolvimento Front-end e Back-end',
      'Modelagem e Banco de Dados SQL',
      'Versionamento de código com Git e GitHub',
    ],
  },
  {
    id: 'ia',
    title: 'Inteligência Artificial e Dados',
    subtitle: 'Fundamentos práticos de análise e automação inteligente',
    topics: [
      'Python e análise com Pandas',
      'Machine Learning introdutório',
      'Visualização e leitura de dados',
      'Ética, segurança e privacidade digital',
    ],
  },
  {
    id: 'projetos',
    title: 'Projetos Interdisciplinares',
    subtitle: 'Aplicação prática conectada à comunidade escolar',
    topics: [
      'Feiras científicas e tecnológicas',
      'Atividades extracurriculares de tecnologia',
      'Orientação de carreira e portfólio',
    ],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'entrada',
    title: 'Entrada Principal',
    caption: 'Fachada e acesso principal do Colégio Unidade Polo em Arapongas.',
    src: `${ASSET_BASE}/entrada.png`,
    alt: 'Entrada do Colégio Unidade Polo',
  },
  {
    id: 'quadras',
    title: 'Quadras Esportivas',
    caption: 'Espaço esportivo integrado para atividades físicas e eventos escolares.',
    src: `${ASSET_BASE}/quadras_polo.jpeg`,
    alt: 'Quadras esportivas do Colégio Unidade Polo',
  },
  {
    id: 'secretaria',
    title: 'Secretaria Escolar',
    caption: 'Atendimento aos alunos, famílias e organização acadêmica.',
    src: `${ASSET_BASE}/secretaria.png`,
    alt: 'Secretaria do Colégio Unidade Polo',
  },
];

export const PROJECTS: PortfolioProject[] = [
  // 1º Trimestre — HTML (7)
  {
    id: 'q1-html-teste',
    title: 'Teste HTML',
    trimester: 1,
    category: 'HTML',
    kind: 'web',
    url: 'https://alifer2211.github.io/teste.html/teste.html',
    authors: 'Miguel & Alifer',
    description: 'Primeiro experimento de estruturação de página HTML e elementos semânticos.',
  },
  {
    id: 'q1-html-jogo',
    title: 'Jogo',
    trimester: 1,
    category: 'HTML',
    kind: 'web',
    url: 'https://alifer2211.github.io/jogo/jogo.html',
    authors: 'Miguel & Alifer',
    description: 'Protótipo interativo de jogo web desenvolvido em parceria nas aulas iniciais.',
  },
  {
    id: 'q1-html-2048',
    title: 'Jogo 2048',
    trimester: 1,
    category: 'HTML',
    kind: 'web',
    url: 'https://alifer2211.github.io/jogo-2048/jogo.html',
    authors: 'Miguel & Alifer',
    description: 'Recriação do quebra-cabeça numérico 2048 diretamente no navegador.',
  },
  {
    id: 'q1-html-gamma',
    title: 'Todos do gamma',
    trimester: 1,
    category: 'HTML',
    kind: 'web',
    url: 'https://miguel09231309.github.io/links/links.html',
    authors: 'Miguel Bespalhok',
    description: 'Central de acesso reunindo links e materiais desenvolvidos com Gamma.',
  },
  {
    id: 'q1-html-pacman',
    title: 'Pac-Man',
    trimester: 1,
    category: 'HTML',
    kind: 'web',
    url: 'https://miguel09231309.github.io/Pac-Man/pac-man.html',
    authors: 'Miguel Bespalhok',
    description: 'Versão web inspirada no clássico arcade Pac-Man com movimentação em grade.',
  },
  {
    id: 'q1-html-snack',
    title: 'Snack expo',
    trimester: 1,
    category: 'HTML',
    kind: 'web',
    url: 'https://miguel09231309.github.io/snack-expo/snack.html',
    authors: 'Miguel Bespalhok',
    description: 'Página de demonstração e links para experimentos mobile com Expo Snack.',
  },
  {
    id: 'q1-html-linksdocs',
    title: 'Links docs',
    trimester: 1,
    category: 'HTML',
    kind: 'web',
    url: 'https://miguel09231309.github.io/linksdocs/linkdocs.html',
    authors: 'Miguel Bespalhok',
    description: 'Repositório organizado com referências e documentos de estudo da turma.',
  },

  // 1º Trimestre — JavaScript (16)
  {
    id: 'q1-js-teste',
    title: 'Teste',
    trimester: 1,
    category: 'JavaScript',
    kind: 'js-raw',
    url: 'https://alifer2211.github.io/teste.js/teste.js',
    authors: 'Miguel & Alifer',
    description: 'Primeiros testes com console.log, variáveis numéricas e operações aritméticas.',
  },
  {
    id: 'q1-js-teste2',
    title: 'Teste2',
    trimester: 1,
    category: 'JavaScript',
    kind: 'js-raw',
    url: 'https://alifer2211.github.io/teste2.js/teste2.js',
    authors: 'Miguel & Alifer',
    description: 'Cálculo da área do triângulo utilizando variáveis de base e altura.',
  },
  {
    id: 'q1-js-teste3',
    title: 'Teste3',
    trimester: 1,
    category: 'JavaScript',
    kind: 'js-raw',
    url: 'https://alifer2211.github.io/teste3.js/teste3.js',
    authors: 'Miguel & Alifer',
    description: 'Cálculo geométrico com multiplicação encadeada e exibição formatada.',
  },
  {
    id: 'q1-js-carro',
    title: 'Carro',
    trimester: 1,
    category: 'JavaScript',
    kind: 'js-raw',
    url: 'https://alifer2211.github.io/carro.js/carro.js',
    authors: 'Miguel & Alifer',
    description: 'Cálculo de consumo e gasto de combustível usando template strings.',
  },
  {
    id: 'q1-js-notas',
    title: 'Notas',
    trimester: 1,
    category: 'JavaScript',
    kind: 'js-raw',
    url: 'https://alifer2211.github.io/notas.js/notas.js',
    authors: 'Miguel & Alifer',
    description: 'Soma e média simples de quatro notas bimestrais de um aluno.',
  },
  {
    id: 'q1-js-media',
    title: 'Media',
    trimester: 1,
    category: 'JavaScript',
    kind: 'js-raw',
    url: 'https://alifer2211.github.io/media/media_se.js',
    authors: 'Miguel & Alifer',
    description: 'Cálculo de média escolar com estruturas condicionais (if/else).',
  },
  {
    id: 'q1-js-variaveis',
    title: 'Variaveis',
    trimester: 1,
    category: 'JavaScript',
    kind: 'js-raw',
    url: 'https://alifer2211.github.io/variaveis.js/variaveis.js',
    authors: 'Miguel & Alifer',
    description: 'Manipulação de variáveis let, reatribuições e operações combinadas.',
  },
  {
    id: 'q1-js-brake',
    title: 'Brake',
    trimester: 1,
    category: 'JavaScript',
    kind: 'js-raw',
    url: 'https://miguel09231309.github.io/brake_continue/brake_continue.js',
    authors: 'Miguel Bespalhok',
    description: 'Simulação de controle de vagas de estacionamento com break e continue.',
  },
  {
    id: 'q1-js-objeto',
    title: 'Objeto',
    trimester: 1,
    category: 'JavaScript',
    kind: 'js-raw',
    url: 'https://miguel09231309.github.io/objeto/objeto.js',
    authors: 'Miguel Bespalhok',
    description: 'Criação, leitura por ponto/colchetes e atualização de propriedades de objeto.',
  },
  {
    id: 'q1-js-filtrar',
    title: 'Filtrar',
    trimester: 1,
    category: 'JavaScript',
    kind: 'js-raw',
    url: 'https://miguel09231309.github.io/Filtrar/Filtrar.js',
    authors: 'Miguel Bespalhok',
    description: 'Uso de métodos de array (find, filter, map, sort) em lista de usuários.',
  },
  {
    id: 'q1-js-2js',
    title: '2js',
    trimester: 1,
    category: 'JavaScript',
    kind: 'github-repo',
    url: 'https://github.com/Miguel09231309/2js',
    authors: 'Miguel Bespalhok',
    description: 'Leitura de JSON externo, conversão com JSON.stringify e JSON.parse.',
    rawFiles: [
      {
        name: 'leitura.js',
        rawUrl: 'https://raw.githubusercontent.com/Miguel09231309/2js/main/leitura.js',
        fallbackContent: `const dados = require("./2.cliente.json");\nconsole.log(dados);\nconsole.log(typeof dados);\nconst clienteEmString = JSON.stringify(dados);\nconsole.log(clienteEmString);\nconsole.log(typeof clienteEmString);\nconsole.log(clienteEmString.nome);\nconst objetoCliente = JSON.parse(clienteEmString);\nconsole.log(objetoCliente);`,
      },
      {
        name: 'cliente.json',
        rawUrl: 'https://raw.githubusercontent.com/Miguel09231309/2js/main/cliente.json',
        isJson: true,
        fallbackContent: `{\n  "nome": "Joao",\n  "email": "joao@firma.com",\n  "telefone": ["11223344", "11922334453"],\n  "endereco": {\n    "rua": "R. Joseph Climber",\n    "numero": 404,\n    "apartamento": true,\n    "complemento": "ap 934"\n  }\n}`,
      },
    ],
  },
  {
    id: 'q1-js-4js',
    title: '4js',
    trimester: 1,
    category: 'JavaScript',
    kind: 'github-repo',
    url: 'https://github.com/Miguel09231309/4js',
    authors: 'Miguel Bespalhok',
    description: 'Série de 4 exercícios práticos sobre objetos, colchetes, substring e imutabilidade const.',
    rawFiles: [
      {
        name: 'colchete.js',
        rawUrl: 'https://raw.githubusercontent.com/Miguel09231309/4js/main/colchete.js',
      },
      {
        name: 'substring.js',
        rawUrl: 'https://raw.githubusercontent.com/Miguel09231309/4js/main/substring.js',
      },
      {
        name: 'objet2.js',
        rawUrl: 'https://raw.githubusercontent.com/Miguel09231309/4js/main/objet2.js',
      },
      {
        name: 'alterar.js',
        rawUrl: 'https://raw.githubusercontent.com/Miguel09231309/4js/main/alterar.js',
      },
    ],
  },
  {
    id: 'q1-js-conjunto',
    title: 'Conjunto',
    trimester: 1,
    category: 'JavaScript',
    kind: 'js-raw',
    url: 'https://miguel09231309.github.io/conjuntonumero/conjuntonumero.js',
    authors: 'Miguel Bespalhok',
    description: 'Função calcularMedia recebendo conjuntos numéricos dinâmicos como parâmetro.',
  },
  {
    id: 'q1-js-exercicio',
    title: 'Exercicio',
    trimester: 1,
    category: 'JavaScript',
    kind: 'js-raw',
    url: 'https://miguel09231309.github.io/exercicio/exercicio.js',
    authors: 'Miguel Bespalhok',
    description: 'Iteração com laço for para somar notas em vetor e calcular a média final.',
  },
  {
    id: 'q1-js-frutas',
    title: 'Frutas',
    trimester: 1,
    category: 'JavaScript',
    kind: 'js-raw',
    url: 'https://miguel09231309.github.io/frutas/frutas.js',
    authors: 'Miguel Bespalhok',
    description: 'Manipulação de listas com push, pop, shift, unshift e verificação de tamanho.',
  },
  {
    id: 'q1-js-listalivros',
    title: 'Lista livros',
    trimester: 1,
    category: 'JavaScript',
    kind: 'js-raw',
    url: 'https://miguel09231309.github.io/listalivros/listalivros.js',
    authors: 'Miguel Bespalhok',
    description: 'Catálogo de livros em array de objetos com análise e comparação de preços.',
  },

  // 2º Trimestre — HTML (2 links reais)
  {
    id: 'q2-html-locafacil',
    title: 'LocaFacíl',
    trimester: 2,
    category: 'HTML',
    kind: 'web',
    url: 'https://locafacil-vb33.onrender.com/',
    authors: 'Miguel Bespalhok',
    description: 'Aplicação web para gerenciamento e divulgação de locações publicada no Render.',
  },
  {
    id: 'q2-html-fuelsense',
    title: 'FuelSense',
    trimester: 2,
    category: 'HTML',
    kind: 'web',
    url: 'https://benign-rota-flow-go.base44.app',
    authors: 'Miguel Bespalhok',
    description: 'Sistema web voltado ao controle inteligente de rotas e consumo de combustível.',
  },

  // 2º Trimestre — Google AI (5)
  {
    id: 'q2-ai-financas',
    title: 'Easy Finanças',
    trimester: 2,
    category: 'Google AI',
    kind: 'web',
    url: 'https://miguel09231309.github.io/Financia/index.html',
    authors: 'Miguel Bespalhok',
    description: 'Assistente e painel web de organização financeira pessoal com apoio de IA.',
  },
  {
    id: 'q2-ai-petshop',
    title: 'Pet-Shop',
    trimester: 2,
    category: 'Google AI',
    kind: 'web',
    url: 'https://miguel09231309.github.io/pet-shop/index.html',
    authors: 'Miguel Bespalhok',
    description: 'Plataforma web de atendimento, serviços e produtos para pet shop.',
  },
  {
    id: 'q2-ai-classedu',
    title: 'Class-Edu',
    trimester: 2,
    category: 'Google AI',
    kind: 'web',
    url: 'https://miguel09231309.github.io/Class-Edu/index.html',
    authors: 'Miguel Bespalhok',
    description: 'Ambiente educacional digital para organização de aulas, tarefas e turmas.',
  },
  {
    id: 'q2-ai-codelingo',
    title: 'CodeLingo',
    trimester: 2,
    category: 'Google AI',
    kind: 'web',
    url: 'https://miguel09231309.github.io/CodeLingo/index.html',
    authors: 'Miguel Bespalhok',
    description: 'Experiência gamificada para aprendizado de programação inspirada em trilhas diárias.',
  },
  {
    id: 'q2-ai-academia',
    title: 'Academia',
    trimester: 2,
    category: 'Google AI',
    kind: 'web',
    url: 'https://miguel09231309.github.io/Academia/index.html',
    authors: 'Miguel Bespalhok',
    description: 'Sistema web de acompanhamento de treinos, séries e evolução física.',
  },

  // 3º Trimestre — HTML (4)
  {
    id: 'q3-html-escola',
    title: 'Escola',
    trimester: 3,
    category: 'HTML',
    kind: 'web',
    url: 'https://miguel09231309.github.io/escola/index.html',
    authors: 'Miguel Bespalhok',
    description: 'Portal institucional escolar com informações acadêmicas e navegação estruturada.',
  },
  {
    id: 'q3-html-financia-feira',
    title: 'Financia feira',
    trimester: 3,
    category: 'HTML',
    kind: 'web',
    url: 'https://miguel09231309.github.io/financia-feira/index.html',
    authors: 'Miguel Bespalhok',
    description: 'Ferramenta criada para controle de receitas e metas financeiras em feira escolar.',
  },
  {
    id: 'q3-html-controle-vendas',
    title: 'Controle de vendas',
    trimester: 3,
    category: 'HTML',
    kind: 'web',
    url: 'https://controle-vendas-v8nd.vercel.app/',
    authors: 'Miguel Bespalhok',
    description: 'Aplicação web publicada na Vercel para registro e acompanhamento de vendas.',
  },
  {
    id: 'q3-html-biblioteca',
    title: 'Biblioteca',
    trimester: 3,
    category: 'HTML',
    kind: 'web',
    url: 'https://miguel09231309.github.io/biblioteca/index.html',
    authors: 'Miguel Bespalhok',
    description: 'Sistema web para consulta de acervo, empréstimos e organização de biblioteca.',
  },
];
