"""
Сайт службы «Содействие» для публикации через Nios Apps.

Запуск (из папки проекта sodeystvie-web):
    NiosApps.exe --headless --key <ключ> --file main.py --folder . --port 8000

Отдаёт собранный сайт из dist-tunnel и отдаёт index.html на любой неизвестный
адрес, чтобы прямые ссылки на разделы не давали 404.

Заявки с формы идут не напрямую в Web3Forms, а через /api/lead: браузер
обращается к своему же домену, поэтому заявка не теряется из-за блокировщиков,
антивирусов и фильтрации сторонних доменов у провайдера.
"""

import json
import urllib.error
import urllib.request
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from starlette.concurrency import run_in_threadpool

ROOT = Path(__file__).resolve().parent / "dist-tunnel"
if not (ROOT / "index.html").exists():
    ROOT = Path(r"C:\Users\Александр\Desktop\Новая папка (4)\sodeystvie-web\dist-tunnel")

WEB3FORMS_URL = "https://api.web3forms.com/submit"

app = FastAPI(title="Содействие — сайт")

for folder in ("assets", "images", "fonts"):
    if (ROOT / folder).is_dir():
        app.mount("/" + folder, StaticFiles(directory=str(ROOT / folder)), name=folder)


@app.middleware("http")
async def cache_control(request, call_next):
    response = await call_next(request)
    path = request.url.path
    if path.startswith("/assets/"):
        response.headers["Cache-Control"] = "public, max-age=31536000, immutable"
    elif path.startswith("/images/") or path.startswith("/fonts/"):
        response.headers["Cache-Control"] = "public, max-age=86400, stale-while-revalidate=604800"
    elif not path.startswith("/api/"):
        response.headers["Cache-Control"] = "no-cache, must-revalidate"
    return response

@app.get("/healthz")
def healthz():
    return {"ok": True, "root": str(ROOT)}


def _forward_to_web3forms(body: bytes, content_type: str):
    request = urllib.request.Request(
        WEB3FORMS_URL,
        data=body,
        headers={
            "Content-Type": content_type,
            "Accept": "application/json",
            "User-Agent": "sodeystvie-site/1.0",
        },
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=20) as response:
        return response.status, response.read()


@app.post("/api/lead")
async def lead(request: Request):
    body = await request.body()
    content_type = request.headers.get("content-type", "")

    if not body or "multipart/form-data" not in content_type:
        return JSONResponse(
            {"success": False, "message": "Пустая заявка."},
            status_code=400,
        )

    try:
        status, payload = await run_in_threadpool(_forward_to_web3forms, body, content_type)
    except urllib.error.HTTPError as error:
        status = error.code
        payload = error.read()
    except Exception:
        return JSONResponse(
            {
                "success": False,
                "message": "Сервис заявок недоступен. Позвоните: +7 (951) 776-77-47.",
            },
            status_code=502,
        )

    try:
        data = json.loads(payload.decode("utf-8", "replace"))
    except Exception:
        # Web3Forms на запросы без браузерных заголовков отвечает HTML-страницей
        # «Form Submitted Successfully» вместо JSON — читаем результат оттуда.
        text = payload.decode("utf-8", "replace")
        if "form submitted successfully" in text.lower():
            data = {"success": True, "message": "Заявка отправлена."}
        else:
            data = {
                "success": False,
                "message": "Сервис заявок вернул неожиданный ответ. Позвоните: +7 (951) 776-77-47.",
            }

    return JSONResponse(data, status_code=status)


@app.get("/{full_path:path}")
def page(full_path: str):
    target = (ROOT / full_path).resolve()
    if full_path and target.is_file() and str(target).startswith(str(ROOT)):
        return FileResponse(str(target))
    return FileResponse(str(ROOT / "index.html"))
