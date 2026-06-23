# Vida Animal — Aplicação Web para ONG de Proteção Animal

Este projeto é uma plataforma web moderna e responsiva desenvolvida para uma ONG de Proteção Animal, focada em facilitar o engajamento do público e a gestão de adoções. O sistema permite que usuários conheçam animais para adoção, realizem doações e se candidatem ao voluntariado.

O projeto foi construído seguindo as especificações técnicas de interface e as regras de negócio para garantir autonomia na atualização de conteúdos.

## Tecnologias Utilizadas

* **Framework:** Next.js (App Router)
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS
* **Ícones:** Lucide-React
* **Gestão de Versão de Node:** NVM (Node Version Manager)

## Instruções para rodar local

Siga este passo a passo para configurar o ambiente e executar a aplicação no seu computador (Ubuntu/WSL2).

### 1. Pré-requisitos
Certifique-se de ter o **NVM** instalado para gerenciar a versão correta do Node.js. Caso não tenha, instale-o e garanta que está usando a versão estável mais recente:

```bash
#Instalando o NVM (Caso não esteja instalado)
sudo apt-get install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
#Testando se a instalação foi feita corretamente (rodar após fechar e abrir o termianl)
command -v nvm 

#Instalar a versão LTS do Node
nvm install --lts

#Definir como versão padrão
nvm alias default node

#Instalando as dependências
command -v nvm
```

### 2. Configuração das Variáveis de Ambiente (.env)

Antes de iniciar a aplicação, é necessário configurar as credenciais do banco de dados, autenticação e armazenamento de imagens. 

Na raiz do projeto, crie um arquivo chamado `.env` e adicione a seguinte estrutura preenchida com as suas chaves:

```env
# URL de conexão com o banco de dados PostgreSQL (ex: Neon DB)
DATABASE_URL=sua_url_do_banco_de_dados_aqui

# Chave secreta para assinatura e validação dos tokens JWT (Autenticação)
JWT_SECRET=sua_chave_secreta_aqui

# Nome da sua nuvem no Cloudinary (Armazenamento de fotos dos animais)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=seu_cloud_name_aqui

# Nome do preset configurado como "Unsigned" no Cloudinary para permitir uploads do front
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=seu_upload_preset_aqui
```

### 3. Inicializando o servidor

Como o projeto utiliza uma arquitetura serverless integrada, o ambiente local é executado utilizando o Vercel CLI, que simula o comportamento de produção da nuvem da Vercel para o Next.js e o Express.

Antes de rodar o projeto pela primeira vez, instale o Vercel CLI e faça o login na sua conta:

```bash
# Instalar o Vercel CLI globalmente
npm install -g vercel

# Fazer login na sua conta Vercel 
vercel login
```
E inicialize o ambiente integrado localmente:

```bash
vercel dev
```

Após inicializar o servidor, o acesso o seu navegador padrão em http://localhost:3000

### Alunos
* Lucas Lombardi Castro - 13672978
* Vinícius Morotti - 15491876
