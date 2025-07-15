# Điểm Nhấn Thời Gian

Chào mừng bạn đến với "Điểm Nhấn Thời Gian", một trò chơi phản xạ và dự đoán thời gian gây nghiện được xây dựng bằng Next.js và Firebase. Thử thách khả năng canh thời gian của bạn và xem bạn có thể đạt được bao nhiêu điểm!

## Giới thiệu

"Điểm Nhấn Thời Gian" là một trò chơi đơn giản nhưng đầy thử thách. Một chiếc đồng hồ với kim giây quay liên tục và một số mục tiêu được hiển thị. Nhiệm vụ của bạn là chạm vào màn hình chính xác vào khoảnh khắc kim đồng hồ chỉ vào số mục tiêu. Mỗi lần thành công, tốc độ của kim đồng hồ sẽ tăng lên, đòi hỏi sự tập trung và phản xạ nhanh hơn.

## Cách chơi

1.  **Bắt đầu**: Nhấn nút "Bắt đầu" để vào trò chơi.
2.  **Quan sát**: Một chiếc đồng hồ sẽ xuất hiện với kim đang quay và một con số mục tiêu được làm nổi bật.
3.  **Hành động**: Chạm vào bất cứ đâu trên màn hình khi bạn tin rằng kim đồng hồ đang chỉ chính xác vào số mục tiêu.
4.  **Ghi điểm**:
    *   **Thành công**: Nếu bạn chạm đúng lúc, điểm của bạn sẽ tăng lên và tốc độ đồng hồ cũng sẽ tăng cho vòng tiếp theo.
    *   **Thất bại**: Nếu bạn chạm sai, trò chơi sẽ kết thúc.
5.  **Chơi lại**: Sau khi trò chơi kết thúc, bạn có thể xem điểm số cuối cùng của mình và chọn chơi lại để thử phá kỷ lục.

## Cài đặt và Chạy cục bộ

Để chạy dự án này trên máy của bạn, hãy làm theo các bước sau:

1.  **Clone repository**:
    ```bash
    git clone <URL_REPOSITORY_CUA_BAN>
    cd <TEN_THU_MUC_DU_AN>
    ```

2.  **Cài đặt các gói phụ thuộc**:
    Sử dụng `npm` để cài đặt các gói cần thiết được định nghĩa trong `package.json`.
    ```bash
    npm install
    ```

3.  **Chạy server phát triển**:
    Sau khi cài đặt xong, khởi động server phát triển Next.js.
    ```bash
    npm run dev
    ```

4.  **Mở ứng dụng**:
    Mở trình duyệt của bạn và truy cập vào [http://localhost:9002](http://localhost:9002) (hoặc cổng được chỉ định trong terminal của bạn) để xem ứng dụng.
