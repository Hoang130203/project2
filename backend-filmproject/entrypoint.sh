#!/bin/bash
/opt/mssql/bin/sqlservr &  # Khởi động SQL Server ở chế độ nền
sleep 30  # Chờ 30 giây để SQL Server khởi động
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 123 -i /init.sql  # Chạy script khởi tạo
wait  # Chờ các tiến trình nền kết thúc
