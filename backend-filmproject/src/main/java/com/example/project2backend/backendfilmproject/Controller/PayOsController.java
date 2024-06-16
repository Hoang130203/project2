package com.example.project2backend.backendfilmproject.Controller;

import com.example.project2backend.backendfilmproject.Entity.User;
import com.example.project2backend.backendfilmproject.Payload.Response.NotificationMessage;
import com.example.project2backend.backendfilmproject.Service.UserService;
import com.example.project2backend.backendfilmproject.payos.PayOS;
import com.example.project2backend.backendfilmproject.payos.type.ItemData;
import com.example.project2backend.backendfilmproject.payos.type.PaymentData;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
//import com.lib.payos.PayOS;
//import com.lib.payos.type.ItemData;
//import com.lib.payos.type.PaymentData;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/payos")
public class PayOsController {
    private final PayOS payOS;
    private final UserService userService;
    private String base_url="https://project2-97w5.onrender.com";
    private String base_url2="https://project2-seven-kappa.vercel.app";
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;
    public PayOsController(PayOS payOS, UserService userService) {
        super();
        this.payOS = payOS;
        this.userService = userService;
    }
//    @RequestMapping(value = "/")
//    public String Index() {
//        return "index";
//    }
    @RequestMapping( "/success")
    public String Success(@RequestParam("userId") String userId,@RequestParam("amount") Long amount) {
        User user = userService.getById(userId)
                .orElseThrow(()->new RuntimeException("transaction not found"));
        boolean status= userService.completeTransaction(user,amount);
        NotificationMessage notificationMessage= new NotificationMessage();
        notificationMessage.setAdmin(true);
        notificationMessage.setSender("System");
        notificationMessage.setTimestamp(new Date());
        notificationMessage.setContent(user.getName()+" vừa mua thành công gói vip ");
        if(status) {
            messagingTemplate.convertAndSend("/topic-admin", notificationMessage);
        }
        return "<a href=\"https://project2-seven-kappa.vercel.app/page/account/info\" id=\"return-page-btn\">Trở về</a>";
    }
//    @RequestMapping(value = "/cancel")
//    public String Cancel() {
//        return "cancel";
//    }
    @PostMapping("/create-payment-link")
//    @RequestMapping(method = RequestMethod.POST, value = "/create-payment-link", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<?> checkout(HttpServletResponse httpServletResponse,
                                   @RequestParam("amount") Long orderTotal,
                                   @RequestParam("orderInfo") String orderInfo) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
//        System.out.println(userDetails);
        User user= userService.getById(getUserId(userDetails))
                .orElseThrow(()->new RuntimeException("user not found"));
        userService.createTransaction(user,orderTotal,getUserId(userDetails));

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            final String productName = orderInfo;
            final String description = orderInfo;
            final String returnUrl = base_url + "/payos/success?userId="+user.getId()+"&amount="+orderTotal;
            final String cancelUrl = base_url2 + "/page/account/info";
            final Long price = orderTotal;
            // Gen order code
            String currentTimeString = String.valueOf(new Date().getTime());
            int orderCode = Integer.parseInt(currentTimeString.substring(currentTimeString.length() - 6));
            ItemData item = new ItemData(productName, 1,price.intValue());
            List<ItemData> itemList = new ArrayList<>();
            itemList.add(item);
            PaymentData paymentData = new PaymentData(orderCode, price.intValue()/1000+10000, description,
                    itemList, cancelUrl, returnUrl);
            JsonNode data = payOS.createPaymentLink(paymentData);

            String checkoutUrl = data.get("checkoutUrl").asText();

            httpServletResponse.setHeader("Location", checkoutUrl);
            httpServletResponse.setStatus(302);
            return ResponseEntity.ok(checkoutUrl);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
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
