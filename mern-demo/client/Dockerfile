# Câu 51: Khai báo Node.js làm Base Image
FROM node:20-alpine

# Câu 52: Thiết lập thư mục làm việc bên trong Container
WORKDIR /app

# Câu 53: Sao chép package.json và package-lock.json
COPY package*.json ./

# Câu 54: Cài đặt các package của React Application
RUN npm install

# Câu 55: Sao chép toàn bộ source code React vào Container
COPY . .

# Câu 56: Build React Application (tạo ra thư mục dist chứa file tĩnh ở Câu 57)
RUN npm run build

# Cài đặt công cụ serve nhẹ để chạy ứng dụng đã build trên port 3000
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]