package com.example.project2backend.backendfilmproject.Controller;


import com.example.project2backend.backendfilmproject.Entity.User;
import com.example.project2backend.backendfilmproject.Payload.Response.NotificationMessage;
import com.example.project2backend.backendfilmproject.Service.UserService;
import com.example.project2backend.backendfilmproject.VnpayConfig.VNPayService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Optional;

@Controller
@RequestMapping("/vnpay")
public class VNPayController {
    @Autowired
    private VNPayService vnPayService;
    private final UserService userService;

    public VNPayController(UserService userService) {
        this.userService = userService;
    }
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;
    @GetMapping("")
    public String home(){
        return "ordersuccess";
    }
    @PostMapping("/submitOrder")
    public ResponseEntity<String> submidOrder2(@RequestParam("amount") Long orderTotal,
                                               @RequestParam("orderInfo") String orderInfo,
                                               HttpServletRequest request){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        User user= userService.getById(getUserId(userDetails))
                .orElseThrow(()->new RuntimeException("user not found"));
        userService.createTransaction(user,orderTotal,getUserId(userDetails));
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String vnpayUrl = vnPayService.createOrder(orderTotal, user.getId(), baseUrl);
        return ResponseEntity.ok(vnpayUrl);
    }
    @GetMapping("/vnpay-payment")
    public String GetMapping(HttpServletRequest request, Model model){
        User user = userService.getById(request.getParameter("vnp_OrderInfo"))
                .orElseThrow(()->new RuntimeException("transaction not found"));
        boolean status= userService.completeTransaction(user,Long.parseLong(String.valueOf(request.getParameter("vnp_Amount").substring(0,request.getParameter("vnp_Amount").length()-2))));
        int paymentStatus =vnPayService.orderReturn(request);

        String orderInfo = request.getParameter("vnp_OrderInfo");
        String paymentTime = request.getParameter("vnp_PayDate");
        String transactionId = request.getParameter("vnp_TransactionNo");
        String totalPrice = request.getParameter("vnp_Amount").substring(0,request.getParameter("vnp_Amount").length()-2);
        // Định dạng lại thời gian thanh toán
        LocalDateTime paymentDateTime = LocalDateTime.parse(paymentTime, DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String formattedPaymentTime = paymentDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        model.addAttribute("orderId", orderInfo);
        model.addAttribute("totalPrice", totalPrice);
        model.addAttribute("paymentTime", formattedPaymentTime);
        model.addAttribute("transactionId", transactionId);
        NotificationMessage notificationMessage= new NotificationMessage();
        notificationMessage.setAdmin(true);
        notificationMessage.setSender("System");
        notificationMessage.setTimestamp(new Date());
        notificationMessage.setContent(user.getName()+" vừa mua thành công gói vip ");
        if(paymentStatus == 1 && status) {
            messagingTemplate.convertAndSend("/topic-admin", notificationMessage);
        }
        return (paymentStatus == 1 && status) ? "ordersuccess" : "orderfail";
    }


    public String getUserId(UserDetails userDetails){

        String userName = userDetails.getUsername();
        Optional<User> user= userService.getByAccount(userName);
        if (!user.isPresent()) {
            return null;
        }

        return user.get().getId() ;
    }
}
