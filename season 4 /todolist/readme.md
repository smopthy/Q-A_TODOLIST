## 關於認證機制 auth cookies and session 



1. 登入者 提出帳號密碼
2. 由server ， 回傳憑證 
3. 使用者拿到憑證後，就可以登入 


由於http的協議是無狀態協定，不會主動儲存狀態資訊  
所以網路服務可以是無狀態協定，也可以是需要狀態協定的服務。需要登入或者不需要登入  
狀態需要開發者去把狀態儲存起來。  
1. 要讓客戶端儲存憑證
2. 伺服器要可以比對使用者的憑證

### 讓客戶端儲存憑證有兩種方式

1. cookie base：儲存在瀏覽器的cookie and webstorage 
2. token base 的認証 : 架構api伺服器的json方式  

目前先關注cookie 的方式：


session 指的是一個用戶登入與登出的一個週期。  
就是一種讓 Request 變成 stateful 的機制  

1. 用戶提出請求，通過後，伺服器端將使用者訊息轉程session id 儲存 並回傳給客戶端
2. 客戶端接受到回應後，除從session訊息在cookies中。 
3. 之後，客戶端與伺服器端透過憑證來互相溝通。

Cookie-based session，意思就是你把所有的 Session 狀態都存在 Cookie 裡面。  

用 Cookie 來實作 Session 機制」 Session Identifier，簡稱 Session ID。  
Server 只在 Cookie 裡面存一個 Session ID，其餘的狀態都存在 Server 那邊



#### 使用第三方來建立session機制 

```
npm install express-session  

```

#### 認證機制 

```
npm install passport passport-local
```

1. Strategies (可以是第三方、local機制等)
    透過email findone來核對數據庫是否有同的使用者 
    
    資料庫查找可能會有三種錯誤狀況：
      * 資料庫讀取失敗，done 接收錯誤訊息
      * 找不到使用者輸入的 username，用戶物件為 false
      * 找到使用者，但發現密碼錯誤，用戶物件為 false
2. Sessions 
    如果登入驗證通過，就把 user id 放進 session，這是序列化 (serialize)。  
    到完整的 user 資料，就會呼叫 反序列化 (deserialize)，用 user id 去資料庫裡查出完整的 user 實例。  

3. Middleware
4. Authenticate Requests