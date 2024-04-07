package com.example.project2backend.backendfilmproject.OtherConfig;

import com.google.common.cache.CacheBuilder;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.MultiValueMap;

import java.time.Duration;
import java.util.Collections;

//@Configuration
//@EnableCaching
//public class CacheConfig {
//    @Bean
//    public CacheManager cacheManager() {
//        ConcurrentMapCacheManager cacheManager = new ConcurrentMapCacheManager("topFilmViews");
//        cacheManager.setCacheNames(Collections.singleton("topFilmViews"));
//        cacheManager.setCacheBuilder(
//                CacheBuilder.newBuilder()
//                        .expireAfterWrite(10, TimeUnit.MINUTES) // Thời gian sống của cache là 10 phút
//        );
//        return cacheManager;
//    }
//}
