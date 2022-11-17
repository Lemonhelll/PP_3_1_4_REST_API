package ru.kata.spring.boot_security.demo.init;

import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;
import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

@Component
public class Initialization {
    private final UserService userService;
    private final RoleService roleService;

    public Initialization(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @PostConstruct
    private void initUser() {
        Role roleAdmin = new Role("ROLE_ADMIN");
        Role roleUser = new Role("ROLE_USER");
        roleService.addRole(roleAdmin);
        roleService.addRole(roleUser);

        Set<Role> adminSet = new HashSet<>();
        Set<Role> userSet = new HashSet<>();
        adminSet.add(roleAdmin);
        userSet.add(roleUser);
        User admin = new User("admin", "admin", "vova", "zolotov", 25, "1@mail.com", adminSet);
        User user = new User("user", "user", "dima", "zolotov", 17, "2@mail.com", userSet);

        userService.create(admin);
        userService.create(user);

    }
}
