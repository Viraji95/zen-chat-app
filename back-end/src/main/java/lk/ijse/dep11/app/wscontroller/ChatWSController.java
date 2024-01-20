package lk.ijse.dep11.app.wscontroller;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lk.ijse.dep11.app.to.MessageTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.List;

public class ChatWSController extends TextWebSocketHandler {

    private final List<WebSocketSession> webSocketSessionsList = new ArrayList<>();

    @Autowired
    private ObjectMapper mapper;
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        webSocketSessionsList.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        webSocketSessionsList.remove(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        try {
            mapper.readValue(message.getPayload(), MessageTO.class);
        }catch (JacksonException exp){
            session.sendMessage(new TextMessage("Invalid JSON"));
        }
    }
}
