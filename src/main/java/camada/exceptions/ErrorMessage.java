package camada.exceptions;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class ErrorMessage {

    private String message;
    private Date currentDate;

    public ErrorMessage(String message, Date currentDate) {
        this.message = message;
        this.currentDate = currentDate;
    }

    public ErrorMessage() {
    }
}
