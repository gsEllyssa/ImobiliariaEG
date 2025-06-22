#!/bin/bash
echo "🟢 Iniciando backend e frontend..."

osascript -e 'tell app "Terminal"
  do script "cd ~/Documents/Faculdade/ReactImobiliaria/imobiliaria/backend && npm run dev"
end tell'

osascript -e 'tell app "Terminal"
  do script "cd ~/Documents/Faculdade/ReactImobiliaria/imobiliaria/frontend && npm run dev"
end tell'

echo "🚀 Backend e Frontend iniciando..."

