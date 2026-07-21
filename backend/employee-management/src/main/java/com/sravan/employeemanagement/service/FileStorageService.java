package com.sravan.employeemanagement.service;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;

@Service
public class FileStorageService {

    private static final String UPLOAD_DIR = "uploads";

    // ==============================
    // Upload File
    // ==============================
    public String uploadFile(MultipartFile file) {

        try {

            Path uploadPath = Paths.get(UPLOAD_DIR);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String fileName = file.getOriginalFilename();

            Path filePath = uploadPath.resolve(fileName);

            Files.copy(file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING);

            return "File uploaded successfully : " + fileName;

        } catch (IOException e) {
            throw new RuntimeException("Could not upload file", e);
        }
    }

    // ==============================
    // Download File
    // ==============================
    public Resource downloadFile(String fileName) {

        try {

            Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName);

            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return resource;
            }

            throw new RuntimeException("File not found.");

        } catch (MalformedURLException e) {
            throw new RuntimeException("Error while reading file.", e);
        }
    }
}