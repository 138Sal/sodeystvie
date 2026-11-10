"""
Локальный сервер сайта «Содействие» + публичный туннель Nios Apps.

Запуск:  Запустить сайт.cmd   (или .venv\\Scripts\\python.exe serve.py)
Остановка: Ctrl+C в окне консоли, либо Остановить сайт.cmd

Сайт: https://ni-os.ru/apps/sodeystvie/
"""

import threading
from pathlib import Path

import uvicorn

from main import app

PORT = 8000
KEY = "nios_app_L-G_2LNEJQNpWN-6D1J_I93ef-0QvKiCeWU-60FTKNQ"
ROOT = Path(__file__).resolve().parent


def serve():
    uvicorn.run(app, host="127.0.0.1", port=PORT, log_level="warning")


def main():
    if not (ROOT / "dist-tunnel" / "index.html").exists():
        raise SystemExit(
            "Нет папки dist-tunnel. Соберите сайт:  npm run build:tunnel"
        )

    threading.Thread(target=serve, daemon=True).start()

    import nios

    print(f"Локально: http://127.0.0.1:{PORT}/")
    print("Публично: https://ni-os.ru/apps/sodeystvie/")
    print("Не закрывайте это окно, пока сайт нужен в интернете. Ctrl+C — остановить.")
    nios.app(KEY, port=PORT)
    nios.polling()


if __name__ == "__main__":
    main()
