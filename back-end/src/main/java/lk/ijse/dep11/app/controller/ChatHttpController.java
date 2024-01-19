package lk.ijse.dep11.app.controller;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Vector;

@RestController
@RequestMapping("/api/v1/messages")
@CrossOrigin
public class ChatHttpController {

    private final List<String> chatMessages = new Vector<>();

    @GetMapping(produces = "application/json")
    public List<String> retrieveMessages() {
        return chatMessages;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = "application/json", produces = "application/json")
    @Validated
    public Map<String, String> sendMessage(){

    }
}
