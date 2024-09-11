import subprocess
import os
import sys

def iniciar_emulador_firebase():
    try:
        # Verifica se o Firebase CLI está instalado
        subprocess.run(["firebase", "--version"], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    except subprocess.CalledProcessError:
        print("Erro: Firebase CLI não está instalado. Por favor, instale-o primeiro.")
        return
    except FileNotFoundError:
        print("Erro: Firebase CLI não encontrado. Certifique-se de que está instalado e no PATH.")
        return

    # Diretório do projeto Firebase (ajuste conforme necessário)
    diretorio_projeto = os.path.dirname(os.path.abspath(__file__))
    
    print("Iniciando o emulador do Firebase...")
    
    try:
        # Inicia o emulador do Firebase
        processo = subprocess.Popen(
            ["firebase", "emulators:start", "--only", "functions"],
            cwd=diretorio_projeto,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            universal_newlines=True,
            bufsize=1  # Garante que a saída seja imediatamente disponível
        )
        
        # Exibe a saída em tempo real com cores
        for linha in processo.stdout:
            sys.stdout.write(linha)
            sys.stdout.flush()
        
        # Aguarda o processo terminar
        processo.wait()
        
    except KeyboardInterrupt:
        print("\nInterrompendo o emulador do Firebase...")
        processo.terminate()
    except Exception as e:
        print(f"Erro ao iniciar o emulador do Firebase: {e}")

if __name__ == "__main__":
    iniciar_emulador_firebase()
