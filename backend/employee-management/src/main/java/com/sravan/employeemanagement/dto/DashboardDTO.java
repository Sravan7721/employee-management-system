package com.sravan.employeemanagement.dto;

public class DashboardDTO {

    private long totalEmployees;

    private long totalDepartments;

    private long totalAdmins;

    private long totalUsers;

    public DashboardDTO() {
    }

    public DashboardDTO(
            long totalEmployees,
            long totalDepartments,
            long totalAdmins,
            long totalUsers) {

        this.totalEmployees = totalEmployees;
        this.totalDepartments = totalDepartments;
        this.totalAdmins = totalAdmins;
        this.totalUsers = totalUsers;

    }

    public long getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(long totalEmployees) {
        this.totalEmployees = totalEmployees;
    }

    public long getTotalDepartments() {
        return totalDepartments;
    }

    public void setTotalDepartments(long totalDepartments) {
        this.totalDepartments = totalDepartments;
    }

    public long getTotalAdmins() {
        return totalAdmins;
    }

    public void setTotalAdmins(long totalAdmins) {
        this.totalAdmins = totalAdmins;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

}