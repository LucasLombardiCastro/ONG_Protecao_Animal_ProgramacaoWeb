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

### 2. Inicializando o servidor
```bash
npm run dev
```
Após inicializar o servidor, o acesso o seu navegador padrão em http://localhost:3000

### Alunos
* Lucas Lombardi Castro - 13672978
* Vinícius Morotti - 15491876
