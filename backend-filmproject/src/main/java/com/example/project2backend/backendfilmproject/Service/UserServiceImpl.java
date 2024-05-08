package com.example.project2backend.backendfilmproject.Service;

import com.example.project2backend.backendfilmproject.Entity.*;
import com.example.project2backend.backendfilmproject.Entity.EClass_Key.ERole;
import com.example.project2backend.backendfilmproject.Entity.EClass_Key.UserRoleKey;
import com.example.project2backend.backendfilmproject.Payload.Request.UserUpdateReq;
import com.example.project2backend.backendfilmproject.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Service
@Transactional
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TransactionRepository transactionRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final ReviewRepository reviewRepository;
    private final CommentRepository commentRepository;
    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, TransactionRepository transactionRepository, RoleRepository roleRepository, UserRoleRepository userRoleRepository, ReviewRepository reviewRepository, CommentRepository commentRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.transactionRepository = transactionRepository;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
        this.reviewRepository = reviewRepository;
        this.commentRepository = commentRepository;
    }
    @Override
    public Optional<User> getByAccount(String account) {
        return userRepository.findByAccount(account);
    }

    @Override
    public Optional<User> getById(String id) {
        return userRepository.findById(id);
    }

    @Override
    public boolean existByAccount(String account) {
        return userRepository.existsByAccount(account);
    }

    @Override
    @Transactional
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public User update(UserUpdateReq userUpdateReq,String userId) {
        User user= userRepository.findById(userId)
                .orElseThrow(()->  new RuntimeException("user not found"));
        if(userUpdateReq.getPassword().length()>=6 && !user.isHasProvider() ){
            System.out.println(userUpdateReq.getPassword());
            user.setPassword(passwordEncoder.encode(userUpdateReq.getPassword()));
        }
        if(userUpdateReq.getName().length()>0){
            user.setName(userUpdateReq.getName()) ;

        }
        if(userUpdateReq.getEmail().length()>0){
            user.setEmail(userUpdateReq.getEmail());
        }
        if(userUpdateReq.getAge()>0){
            user.setAge(userUpdateReq.getAge());

        }
        userRepository.save(user);
        return user;
    }

    @Override
    public User updateAvt(String avatar, String userId) {
        User user= userRepository.findById(userId)
                .orElseThrow(()->  new RuntimeException("user not found"));
        user.setAvatar(avatar);
        userRepository.save(user);
        return user;
    }

    @Override
    public void createTransaction(User user, Long amount, String info) {
        Transaction transaction= new Transaction(amount,user,new Timestamp(System.currentTimeMillis()),"process");
        transactionRepository.save(transaction);
    }

    @Override
    public boolean completeTransaction(User user,Long amount) {
        List<Transaction> transactions= transactionRepository.findAllByUser(user);
        System.out.println(transactions.size());
        long currentTimeMillis = System.currentTimeMillis()-15*60*1000;
        Timestamp timestamp1 = new Timestamp(currentTimeMillis);
        for (Transaction transaction :
                transactions) {
//            System.out.println(amount);
            if(transaction.getStatus().equals("process")&& transaction.getMoney().equals(amount)){
                Timestamp timestamp2 = transaction.getTime();
//                System.out.println(timestamp2);
//                System.out.println(timestamp1);
                if(timestamp1.after(timestamp2)){ System.out.println(timestamp1); continue; }
//                System.out.println(amount);
                transaction.setStatus("done");
                LocalDateTime currentTime = LocalDateTime.now();
                LocalDateTime expiryTime = currentTime.plusMonths(1);
                int timeIncrement=0;
                switch (amount.intValue()){
                    case 100000:
                        timeIncrement= 1;
                        expiryTime = currentTime.plusMonths(1);
                        break;
                    case 250000:
                        timeIncrement= 2;
                        expiryTime = currentTime.plusMonths(3);
                        break;
                    case 400000:
                        timeIncrement= 3;
                        expiryTime = currentTime.plusMonths(6);
                        break;
                    default:break;
                }
                Set<Role> roles = user.getRoles();
                Optional<Role> roleVip= roleRepository.findByName(ERole.ROLE_VIP);
                Optional<UserRole> userRole= userRoleRepository.findById(new UserRoleKey(user,roleVip.get()));
                if(userRole.isPresent()){
                    Date expiry = userRole.get().getExpiry(); // Lấy ngày hết hạn hiện tại
                    long currentExpiryTime = expiry.getTime(); // Lấy giá trị thời gian hiện tại của expiry
                    expiry.setTime(currentExpiryTime + timeIncrement);
                    UserRole userRole1=userRole.get();
                    userRole1.setExpiry(new Date(Date.from(expiryTime.plusMonths(timeIncrement).atZone(ZoneId.systemDefault()).toInstant()).getTime()));
                    userRoleRepository.save(userRole1);
                }else{
                    Date expiryDate = new Date( Date.from(expiryTime.atZone(ZoneId.systemDefault()).toInstant()).getTime());
                    UserRole userRole1= new UserRole(user,roleVip.get(),expiryDate);
                    userRoleRepository.save(userRole1);

                }
//                user.getRoles().add()
                transactionRepository.save(transaction);
                return true;
            }
        }
        return false;
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public Review postReview(User user, Film film, String content) {
        Review review = new Review(film, user, new Timestamp(System.currentTimeMillis()), content);
        reviewRepository.save(review);
        return review;
    }

    @Override
    public Comment postComment(User user, Episode episode, String content) {
        Comment comment = new Comment(episode,user,new Timestamp(System.currentTimeMillis()),content);
        commentRepository.save(comment);
        return comment;
    }

    public String randomString(){
        int length=15;
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();

        // Khai báo một StringBuilder để xây dựng xâu ngẫu nhiên
        StringBuilder sb = new StringBuilder();

        // Tạo xâu ngẫu nhiên bằng cách chọn ngẫu nhiên các ký tự từ chuỗi characters
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            char randomChar = characters.charAt(index);
            sb.append(randomChar);
        }

        // In ra xâu ngẫu nhiên
        String randomString = sb.toString();
        return randomString;
    }
}
