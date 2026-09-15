# 🌙 Cofre de Pensamentos

**Um projeto experimental sobre React, persistência local e conceitos de Segurança da Informação no Front-End.**

O **Cofre de Pensamentos** nasceu como um experimento de aprendizagem: explorar, na prática, como conceitos de **desenvolvimento front-end e Segurança da Informação** poderiam ser aplicados em uma pequena aplicação executada inteiramente no navegador.

A ideia era simples: criar um espaço onde pensamentos pudessem ser escritos, protegidos e armazenados localmente, enquanto eu estudava conceitos como **hash, criptografia, gerenciamento de estado e persistência de dados**.

Mais do que construir uma aplicação pronta para produção, o projeto foi pensado como um **laboratório de aprendizagem** — um espaço para experimentar, testar, encontrar limitações e entender melhor as tecnologias utilizadas.

---
## ✨ Veja no ar!

[![GITHUB](https://img.shields.io/badge/GITHUB-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ssaralopes)
[![🗝️ NO AR](https://img.shields.io/badge/🗝️%20NO%20AR-00C851?style=for-the-badge)](https://ssaralopes.github.io/cofre-de-pensamentos/)

---

## ✨ Por que este projeto existe?

Durante meus estudos em Desenvolvimento de Software e Segurança da Informação, comecei a perceber que segurança não precisa ser discutida somente quando existe um servidor, uma API ou um banco de dados.

Uma aplicação front-end também recebe, manipula, apresenta e pode armazenar informações.

A partir disso surgiu a pergunta que deu origem ao projeto:

> **Como posso experimentar conceitos de proteção de dados em uma aplicação que funciona exclusivamente no front-end?**

O Cofre de Pensamentos foi construído como uma resposta experimental para essa pergunta.

Por isso, a arquitetura é propositalmente simples:

```text
Usuário
   ↓
React
   ↓
Estado da aplicação
   ↓
Hash / Criptografia
   ↓
localStorage
   ↓
Navegador
```

Não há API, servidor ou banco de dados responsável pelo armazenamento dos pensamentos.

Essa não é uma limitação acidental da primeira versão: **faz parte da proposta do experimento.**

---

## 🧩 O que não foi utilizado?

O projeto foi construído propositalmente sem:

* API;
* banco de dados;
* servidor de autenticação;
* autenticação externa;
* serviço de armazenamento em nuvem.

A ausência desses recursos não significa que sejam desconhecidos ou que tenham sido esquecidos durante a implementação.

Ela faz parte da proposta do projeto: **estudar uma aplicação que realiza seu fluxo de dados no próprio navegador**, utilizando o `localStorage` como mecanismo de persistência.

APIs, bancos de dados, autenticação com back-end e sincronização entre dispositivos ficam como possibilidades para estudos futuros e para outros projetos.

---

# 🔐 O que acontece com os dados?

Uma das principais preocupações durante o desenvolvimento foi evitar que os pensamentos fossem simplesmente armazenados como texto puro.

O projeto trabalha com dois conceitos diferentes:

### Hash da senha

A senha informada pelo usuário passa por **SHA-256** antes de ser armazenada.

```text
Senha digitada
      ↓
   SHA-256
      ↓
     Hash
      ↓
  localStorage
```

O hash é armazenado na chave:

```text
vault-password-hash
```

A senha original não é armazenada diretamente.

Quando o usuário tenta entrar novamente, a senha informada passa pelo mesmo processo e o resultado é comparado com o hash armazenado.

---

### Criptografia dos pensamentos

Os pensamentos possuem outro tratamento.

Antes de serem persistidos no navegador, os dados passam por **criptografia simétrica AES**, utilizando a biblioteca `CryptoJS`.

```text
Pensamento
    ↓
Criptografia AES
    ↓
Texto cifrado
    ↓
localStorage
```

Ao acessar o cofre:

```text
Texto cifrado
    ↓
Processo de descriptografia
    ↓
Pensamento original
    ↓
Interface
```

Os pensamentos criptografados são armazenados na chave:

```text
vault-data
```

---

## 🧠 Hash não é criptografia

Uma das coisas que este projeto também ajudou a compreender foi que **hash e criptografia não são a mesma coisa**.

### Hash

É utilizado aqui para a **verificação da senha**.

```text
senha → hash → comparação
```

### Criptografia

É utilizada para **proteger os pensamentos armazenados**.

```text
pensamento → criptografia → dado cifrado
```

A criptografia utilizada no projeto permite que os dados sejam posteriormente recuperados por meio do processo de descriptografia.

Já o hash utilizado para a senha funciona como uma representação derivada que pode ser comparada durante a verificação.

Essa distinção foi um dos conceitos importantes estudados durante o desenvolvimento.

---

# 💾 Por que `localStorage`?

O uso do `localStorage` foi uma escolha deliberada.

O objetivo do projeto não era construir uma arquitetura tradicional como:

```text
React
  ↓
API
  ↓
Banco de dados
```

A proposta era justamente experimentar uma aplicação **100% front-end**, utilizando o próprio navegador como ambiente de persistência:

```text
React
  ↓
Navegador
  ↓
localStorage
```

Isso permitiu estudar como uma aplicação pode manter dados entre diferentes sessões sem depender de um servidor.

Também tornou possível observar uma característica importante desse tipo de armazenamento:

**os dados não são sincronizados automaticamente entre diferentes computadores ou navegadores.**

Se os dados foram armazenados no navegador de um computador, outro computador não possui automaticamente aquele mesmo `localStorage`.

Isso acontece porque a persistência é local ao ambiente do navegador e à origem da aplicação.

---

# ⚛️ React e arquitetura

O projeto foi desenvolvido utilizando **React** e uma estrutura baseada em componentes.

A aplicação possui duas áreas principais:

```text
App
├── Login
└── Vault
```

O `App` controla o estado geral de autenticação e determina qual área deve ser apresentada.

### Login

Responsável pela entrada do usuário e pela verificação local da senha.

### Vault

Responsável pelo conteúdo do cofre e pelas operações relacionadas aos pensamentos.

### ThoughtModal

Responsável pela criação de novos pensamentos e pela escolha da carta associada à nota.

### ReadMoreModal

Responsável pela leitura completa de pensamentos maiores.

### cryptoUtils

Centraliza as funções relacionadas ao hash e à criptografia.

---

# 📂 Estrutura do projeto

```text
cofre-de-pensamentos/
│
├── public/
│   ├── img/
│   │   ├── estrelas.png
│   │   ├── lua.png
│   │   └── sol.png
│   │
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Vault.jsx
│   │   ├── ThoughtModal.jsx
│   │   └── ReadMoreModal.jsx
│   │
│   ├── utils/
│   │   └── cryptoUtils.js
│   │
│   ├── App.jsx
│   ├── index.js
│   └── index.css
│
├── package.json
├── package-lock.json
└── README.md
```

A separação foi feita para que cada componente possuísse uma responsabilidade mais específica e para que a lógica relacionada à criptografia não ficasse misturada diretamente com a interface.

---

# 📝 Funcionalidades

Atualmente, o Cofre de Pensamentos permite:

* criar uma senha na primeira utilização;
* verificar a senha em acessos posteriores;
* gerar hash SHA-256;
* armazenar o hash localmente;
* criar pensamentos;
* selecionar uma carta para cada pensamento;
* criptografar os pensamentos;
* persistir os dados no `localStorage`;
* visualizar os pensamentos em cards;
* excluir pensamentos;
* identificar textos maiores;
* utilizar **“Continuar lendo”**;
* abrir um modal de leitura completa;
* sair do cofre;
* recuperar os pensamentos armazenados após a autenticação.

---

# 🃏 O Tarô dos Pensamentos

Além da parte técnica, o projeto possui uma camada visual e conceitual própria.

Cada pensamento pode receber uma das três cartas:

### ⭐ Estrelas

Representam:

**sonhos, desejos e esperanças.**

### 🌙 Lua

Representa:

**sentimentos, dúvidas e pensamentos mais profundos.**

### ☀️ Sol

Representa:

**clareza, alegrias, conquistas e boas memórias.**

A escolha da carta não altera o mecanismo de criptografia.

Ela faz parte da **experiência visual e da organização simbólica dos pensamentos**.

---

# 🎨 Direção visual

A interface foi pensada para fugir da aparência tradicional de uma aplicação de gerenciamento de notas.

Em vez de um dashboard convencional, a proposta visual é representar o projeto como um **espaço digital íntimo**, quase como um pequeno templo dedicado aos pensamentos.

Cada elemento possui uma função dentro dessa metáfora:

```text
senha
  ↓
chave

login
  ↓
portal

cofre
  ↓
espaço protegido

pensamento
  ↓
relíquia / memória

criptografia
  ↓
proteção

leitura
  ↓
momento de contemplação
```

As primeiras referências visuais passaram por elementos **vintage, dark academia, balletcore, cartas simbólicas e céu noturno**.

Ao longo do desenvolvimento, a direção foi sendo refinada para evitar que a interface parecesse um jogo de fantasia ou um RPG.

A intenção passou a ser algo mais:

* poético;
* introspectivo;
* silencioso;
* delicado;
* noturno;
* misterioso;
* pessoal.

---

# 🌌 Identidade visual

A identidade visual utiliza principalmente tons profundos de verde, violeta e roxo, combinados com detalhes claros e metálicos.

Entre as cores utilizadas durante o desenvolvimento estão:

| Cor              | Hexadecimal | Uso                              |
| ---------------- | ----------- | -------------------------------- |
| Verde profundo   | `#1a2c20`   | áreas da interface               |
| Verde escuro     | `#2b4232`   | elementos da tela de login       |
| Violeta profundo | `#1e1426`   | interior do cofre                |
| Roxo             | `#2b1d37`   | cards e modais                   |
| Roxo             | `#4b2f60`   | botões                           |
| Dourado          | `#b0894e`   | detalhes e elementos de destaque |
| Dourado claro    | `#dcbe89`   | títulos e detalhes               |
| Marfim           | `#fff9ef`   | textos claros                    |
| Cinza claro      | `#c4c4c4`   | textos secundários               |

A paleta foi sendo construída conforme a interface evoluía, e não como um sistema de design fechado desde o início.

Essa evolução faz parte do próprio processo experimental do projeto.

---

# ✒️ Tipografia

A fonte **Cinzel** foi escolhida para títulos e elementos de maior destaque.

A escolha busca transmitir uma sensação:

* clássica;
* delicada;
* quase cerimonial;
* relacionada à estética das cartas e do conceito do cofre.

A tipografia também foi utilizada como parte da diferenciação entre a identidade visual e a função prática da aplicação.

---

# 🪟 Experiência de leitura

Uma preocupação durante o desenvolvimento foi evitar que pensamentos longos ocupassem excessivamente os cards.

Por isso, textos maiores podem ser apresentados de forma resumida:

```text
Pensamento...
Pensamento...
Pensamento...

[ Continuar lendo ]
```

O usuário pode então abrir o conteúdo completo em um modal.

Essa decisão surgiu da tentativa de equilibrar **estética e usabilidade**.

O objetivo era manter os cards visualmente limpos sem impedir que pensamentos maiores fossem armazenados.

---

# 🌱 Por que os pensamentos não podem ser editados?

A ausência de uma função para editar pensamentos já salvos é **uma decisão proposital de conceito e experiência**, e não uma funcionalidade esquecida ou uma limitação acidental do projeto.

A ideia do Cofre de Pensamentos é representar os pensamentos de uma forma mais **orgânica e espontânea**.

Nem todo pensamento nasce como uma ideia completamente estruturada.

Às vezes ele aparece como:

```text
uma palavra

uma frase

uma linha solta

uma ideia incompleta

algo que surgiu naquele momento
```

Esses fragmentos podem, juntos, representar um pensamento ou um momento específico.

Por isso, depois que um pensamento é salvo, ele não pode ser alterado.

A proposta é preservar aquele registro como ele foi escrito naquele momento, em vez de transformá-lo posteriormente em uma versão "corrigida" ou "melhorada".

Existe também uma relação simbólica por trás dessa escolha:

> **Nós podemos escrever sobre um pensamento, mas não podemos voltar ao momento exato em que ele surgiu e editá-lo. **
>
> ---
>
> **Nota da Dev: **
>
> “A edição não foi implementada de propósito. Eu quis que o projeto fugisse um pouco da lógica tradicional de um aplicativo de notas. Pensamentos nem sempre são textos completos ou ideias organizadas; às vezes são fragmentos que registramos naquele momento. Então a proposta do Cofre é preservar aquele registro como ele foi escrito, em vez de permitir que ele seja posteriormente editado.”

Nesse sentido, o Cofre funciona mais como um **registro de pensamentos** do que como um aplicativo tradicional de anotações.

A exclusão continua disponível quando o usuário não deseja mais manter determinado registro, mas a edição não faz parte da proposta atual.

Essa escolha faz parte da identidade do projeto e reforça a ideia de que o cofre guarda não apenas textos, mas **fragmentos de momentos e pensamentos como eles foram registrados**.

O objetivo era manter os cards visualmente limpos sem impedir que pensamentos maiores fossem armazenados.

---

# 🧪 O que eu queria aprender

O projeto foi desenvolvido principalmente como uma forma de transformar conteúdos estudados em experimentação prática.

## Desenvolvimento

* React;
* JavaScript;
* componentes;
* props;
* `useState`;
* `useEffect`;
* eventos;
* renderização condicional;
* manipulação de arrays e objetos;
* modais;
* organização de código;
* CSS;
* responsividade.

## Segurança da Informação

* diferença entre hash e criptografia;
* SHA-256;
* criptografia simétrica;
* AES;
* proteção de dados antes da persistência;
* autenticação local;
* armazenamento de informações no navegador;
* limitações de uma aplicação exclusivamente front-end.

## Armazenamento

* `localStorage`;
* persistência de dados;
* recuperação de dados;
* diferença entre estado da aplicação e armazenamento persistente.

## Desenvolvimento de projetos

* Git;
* GitHub;
* organização de repositório;
* build de produção;
* publicação de uma aplicação React no GitHub Pages.

---

# 🧠 O que este projeto me ensinou

O principal aprendizado não foi simplesmente descobrir como fazer um pensamento aparecer na tela.

Foi entender que **uma decisão técnica sempre acontece dentro de um contexto**.

### Por que não existe uma API?

Porque a proposta deste experimento era justamente estudar uma aplicação exclusivamente front-end.

### Por que utilizar `localStorage`?

Porque o objetivo era experimentar persistência local no navegador, sem depender de um servidor ou banco de dados.

### Por que existe hash?

Para estudar a diferença entre armazenar diretamente uma senha e armazenar uma representação derivada dela para posterior verificação.

### Por que utilizar criptografia?

Porque os pensamentos são dados que, dentro da proposta do projeto, não deveriam ser persistidos simplesmente como texto puro.

### Por que React?

Porque o projeto também serviu como exercício de componentização, gerenciamento de estado e construção de uma aplicação front-end completa.

A partir dessas decisões, o projeto deixou de ser apenas uma aplicação visual e passou a funcionar como um pequeno laboratório para compreender a relação entre **software, dados e segurança**.

---

# ⚠️ Limitações do experimento

É importante deixar claro o que este projeto **não pretende ser**.

O Cofre de Pensamentos não é um sistema de armazenamento seguro para produção e não substitui uma arquitetura real de autenticação, gerenciamento de chaves ou proteção de dados.

Por ser uma aplicação exclusivamente front-end:

* não existe servidor de autenticação;
* não existe API;
* não existe banco de dados;
* não existe sincronização entre dispositivos;
* os dados dependem do armazenamento local do navegador;
* a segurança da aplicação está limitada ao ambiente em que o código é executado.

Além disso, a utilização de SHA-256 neste projeto foi uma escolha **educacional para estudar o conceito de hash**, e não uma recomendação de arquitetura para armazenamento de senhas em sistemas reais.

Em aplicações de produção, o armazenamento de credenciais exige mecanismos específicos para derivação e proteção de senhas.

Essas limitações são parte importante do aprendizado proporcionado pelo projeto.

---

# 🚧 Próximos aprendizados

O projeto pode continuar evoluindo conforme novos conceitos forem estudados.

Alguns dos próximos temas que podem ser explorados são:

* derivação de chaves;
* gerenciamento de chaves criptográficas;
* armazenamento seguro de credenciais;
* ameaças específicas de aplicações front-end;
* segurança de aplicações web;
* APIs;
* autenticação com back-end;
* bancos de dados;
* comunicação entre front-end e back-end;
* sincronização de dados entre dispositivos.

A ideia não é necessariamente transformar o Cofre de Pensamentos em uma aplicação de produção, mas utilizar o projeto como ponto de partida para compreender esses conceitos em projetos futuros.

---

# 🚀 Executando localmente

Clone o repositório:

```bash
git clone https://github.com/ssaralopes/cofre-de-pensamentos.git
```

Entre na pasta:

```bash
cd cofre-de-pensamentos
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm start
```

A aplicação será aberta no ambiente de desenvolvimento do Create React App.

Para gerar a versão de produção:

```bash
npm run build
```

Para publicar a versão de produção no GitHub Pages:

```bash
npm run deploy
```

---

# 🌐 Projeto online

O projeto está publicado no GitHub Pages:

[![🗝️ NO AR](https://img.shields.io/badge/🗝️%20NO%20AR-00C851?style=for-the-badge)](https://ssaralopes.github.io/cofre-de-pensamentos/)

O código-fonte está disponível no GitHub:

[![Repositório GitHub](https://img.shields.io/badge/GitHub-4e0c7a?style=for-the-badge\&logo=github\&logoColor=white)](https://github.com/ssaralopes/cofre-de-pensamentos)

---

# 💜 Sobre

Sara Lopes

Estudante de Engenharia de Software, formada em Análise e Desenvolvimento de Sistemas e interessada em explorar a relação entre desenvolvimento de software, Segurança da Informação, proteção de dados e tecnologia.

Este projeto faz parte da minha trajetória de aprendizagem em **Desenvolvimento de Software e Segurança da Informação** e representa uma tentativa de transformar conceitos estudados em experimentos práticos, aprendendo não apenas **como implementar uma funcionalidade**, mas também **por que determinada decisão foi tomada, quais são suas limitações e em que contexto ela faz sentido**.

Este projeto continua sendo um experimento em evolução.

E talvez essa seja justamente a parte mais importante dele:

> **Não ser um projeto perfeito, mas um registro de coisas que aprendi construindo.**

---

## 🌙 Contato

Se este projeto despertou sua curiosidade, você pode me encontrar por aqui:

[![GitHub](https://img.shields.io/badge/GitHub-000000?style=for-the-badge\&logo=github\&logoColor=white)](https://github.com/ssaralopes)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge\&logo=linkedin\&logoColor=white)](https://www.linkedin.com/in/ssaralopes/)

---
<p align="center">
  📚 <strong>> Aprender tecnologia também é experimentar, testar, errar, investigar e entender por que as coisas funcionam — ou não funcionam.</strong> 
</p>
