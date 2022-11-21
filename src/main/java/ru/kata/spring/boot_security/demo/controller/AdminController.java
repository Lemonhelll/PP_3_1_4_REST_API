package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;


@Controller
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;

    @Autowired()
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/admin")
    public String getAdminPanel(Model model, @AuthenticationPrincipal User user) {
        model.addAttribute("userList", userService.getAllUsers());
        model.addAttribute("roleList", roleService.getAllRoles());
        model.addAttribute("newUser", new User());
        model.addAttribute("userRole", userService.findByUsername(user.getUsername()));
        return "adminPanel";
    }

    @GetMapping("/admin/admin-info")
    public String getAdminProfile(Model model, Principal principal) {
        model.addAttribute("user", userService.findByUsername(principal.getName()));
        return "adminInfoPage";
    }

    @PostMapping("/admin/create")
    public String createUser(@ModelAttribute("user") User user) {
        userService.create(user);
        return "redirect:/admin";
    }

    @PutMapping("/admin/update/{id}")
    public String updateUser(@ModelAttribute("user") User user) {
        userService.update(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/admin/delete/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.delete(id);
        return "redirect:/admin";
    }

//    @GetMapping("/create")
//    public String getFormForCreateUser(Model model) {
//        model.addAttribute("user", new User());
//        model.addAttribute("roleList", roleService.allRoles());
//        return "create-user";
//    }


//    @GetMapping("/update/{id}")
//    public String getFormForUpdateUSer(@PathVariable("id") Long id, Model model) {
//        model.addAttribute("user", userService.getById(id));
//        model.addAttribute("roleList", roleService.allRoles());
//        return "user-update";
//    }

}
