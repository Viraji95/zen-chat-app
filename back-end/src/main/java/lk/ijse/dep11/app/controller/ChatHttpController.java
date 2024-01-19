package lk.ijse.dep11.app.controller;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.ConstraintViolationException;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.List;
import java.util.Map;
import java.util.Vector;

@RestController
@RequestMapping("/api/v1/messages")
@CrossOrigin
public class ChatHttpController {

    private final List<String> chatMessages = new Vector<>();

    @ExceptionHandler(ConstraintViolationException.class)
    public void validationExceptionHandler(ConstraintViolationException exp){
        ResponseStatusException resExp = new ResponseStatusException(HttpStatus.BAD_REQUEST,
                exp.getMessage());
        exp.initCause(resExp);
        throw resExp;
    }

    @GetMapping(produces = "application/json")
    public List<String> retrieveMessages() {
        return chatMessages;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = "application/json", produces = "application/json")
    @Validated
    public Map<String,String> sendMessage(@RequestBody Map<
            @Pattern(regexp = "^message$", message = "Invalid chat message") String,
            @NotBlank(message = "Chat message can't be empty") String> messageObj){
        chatMessages.add(messageObj.get("message"));
        return messageObj;
    }
}
