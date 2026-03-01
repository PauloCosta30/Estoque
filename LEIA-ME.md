# 📋 Levantamento Técnico — BR Costa Engenharia
## Guia completo de configuração no Netlify

---

## O QUE ESTÁ NESTA PASTA

```
projeto-netlify/
├── index.html        ← Formulário principal (protegido)
├── login.html        ← Tela de login
├── netlify.toml      ← Configuração do Netlify
└── LEIA-ME.md        ← Este guia
```

---

## PASSO A PASSO — CONFIGURAÇÃO INICIAL

### PASSO 1 — Criar conta no Netlify (gratuito)
1. Acesse **https://netlify.com**
2. Clique em **"Sign up"**
3. Cadastre-se com seu e-mail ou conta Google

---

### PASSO 2 — Subir os arquivos

**Opção A — Arrastar e soltar (mais fácil):**
1. No painel do Netlify, clique em **"Add new site"**
2. Escolha **"Deploy manually"**
3. **Arraste a pasta `projeto-netlify` inteira** para a área indicada
4. Aguarde o deploy (leva ~30 segundos)

**Opção B — Via GitHub (recomendado para atualizações futuras):**
1. Suba a pasta para um repositório GitHub **privado**
2. No Netlify: **"Add new site" → "Import from Git"**
3. Conecte ao repositório
4. Clique em **"Deploy"**

---

### PASSO 3 — Ativar o Netlify Identity (sistema de login)

1. No painel do seu site no Netlify, clique na aba **"Identity"**
2. Clique no botão **"Enable Identity"**
3. Em **"Registration"**, selecione **"Invite only"**
   ⚠️ Isso garante que SOMENTE quem você convidar terá acesso!
4. Clique em **"Save"**

---

### PASSO 4 — Configurar URL do site (opcional mas recomendado)

1. Vá em **"Site configuration" → "Change site name"**
2. Coloque um nome profissional, ex: `brcosta-levantamento`
3. O link ficará: `https://brcosta-levantamento.netlify.app`

---

### PASSO 5 — Convidar usuários (clientes/técnicos)

1. Na aba **"Identity"** do seu site
2. Clique em **"Invite users"**
3. Digite o e-mail de quem vai ter acesso
4. Clique em **"Send"**
5. A pessoa receberá um e-mail para criar a senha dela

✅ Pronto! Só quem você convidar consegue acessar o formulário.

---

## GERENCIANDO USUÁRIOS

### Adicionar novo usuário:
- **Identity → Invite users → digitir e-mail → Send**

### Remover acesso de um usuário:
- **Identity → clique no usuário → "Delete user"**

### Ver quem está cadastrado:
- **Identity → lista de usuários com último acesso**

---

## COMO FUNCIONA NA PRÁTICA

```
Usuário acessa o link
        ↓
Não está logado?
        ↓
Redireciona para login.html
        ↓
Digita e-mail + senha
        ↓
✅ Acessa o formulário
```

- Sessão dura 1 hora por padrão
- Se o usuário fechar e reabrir, permanece logado no mesmo dispositivo
- Botão "Sair" no canto superior direito do formulário

---

## PLANO GRATUITO DO NETLIFY

| Recurso | Limite gratuito |
|---|---|
| Sites | Ilimitado |
| Usuários (Identity) | Até 1.000 |
| Banda mensal | 100 GB |
| Deploy | Ilimitado |

Para o seu caso de uso, o plano gratuito é mais que suficiente.

---

## DÚVIDAS FREQUENTES

**O código do formulário fica exposto?**
Não. O Netlify bloqueia o acesso antes de carregar qualquer arquivo.
Quem não estiver logado é redirecionado para a tela de login.

**Posso ter vários clientes com acessos separados?**
Sim. Cada empresa que você vender pode ter seu próprio site Netlify
com seus próprios usuários.

**E se eu quiser personalizar o formulário para cada cliente?**
Basta editar o `index.html` e fazer um novo deploy para aquele site.

---

## SUPORTE

Em caso de dúvidas sobre o Netlify:
- Documentação: https://docs.netlify.com/visitor-access/identity/
- Comunidade: https://answers.netlify.com
