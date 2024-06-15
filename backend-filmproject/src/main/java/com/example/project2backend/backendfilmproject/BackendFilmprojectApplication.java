package com.example.project2backend.backendfilmproject;

import com.example.project2backend.backendfilmproject.payos.PayOS;
//import com.lib.payos.PayOS;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableCaching
@EnableScheduling
public class BackendFilmprojectApplication {
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
	public static void main(String[] args) {
		SpringApplication.run(BackendFilmprojectApplication.class, args);
	}
	@Value("${PAYOS_CLIENT_ID}")
	private String clientId;

	@Value("${PAYOS_API_KEY}")
	private String apiKey;

	@Value("${PAYOS_CHECKSUM_KEY}")
	private String checksumKey;

	@Bean
	public PayOS payOS() {
		return new PayOS(clientId, apiKey, checksumKey);
	}
}
