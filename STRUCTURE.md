# Roblox Utils - Estrutura Organizada

## 📁 Estrutura de Pastas

```
RobloxUtils/
├── utils/
│   ├── dom.js          # Funções de manipulação DOM
│   └── parsers.js      # Funções de parsing de dados
├── data/
│   └── greetings.js    # Dados de cumprimentos em idiomas
├── features/
│   ├── income-estimator.js    # Estimativa de renda dos jogos
│   ├── robux-converter.js     # Conversão Robux para USD
│   └── profile-customizer.js  # Personalização do perfil
├── services/
│   └── supabase-client.js     # Cliente do banco de dados
├── ui/
│   └── extension-menu.js      # Menu da extensão
├── main.js                    # Script principal
├── background.js              # Service worker
└── manifest.json              # Configuração da extensão
```

## 🚀 Ordem de Carregamento

1. `utils/dom.js` - Funções base de DOM
2. `utils/parsers.js` - Parsers de dados
3. `data/greetings.js` - Dados de idiomas
4. `features/income-estimator.js` - Estimativa de renda
5. `features/robux-converter.js` - Conversão de moeda
6. `features/profile-customizer.js` - Personalização
7. `services/supabase-client.js` - Banco de dados
8. `ui/extension-menu.js` - Interface do usuário
9. `main.js` - Inicialização

## ✨ Características

- **Código limpo**: Sem comentários desnecessários
- **Modular**: Cada funcionalidade em seu próprio arquivo
- **Organizado**: Pastas por categoria de funcionalidade
- **Manutenível**: Fácil de encontrar e editar código
- **Escalável**: Estrutura preparada para crescimento
