$procs = Get-CimInstance Win32_Process -Filter "Name='python.exe'" |
    Where-Object { $_.CommandLine -like '*serve.py*' }

if (-not $procs) {
    Write-Host "Сайт не запущен."
    exit
}

foreach ($p in $procs) {
    Stop-Process -Id $p.ProcessId -Force -ErrorAction SilentlyContinue
    Write-Host "Остановлено: PID $($p.ProcessId)"
}
